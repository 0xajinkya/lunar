-- CreateTable
CREATE TABLE "generation_company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    CONSTRAINT "generation_company_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "generation_company_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform_id" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "profile_url" TEXT NOT NULL,
    "organizations_url" TEXT NOT NULL,
    "repositories_url" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "generation_company_member_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "generation_company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
