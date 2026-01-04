
import { GoogleGenAI, Type } from "@google/genai";
import { AIProductInfo, SectionType } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateMarketingCopy(info: AIProductInfo): Promise<any> {
    const prompt = `
      제품명: ${info.name}
      주요 타겟: ${info.target}
      주요 특징: ${info.keyFeatures}
      원하는 어조: ${info.tone}

      위 정보를 바탕으로 한국어 상세페이지 마케팅 문구를 생성해줘. 
      상세페이지는 [MAIN, OVERVIEW, CONTENT, SPECS] 섹션으로 구성될 거야.
      각 섹션에 어울리는 헤드라인과 설명을 JSON 형식으로 응답해줘.
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            MAIN: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING }
              }
            },
            OVERVIEW: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            },
            CONTENT: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            SPECS: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("JSON Parsing Error", e);
      return null;
    }
  }

  async editImage(base64Image: string, prompt: string): Promise<string | null> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/png' } },
          { text: prompt }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }
}

export const geminiService = new GeminiService();
