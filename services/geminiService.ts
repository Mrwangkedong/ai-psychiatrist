
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTIONS } from "../constants";
import { AgeGroup } from "../types";

export const chatWithAI = async (
  prompt: string, 
  ageGroup: AgeGroup, 
  history: {role: 'user' | 'model', parts: {text: string}[]}[] = []
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  try {
    const systemInstruction = SYSTEM_INSTRUCTIONS[ageGroup] + 
      "\n重要提醒：如果检测到用户有自杀、自残或伤害他人的倾向，请立即用醒目文字引导用户寻求专业医疗机构或拨打紧急求助电话（如120、110或全国心理咨询热线：400-161-9995）。";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    return response.text || "对不起，我现在无法回答。请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "非常抱歉，我现在遇到了一些技术问题，请稍等片刻。如果您的情绪非常低落，请务必联系身边的亲友或专业机构。";
  }
};
