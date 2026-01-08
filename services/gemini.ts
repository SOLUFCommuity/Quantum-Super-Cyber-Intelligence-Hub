
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

export type AIResponseMode = 'FAST' | 'DEEP' | 'SEARCH';

export const getGeminiResponse = async (prompt: string, mode: AIResponseMode = 'FAST'): Promise<{text: string, sources?: any[]}> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let modelName = 'gemini-3-flash-preview';
    let config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    };

    if (mode === 'DEEP') {
      modelName = 'gemini-3-pro-preview';
      config.thinkingConfig = { thinkingBudget: 32768 };
    } else if (mode === 'SEARCH') {
      modelName = 'gemini-3-flash-preview';
      config.tools = [{ googleSearch: {} }];
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: config,
    });

    const text = response.text || "NO RESPONSE FROM CORE INTELLIGENCE";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "COMMUNICATION RELAY ERROR: UNABLE TO ACCESS INTELLIGENCE MODULE. CHECK QUANTUM LINK." };
  }
};

// Audio Decoding/Encoding for Live API
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
