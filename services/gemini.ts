
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Quantum-Super Cyber Intelligence AI", a highly advanced security assistant.
Your expertise includes:
1. Threat vector analysis.
2. Quantum-encryption vulnerability detection.
3. Network intrusion forensics.
4. Strategic cyber-defense recommendations.

Always respond in a technical, crisp, and authoritative tone typical of high-end sci-fi terminals. 
Use markdown for structure. 
If asked about system status, assume you are monitoring a massive quantum compute grid.
Keep responses concise but information-dense.
`;

export type AIResponseMode = 'FAST' | 'DEEP';

export const getGeminiResponse = async (prompt: string, mode: AIResponseMode = 'FAST'): Promise<string> => {
  try {
    // Initialize AI client with API_KEY from environment variables as required
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Configure models based on task type following recommended naming conventions
    const config = mode === 'DEEP' 
      ? {
          model: 'gemini-3-pro-preview', // Complex Text Tasks
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 1.0,
            thinkingConfig: { thinkingBudget: 32768 } // Max thinking budget for gemini-3-pro-preview
          }
        }
      : {
          model: 'gemini-3-flash-preview', // Basic Text Tasks
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          }
        };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: config.model,
      contents: prompt,
      config: config.config,
    });

    // Directly access .text property as per @google/genai specifications
    return response.text || "NO RESPONSE FROM CORE INTELLIGENCE";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "COMMUNICATION RELAY ERROR: UNABLE TO ACCESS INTELLIGENCE MODULE. CHECK QUANTUM LINK.";
  }
};
