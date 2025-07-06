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
                { id },
                { jobId: id }
            ]
        },
        ...(include && { include })
    })
};

export const GenerationService = {
    /**
     * Creates a new Generation record in the database.
     *
     * @function Create
     * @param {TypeGenerationCreate} data - The input data to create the generation.
     * @returns {Promise<import("@prisma/client").Generation>} The newly created generation record.
     */
    Create,

    /**
     * Updates an existing Generation record by ID.
     *
     * @function Update
     * @param {string} id - The ID of the generation to update.
     * @param {TypeGenerationUpdate} data - The data fields to update.
     * @returns {Promise<import("@prisma/client").Generation>} The updated generation record.
     */
    Update,
    /**
     * Retrieves a Generation record by `id` or `jobId`.
     *
     * @function Get
     * @param {TypeGetProps} props - The lookup options.
     * @param {string} props.id - The generation ID or job ID.
     * @param {TypeGenerationInclude} [props.include] - Optional Prisma include config for nested relations.
     * @returns {Promise<import("@prisma/client").Generation | null>} The matched generation record or null if not found.
     */
    Get
};