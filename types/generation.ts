import type { Generation, Prisma } from "@prisma/client";
import type { TypeGenerationCompany } from "./generation-company";
import type { TypeGenerationCompanyMember } from "./generation-company-member";

export type TypeGeneration = Generation;

export type TypeGenerationCreate = Prisma.GenerationCreateInput;

export type TypeGenerationUpdate = Prisma.GenerationUpdateInput;

export type EnumGenerationStatus = Generation['jobStatus'];

export type TypeGenerationInclude = Prisma.GenerationInclude;

export type TypeGenerationExpanded = TypeGeneration & {
    companies: TypeGenerationCompany & {
        members: TypeGenerationCompanyMember[] | null
    }[] | null
} | null;