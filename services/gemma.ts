import { googleAI } from "../lib/genai";
import { LunarError } from "../lib/utils/errors";

type TypeGenerateResponseProps = {
    model?: string;
    prompt: string;
    systemInstruction?: string;
    jsonSchema?: object;
}

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