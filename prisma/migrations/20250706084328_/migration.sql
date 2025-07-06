-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('NOT_ADDED', 'PENDING', 'IN_PROGRESS', 'FAILED', 'SUCCESS');

-- CreateTable
CREATE TABLE "generation" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileLink" TEXT NOT NULL,
    "jobId" TEXT,
    "jobStatus" "JobStatus" NOT NULL,
    "error" TEXT,

    CONSTRAINT "generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generation_company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "generation_company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generation_company_member" (
    "id" TEXT NOT NULL,
    "platform_id" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "profile_url" TEXT NOT NULL,
    "organizations_url" TEXT NOT NULL,
    "repositories_url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "generation_company_member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generation_jobId_key" ON "generation"("jobId");

-- AddForeignKey
ALTER TABLE "generation_company" ADD CONSTRAINT "generation_company_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generation_company_member" ADD CONSTRAINT "generation_company_member_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "generation_company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
