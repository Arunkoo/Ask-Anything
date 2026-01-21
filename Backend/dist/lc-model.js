"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatModel = createChatModel;
const openai_1 = require("@langchain/openai");
const env_1 = require("./env");
const google_genai_1 = require("@langchain/google-genai");
const groq_1 = require("@langchain/groq");
function createChatModel() {
    (0, env_1.loadEnv)();
    const forced = (process.env.PROVIDER || "").toLowerCase();
    const isOpenAI = !!process.env.OPENAI_API_KEY;
    const isGroqAI = !!process.env.GROQ_API_KEY;
    const isGeminiAI = !!process.env.GOOGLE_API_KEY;
    const base = { temperature: 0 };
    if (forced === "openai" || (!forced && isOpenAI)) {
        return {
            Provider: "openai",
            model: new openai_1.ChatOpenAI({
                ...base,
                model: "gpt-4o-mini",
            }),
        };
    }
    if (forced === "gemini" || (!forced && isGeminiAI)) {
        return {
            Provider: "gemini",
            model: new google_genai_1.ChatGoogleGenerativeAI({
                ...base,
                model: "gemini-2.0-flash-lite",
            }),
        };
    }
    if (forced === "groq" || (!forced && isGroqAI)) {
        return {
            Provider: "groq",
            model: new groq_1.ChatGroq({
                ...base,
                model: "llama-3.1-8b-instant",
            }),
        };
    }
    return {
        Provider: "gemini",
        model: new google_genai_1.ChatGoogleGenerativeAI({
            ...base,
            model: "gemini-2.0-flash-lite",
        }),
    };
}
