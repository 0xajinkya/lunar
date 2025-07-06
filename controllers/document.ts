import { tasks } from "@trigger.dev/sdk/v3";
import { Database } from "../lib/database";
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
        if (!file) throw new LunarError.Platform('404');

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

export const DocumentController = {
    Upload
};