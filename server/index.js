import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Dynamic import: must happen after dotenv.config() so MISTRAL_API_KEY
// is available when ../api/chat.js builds its Mistral client.
const { default: chatHandler } = await import("../api/chat.js");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => chatHandler(req, res));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API locale prête sur http://localhost:${PORT}`);
});
