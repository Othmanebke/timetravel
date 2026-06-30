import { Mistral } from "@mistralai/mistralai";
import { SYSTEM_PROMPT } from "./_systemPrompt.js";

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY ?? "" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages = [] } = req.body ?? {};
    const safeHistory = messages
      .filter((m) => m && typeof m.content === "string" && m.content.trim())
      .slice(-12)
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content.slice(0, 2000),
      }));

    if (!safeHistory.length) {
      res.status(400).json({ error: "No message provided" });
      return;
    }

    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeHistory],
      temperature: 0.7,
      maxTokens: 350,
    });

    const reply =
      result.choices?.[0]?.message?.content ??
      "Désolé, je n'ai pas de réponse à vous proposer pour le moment.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Mistral API error:", err?.message || err);
    res.status(500).json({
      error: "AI request failed",
      reply:
        "Mes circuits temporels rencontrent une turbulence. Réessayez dans un instant, ou contactez directement un chrono-guide humain.",
    });
  }
}
