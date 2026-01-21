"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const ask_core_1 = require("./ask-core");
(0, env_1.loadEnv)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://ask-anything-theta.vercel.app/",
    methods: ["POST", "GET", "OPTIONS", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
}));
app.post("/ask", async (req, res) => {
    try {
        const { query } = req.body ?? {};
        if (!query || !String(query).trim()) {
            return res.status(400).json({
                error: "No query detected",
            });
        }
        const response = await (0, ask_core_1.askStructured)(query);
        return res.status(200).json({
            success: true,
            response,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to answer",
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
