-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_generation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "fileLink" TEXT NOT NULL,
    "jobId" TEXT,
    "jobStatus" TEXT NOT NULL
);
INSERT INTO "new_generation" ("fileLink", "fileName", "id", "jobId", "jobStatus") SELECT "fileLink", "fileName", "id", "jobId", "jobStatus" FROM "generation";
DROP TABLE "generation";
ALTER TABLE "new_generation" RENAME TO "generation";
CREATE UNIQUE INDEX "generation_jobId_key" ON "generation"("jobId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
