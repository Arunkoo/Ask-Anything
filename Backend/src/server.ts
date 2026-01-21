import express from "express";
import cors from "cors";

import { loadEnv } from "./env";
import { askStructured } from "./ask-core";
import { success } from "zod";

loadEnv();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(
  cors({
    origin: "https://ask-anything-theta.vercel.app/",
    methods: ["POST", "GET", "OPTIONS", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

app.post("/ask", async (req, res) => {
  try {
    const { query } = req.body ?? {};
    if (!query || !String(query).trim()) {
      return res.status(400).json({
        success: false,
        response: null,
        error: "No query detected",
      });
    }

    const response = await askStructured(query);

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      response: null,
      error: "Failed to answer",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
