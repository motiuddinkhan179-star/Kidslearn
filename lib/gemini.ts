import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const simplifyContent = async (base64Data: string, mimeType: string, apiKey: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are a friendly storyteller for 5-year-old children. 
    I will provide you with a document or image (it could be a whole book or a single page). 
    Your task is to convert the ENTIRE content into a very simple, engaging, and fun story that a 5-year-old would understand.
    
    ABSOLUTE "TOTAL CONTENT" POLICY - NO SUMMARIZATION ALLOWED:
    1. 100% COMPLETE CONVERSION: You must convert EVERY SINGLE PAGE (if PDF) or EVERY SINGLE DETAIL (if Image), EVERY SINGLE PARAGRAPH, and EVERY SINGLE LINE. Do not skip even one word's meaning.
    2. NO SUMMARIES: Your output must be long enough to explain everything in detail. Summarizing is a FAILURE. 
    3. LINE-BY-LINE DETAIL: For every complex sentence in the original, you must have a corresponding simple Hinglish explanation. 
    4. PARAGRAPH-BY-PARAGRAPH: Follow the original structure exactly. Do not merge paragraphs. Explain each one fully.
    5. COMPLETE MAPPING: 
       - If it's a PDF, start each page's section with: "--- PAGE [Number] KI MAGIC KAHANI ---"
       - If it's an Image, explain everything visible in that image.
    6. UNLIMITED LENGTH: Your response should be extremely long. Do not worry about being brief. Be as detailed as possible.
    7. LANGUAGE: Use "Hinglish" (Hindi + English). Talk like a warm, loving parent reading to their child.
    8. KID-LOGIC: Explain complex things using toys, animals, and magic. 
    9. EMOJIS: Use emojis on every few lines. 🌟🎈🧸📖🌈🦄🍎🚗
    
    VERIFICATION: At the very end, add a section called "Magic Completion Proof ✅" where you confirm: "Maine content ka ek-ek word aur ek-ek line bacho ke liye aasan bana di hai!"
    
    Goal: The child should know 100% of the information in the original content. Your output must be a complete, simplified "mirror" of the entire content.
  `;

  const contentPart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }, contentPart] }],
  });

  return response.text || "I couldn't read that story. Maybe try another one?";
};
