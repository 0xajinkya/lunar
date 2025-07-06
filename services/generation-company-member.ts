import { Database } from "../lib/database";
import type { TypeGenerationCompanyMemberInsertMany } from "../types/generation-company-member";

const CreateBulk = async (data: TypeGenerationCompanyMemberInsertMany[]) => {
    return await Database.instance.generationCompanyMember.createMany({
        data
    });
}

export const GenerationCompanyMemberService = {
    CreateBulk
};
