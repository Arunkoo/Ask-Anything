import { ChatOpenAI } from "@langchain/openai";
import { loadEnv } from "./env";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

export type Provider = "openai" | "gemini" | "groq";

export function createChatModel(): { Provider: Provider; model: any } {
  loadEnv();

  const forced = (process.env.PROVIDER || "").toLowerCase();
  const isOpenAI = !!process.env.OPENAI_API_KEY;
  const isGroqAI = !!process.env.GROQ_API_KEY;
  const isGeminiAI = !!process.env.GOOGLE_API_KEY;

  const base = { temperature: 0 as const };
  if (forced === "openai" || (!forced && isOpenAI)) {
    return {
      Provider: "openai",
      model: new ChatOpenAI({
        ...base,
        model: "gpt-4o-mini",
      }),
    };
  }
  if (forced === "gemini" || (!forced && isGeminiAI)) {
    return {
      Provider: "gemini",
      model: new ChatGoogleGenerativeAI({
        ...base,
        model: "gemini-2.0-flash-lite",
      }),
    };
  }
  if (forced === "groq" || (!forced && isGroqAI)) {
    return {
      Provider: "groq",
      model: new ChatGroq({
        ...base,
        model: "llama-3.1-8b-instant",
      }),
    };
  }

  return {
    Provider: "gemini",
    model: new ChatGoogleGenerativeAI({
      ...base,
      model: "gemini-2.0-flash-lite",
    }),
  };
}
