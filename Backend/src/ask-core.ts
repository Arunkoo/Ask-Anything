import { createChatModel } from "./lc-model";
import { AskResultSchema, AskResult } from "./schema";

export async function askStructured(query: string): Promise<AskResult> {
  const { model } = createChatModel();

  //keep instruction breif...
  const system = "You are a concise assitant. Return only the requested JSON.";
  const user =
    `Summerize for beginner:\n` +
    `"${query}"\n` +
    `Return fields: summary (short paragraph of 2 to 3 line max), confidence (0..1)`;

  const modelWithStructure = model.withStructuredOutput(AskResultSchema);
  const response = await modelWithStructure.invoke([
    {
      role: "system",
      content: system,
    },
    {
      role: "user",
      content: user,
    },
  ]);

  return response;
}
