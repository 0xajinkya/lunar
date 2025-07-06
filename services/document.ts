import { tasks } from "@trigger.dev/sdk/v3";
import { LunarError } from "../lib/utils/errors";
import { GenerationService } from "./generation";
import type { File } from "../lib/express/express";

const Upload = async (file?: File) => {
    if (!file) throw new LunarError.Platform("1003");

    const generation = await GenerationService.Create({
        fileLink: file.location,
        fileName: file.originalname,
        jobStatus: "PENDING",
    });

    const job = await tasks.trigger("process-generation", {
        generationId: generation.id,
    });

    await GenerationService.Update(generation.id, {
        jobId: job.id,
        jobStatus: "IN_PROGRESS",
    });

    return {
        job_id: job.id,
    };
};

const Get = async (jobId: string) => {
    return GenerationService.Get({
        id: jobId,
        include: {
            companies: {
                include: {
                    members: true,
                },
            },
        },
    });
};

export const DocumentService = {
    /**
     * Uploads a PDF document and triggers the generation processing task.
     *
     * Steps:
     * - Validates the uploaded file.
     * - Creates a new `Generation` record with PENDING status.
     * - Triggers the `process-generation` background task.
     * - Updates the `Generation` with the triggered job ID and sets status to IN_PROGRESS.
     *
     * @function Upload
     * @param {File} [file] - The uploaded PDF file (must include `location` and `originalname`).
     * @returns {Promise<{ job_id: string }>} An object containing the background job ID.
     * @throws {LunarError.Platform} If no file is provided.
     */
    Upload,
    /**
     * Fetches a Generation record by job ID, including nested company and member data.
     *
     * @function Get
     * @param {string} jobId - The ID of the generation job to retrieve.
     * @returns {Promise<Awaited<ReturnType<typeof GenerationService.Get>>>} A detailed generation record.
     */
    Get
};
