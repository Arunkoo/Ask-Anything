"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askStructured = askStructured;
const lc_model_1 = require("./lc-model");
const schema_1 = require("./schema");
async function askStructured(query) {
    const { model } = (0, lc_model_1.createChatModel)();
    //keep instruction breif...
    const system = "You are a concise assitant. Return only the requested JSON.";
    const user = `Summerize for beginner:\n` +
        `"${query}"\n` +
        `Return fields: summary (short paragraph of 2 to 3 line max), confidence (0..1)`;
    const modelWithStructure = model.withStructuredOutput(schema_1.AskResultSchema);
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
