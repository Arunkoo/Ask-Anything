# AI Structured Summarizer

A full-stack application that converts raw text into **clear, structured summaries** using Large Language Models.  
Designed with an emphasis on **reliable AI output**, clean UI, and maintainable architecture.

<img src="ASK%20ANYTHING.png" alt="App preview" width="850" />


## Overview

The app allows users to enter text and receive a short, beginner-friendly summary in a **strict JSON-backed format**, rendered cleanly on the frontend.

Unlike typical LLM demos, this project focuses on **predictability** — both in backend responses and frontend consumption.



## Live Demo

🔗 **Deployed App:** https://ask-anything-theta.vercel.app/  



## What it does

- Accepts raw text input from the UI
- Generates a concise summary using LLMs
- Validates and enforces structured responses
- Displays results with a clean, minimal interface



## Tech Stack

### Frontend
- **Next.js**
- **TypeScript**
- **shadcn/ui**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express**
- **LangChain**
- **Zod (schema validation)**
- **OpenAI / Gemini / Groq**



## Example Output

```json
{
  "summary": "A database is a system used to store and organize data so it can be easily accessed and managed.",
  "confidence": 0.92
}
