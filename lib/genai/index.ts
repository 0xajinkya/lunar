import { GoogleGenAI } from "@google/genai"

const instance = new GoogleGenAI({
    apiKey: 'AIzaSyC31_zLnz06bR0LvIrLvLy2SxBz_74Fbxw'
})

export const googleAI = {
    instance
}