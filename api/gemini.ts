// Serverless proxy for Gemini. Keeps the API key on the server.
// Expects POST { prompt: string, temperature?: number, maxOutputTokens?: number }
// Set GEMINI_API_KEY in Vercel project env vars.

import type { VercelRequest, VercelResponse } from "@vercel/node";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const { prompt, temperature = 0.2, maxOutputTokens = 512 } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const body = {
      prompt: { text: prompt },
      temperature,
      maxOutputTokens,
    };

    const upstream = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Unknown error" });
  }
}
