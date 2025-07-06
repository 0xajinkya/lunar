import { GoogleGenAI } from "@google/genai"
import { config } from "../utils/env"

const instance = new GoogleGenAI({
    apiKey: config.google.genai_key
})

export const googleAI = {
    instance
}