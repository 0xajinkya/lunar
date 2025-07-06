import type { Prisma } from "@prisma/client";
import { Database } from "../lib/database"
import type { TypeGenerationCompanyInclude, TypeGenerationCompanyInsert, TypeGenerationCompanyUpdate } from "../types/generation-company"

const Create = async (data: TypeGenerationCompanyInsert) => {
    return await Database.instance.generationCompany.create({
        data
    })
};

const Get = async (id: string) => {
    return await Database.instance.generationCompany.findFirst({
        where: {
            id
        }
    })
};

const Update = async (id: string, data: TypeGenerationCompanyUpdate) => {
    return await Database.instance.generationCompany.update({
        where: {
            id
        },
        data
    })
};

type TypeGetAllByGenerationIdProps = {
    generationId: string;
    include?: TypeGenerationCompanyInclude
}

const GetAllByGenerationId = async ({
    generationId,
    include
}: TypeGetAllByGenerationIdProps) => {

    return await Database.instance.generationCompany.findMany({
        where: {
            generationId
        },
        ...(include && { include })
    })
}

export const GenerationCompanyService = {
    Create,
    Get,
    Update,
    GetAllByGenerationId
}