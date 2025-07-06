import { Database } from "../lib/database";
import type { TypeGenerationCreate, TypeGenerationUpdate } from "../types/generation";

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

const Get = async (id: string) => {
    return await Database.instance.generation.findFirst({
        where: {
            id
        }
    })
}

export const GenerationService = {
    Create,
    Update,
    Get
};