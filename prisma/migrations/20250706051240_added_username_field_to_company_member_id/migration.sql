/*
  Warnings:

  - Added the required column `username` to the `generation_company_member` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_generation_company_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform_id" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "profile_url" TEXT NOT NULL,
    "organizations_url" TEXT NOT NULL,
    "repositories_url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "generation_company_member_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "generation_company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_generation_company_member" ("avatar_url", "companyId", "id", "organizations_url", "platform_id", "profile_url", "repositories_url") SELECT "avatar_url", "companyId", "id", "organizations_url", "platform_id", "profile_url", "repositories_url" FROM "generation_company_member";
DROP TABLE "generation_company_member";
ALTER TABLE "new_generation_company_member" RENAME TO "generation_company_member";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
