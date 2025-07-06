import { googleAI } from "../lib/genai";
import { LunarError } from "../lib/utils/errors";

type TypeGenerateResponseProps = {
    model?: string;
    prompt: string;
    systemInstruction?: string;
    jsonSchema?: object;
}


/**
 * Generates a response from Google's Gemini model with optional schema-based JSON parsing.
 *
 * This function:
 * - Sends a prompt to the specified Gemini model (default: `gemini-2.5-flash`).
 * - Supports optional `systemInstruction` to steer the model.
 * - If a `jsonSchema` is provided, enforces a structured JSON response and parses it.
 * - Throws a `LunarError.Platform('500')` on failure or invalid output.
 *
 * @template T - Expected return type when `jsonSchema` is provided.
 *
 * @async
 * @function GenerateResponse
 * @param {Object} props - Generation parameters.
 * @param {string} [props.model='gemini-2.5-flash'] - The Gemini model to invoke.
 * @param {string} props.prompt - The prompt text to send to the model.
 * @param {string} [props.systemInstruction] - Optional system-level instruction.
 * @param {object} [props.jsonSchema] - Optional JSON schema to validate structured response.
 * @returns {Promise<T | string>} - Parsed JSON response if schema is provided, otherwise plain text.
 *
 * @throws {PlatformError} If the model returns no text or invalid JSON.
 *
 * @example
 * const result = await GemmaService.GenerateResponse<string[]>({
 *   prompt: "List 3 fruits in JSON array",
 *   jsonSchema: { type: "array", items: { type: "string" } }
 * });
 */
const GenerateResponse = async<T>({
    model = 'gemini-2.5-flash',
    prompt,
    jsonSchema,
    systemInstruction
}: TypeGenerateResponseProps) => {
    const gemmaResponse = await googleAI.instance.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...(systemInstruction && {
                systemInstruction
            }),
            ...(jsonSchema && {
                responseJsonSchema: jsonSchema,
                responseMimeType: 'application/json'
            })
        }
    });
    if (!gemmaResponse.text) throw new LunarError.Platform('500');
    if (jsonSchema) {
        try {
            return JSON.parse(gemmaResponse.text) as T;
        } catch (error) {
            throw new LunarError.Platform('500');
        }
    }
    return gemmaResponse.text as T;
}

export const GemmaService = {
    GenerateResponse
}