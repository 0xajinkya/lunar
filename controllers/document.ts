import { tasks } from "@trigger.dev/sdk/v3";
import type { RouterHandler } from "../lib/express/express";
import { LunarError } from "../lib/utils/errors";
import type { MonoResponse } from "../lib/utils/helpers/types";
import { GenerationService } from "../services/generation";

const Upload: RouterHandler<
    MonoResponse.Content<{
        job_id: string
    }>
> = async ({
    file
}) => {
        if (!file) throw new LunarError.Platform('1003');

        const generation = await GenerationService.Create({
            fileLink: file.location,
            fileName: file.originalname,
            jobStatus: 'PENDING'
        });

        const job = await tasks.trigger('process-generation', {
            generationId: generation.id
        });

        await GenerationService.Update(generation.id, {
            jobId: job.id,
            jobStatus: 'IN_PROGRESS'
        });

        return {
            status: true,
            content: {
                data: {
                    job_id: job.id
                }
            }
        };
    }

const Get: RouterHandler<MonoResponse.Content<Awaited<ReturnType<typeof GenerationService.Get>>>> = async ({
    params: {
        job_id
    }
}) => {
    const generation = await GenerationService.Get({
        id: job_id,
        include: {
            companies: {
                include: {
                    members: true
                }
            }
        }
    });

    return {
        status: true,
        content: {
            data: generation
        }
    }
}
export const DocumentController = {
    Upload,
    Get
};