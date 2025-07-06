import { task, logger } from "@trigger.dev/sdk/v3";
import { Database } from "../lib/database";
import { PdfReader } from "pdfreader";
import { writeFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import axios from "axios";
import { randomUUID } from "crypto";
import { GemmaService } from "../services/gemma";
import { GemmaPrompt } from "../lib/genai/prompt";
import { GemmaSchema } from "../lib/genai/schema";
import { GenerationService } from "../services/generation";

export const processGenerationTask = task({
  id: "process-generation",
  maxDuration: 300,
  queue: {
    concurrencyLimit: 1,
  },
  run: async (payload: { generationId: string }, { ctx }) => {
    if (!payload.generationId) {
      logger.warn("⚠️ No generationId provided, skipping task.");
      return;
    }

    const generation = await GenerationService.Get(payload.generationId);

    if (!generation) {
      logger.warn(`⚠️ No generation found for ID: ${payload.generationId}`);
      return;
    }

    const tempFilePath = join(tmpdir(), `${randomUUID()}.pdf`);

    try {
      // Download the PDF file
      const response = await axios.get(generation.fileLink, {
        responseType: "arraybuffer",
      });

      // Save it to a temporary file
      await writeFile(tempFilePath, response.data);

      logger.debug(`📄 PDF saved to temp path: ${tempFilePath}`);

      const parsedText: string[] = [];
      // Parse the file
      await new Promise((resolve, reject) => {
        new PdfReader().parseFileItems(tempFilePath, (err, item) => {
          if (err) {
            logger.error("PDF read error");
            reject(err);
          };
          if (!item) return resolve(item);
          if (item?.text) {
            parsedText.push(item?.text?.trim());
          };
        });
      });
      const completelyParsedText = parsedText.join('').trim();

      const detectCompanyPrompt = GemmaPrompt.CompanyDetectionPrompt(completelyParsedText)
      const gemmaResponse = await GemmaService.GenerateResponse<string[]>({
        prompt: detectCompanyPrompt,
        jsonSchema: GemmaSchema.DetectCompanySchema
      });
      for (const company of gemmaResponse) {
        console.log(company);
      };

    } catch (err) {
      logger.error("❌ Failed to process PDF");
      await GenerationService.Update(payload.generationId, {
        jobStatus: 'FAILED'
      });
    } finally {
      // Clean up the temp file
      await unlink(tempFilePath).catch(() =>
        logger.warn("⚠️ Failed to delete temp file:")
      );
    }
  },
});
