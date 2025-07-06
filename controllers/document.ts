import type { RouterHandler } from "../lib/express/express";
import type { MonoResponse } from "../lib/utils/helpers/types/common";
import { DocumentService } from "../services/document";

const Upload: RouterHandler<
    MonoResponse.Content<{
        job_id: string;
    }>
> = async ({ file }) => {
    const result = await DocumentService.Upload(file);

    return {
        status: true,
        content: {
            data: result,
        },
    };
};

const Get: RouterHandler<
    MonoResponse.Content<Awaited<ReturnType<typeof DocumentService.Get>>>
> = async ({ params: { job_id } }) => {
    const generation = await DocumentService.Get(job_id);

    return {
        status: true,
        content: {
            data: generation,
        },
    };
};

export const DocumentController = {
    /**
     * Handles the upload of a document and triggers background processing.
     *
     * Delegates the logic to `DocumentService.Upload`, which:
     * - Creates a generation record
     * - Triggers the `process-generation` task
     * - Updates job status and returns the job ID
     *
     * @function Upload
     * @type {RouterHandler<MonoResponse.Content<{ job_id: string }>>}
     * @param {Object} context - The request context.
     * @param {Express.MulterS3.File} context.file - The uploaded file from the request.
     * @returns {Promise<MonoResponse.Content<{ job_id: string }>>} The job ID of the triggered generation.
     */
    Upload,

    /**
     * Retrieves a processed generation record by job ID.
     *
     * Delegates to `DocumentService.Get`, which loads:
     * - The generation record
     * - All related companies and their GitHub members
     *
     * @function Get
     * @type {RouterHandler<MonoResponse.Content<Awaited<ReturnType<typeof DocumentService.Get>>>>}
     * @param {Object} context - The request context.
     * @param {string} context.params.job_id - The ID of the generation job to retrieve.
     * @returns {Promise<MonoResponse.Content<Awaited<ReturnType<typeof DocumentService.Get>>>>} The generation record with nested companies and members.
     */
    Get,
};
