import { task, logger } from "@trigger.dev/sdk/v3";
import { PdfReader } from "pdfreader";
import { writeFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import axios from "axios";
import { randomUUID } from "crypto";
import { GemmaService } from "../services/gemma";
import { GemmaPrompt } from "../lib/genai/prompts";
import { GemmaSchema } from "../lib/genai/schema";
import { GenerationService } from "../services/generation";
import { GenerationCompanyService } from "../services/generation-company";
import { GithubService } from "../services/github";
import { GenerationCompanyMemberService } from "../services/generation-company-member";
import { Database } from "../lib/database";
import pLimit from "p-limit";

const limit = pLimit(5);

/**
 * Task: process-generation
 *
 * Processes a document generation request by performing the following:
 * - Downloads and parses a PDF from a provided file link.
 * - Extracts text content and uses an LLM (Gemma) to detect company names.
 * - For each detected company:
 *   - Creates a GenerationCompany record.
 *   - Fetches GitHub organization members.
 *   - Bulk inserts members into GenerationCompanyMember.
 * - Updates the Generation status accordingly.
 * - Cleans up the temporary file after processing.
 *
 * This task is rate-limited to 1 concurrent execution and has a max runtime of 5 minutes.
 *
 * @taskId process-generation
 * @queueConcurrency 1
 * @maxDuration 300s
 *
 * @param {Object} payload - The payload passed to the task.
 * @param {string} payload.generationId - The ID of the Generation entity to process.
 *
 * @returns {Promise<void>} Resolves when the task is completed or skipped.
 *
 * @throws {Error} Will log and mark the generation as FAILED if PDF parsing or Gemma inference fails.
 */
export const processGenerationTask = task({
  id: "process-generation",
  maxDuration: 300,
  queue: {
    concurrencyLimit: 1,
  },
  run: async (payload: { generationId: string }) => {
    await Database.Loader();
    if (!payload.generationId) {
      logger.warn("⚠️ No generationId provided, skipping task.");
      return;
    }

    const generation = await GenerationService.Get({
      id: payload.generationId
    });
    if (!generation) {
      logger.warn(`⚠️ No generation found for ID: ${payload.generationId}`);
      return;
    }

    const tempFilePath = join(tmpdir(), `${randomUUID()}.pdf`);

    try {
      const response = await axios.get(generation.fileLink, {
        responseType: "arraybuffer",
      });

      await writeFile(tempFilePath, response.data);
      logger.debug(`📄 PDF saved to temp path: ${tempFilePath}`);

      const parsedText: string[] = [];
      await new Promise((resolve, reject) => {
        new PdfReader().parseFileItems(tempFilePath, (err, item) => {
          if (err) {
            logger.error("❌ Error reading PDF");
            reject(err);
            return;
          }
          if (!item) return resolve(null);
          if (item.text) parsedText.push(item.text.trim());
        });
      });

      const completelyParsedText = parsedText.join('').trim();

      if (!completelyParsedText) {
        logger.error("❌ Parsed text is empty");
        await GenerationService.Update(generation.id, { jobStatus: 'FAILED', error: 'Parsed text is empty.' });
        return;
      }

      const detectCompanyPrompt = GemmaPrompt.CompanyDetectionPrompt(completelyParsedText);

      const gemmaResponse = await GemmaService.GenerateResponse<string[]>({
        prompt: detectCompanyPrompt,
        jsonSchema: GemmaSchema.DetectCompanySchema
      });

      if (!Array.isArray(gemmaResponse) || gemmaResponse.length === 0) {
        logger.error("❌ Gemma returned no companies");
        await GenerationService.Update(generation.id, { jobStatus: 'FAILED', error: 'No companies found in the document.' });
        return;
      }

      await Promise.allSettled(
        gemmaResponse.map((company) =>
          limit(async () => {
            const lowercaseCompany = company.trim().toLowerCase();
            logger.log(`🏢 Processing company: ${lowercaseCompany}`);

            try {
              const generatedCompany = await GenerationCompanyService.Create({
                name: lowercaseCompany,
                generation: {
                  connect: { id: generation.id },
                },
              });

              const githubUsers = await GithubService.GetAllOrganizationUsers(lowercaseCompany);

              if (githubUsers.length === 0) {
                logger.warn(`⚠️ No users found for ${lowercaseCompany}`);
                return;
              }

              await GenerationCompanyMemberService.CreateBulk(
                githubUsers.map((user) => ({
                  avatar_url: user.avatar_url,
                  companyId: generatedCompany.id,
                  organizations_url: user.organizations_url,
                  profile_url: user.html_url,
                  repositories_url: user.repos_url,
                  platform_id: `${user.id}`,
                  username: user.login,
                }))
              );
            } catch (err) {
              logger.error(`❌ Failed to process company: ${lowercaseCompany}`);
            }
          })
        )
      );

      await GenerationService.Update(generation.id, { jobStatus: 'SUCCESS' });
      logger.log('✅ Successfully processed generation');
    } catch (err) {
      logger.error("❌ Failed to fully process generation");
      await GenerationService.Update(payload.generationId, {
        jobStatus: 'FAILED',
        error: 'Failed to fully process generation'
      });
    } finally {
      await unlink(tempFilePath).catch(() =>
        logger.warn(`⚠️ Failed to delete temp file - ${tempFilePath}`)
      );
    }
  },
});
