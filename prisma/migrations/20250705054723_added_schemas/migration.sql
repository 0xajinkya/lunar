-- CreateTable
CREATE TABLE "generation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "fileLink" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobStatus" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "job_response" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organization" TEXT NOT NULL,
    "members" JSONB NOT NULL,
    "generationId" TEXT NOT NULL,
    CONSTRAINT "job_response_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "generation_jobId_key" ON "generation"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "job_response_generationId_key" ON "job_response"("generationId");
