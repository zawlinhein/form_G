"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function chatWithAI(prompt: string) {
  try {
    const chatSession = model.startChat({
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await chatSession.sendMessage(prompt);
    const text = result.response.text();

    // Parse it here so the server catches any JSON errors
    return { success: true, data: JSON.parse(text) };
  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    // Return a readable error message
    return {
      success: false,
      error: error.message || "Failed to generate form",
    };
  }
}
