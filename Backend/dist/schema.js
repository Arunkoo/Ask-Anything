"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskResultSchema = void 0;
const zod_1 = require("zod");
exports.AskResultSchema = zod_1.z.object({
    summary: zod_1.z.string().min(1).max(250),
    confidence: zod_1.z.number().min(0).max(1),
});
