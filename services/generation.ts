import { Database } from "../lib/database";
import type { TypeGenerationCreate, TypeGenerationInclude, TypeGenerationUpdate } from "../types/generation";

const Create = async (data: TypeGenerationCreate) => {
    return await Database.instance.generation.create({
        data
    })
};

const Update = async (id: string, data: TypeGenerationUpdate) => {
    return await Database.instance.generation.update({
        where: {
            id
        },
        data
    })
};

type TypeGetProps = {
    id: string;
    include?: TypeGenerationInclude
}
const Get = async ({
    id,
    include
}: TypeGetProps) => {
    return await Database.instance.generation.findFirst({
        where: {
            OR: [
                {
                    id
                },
                {
                    jobId: id
                }
            ]
        },
        ...(include && { include })
    })
};

export const GenerationService = {
    Create,
    Update,
    Get
};