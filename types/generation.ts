import type { Generation, Prisma } from "@prisma/client";

export type TypeGeneration = Generation;

export type TypeGenerationCreate = Prisma.GenerationCreateInput;

export type TypeGenerationUpdate = Prisma.GenerationUpdateInput;

export type EnumGenerationStatus = Generation['jobStatus'];