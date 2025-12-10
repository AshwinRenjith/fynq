import React, { useEffect, useState } from "react";
import { query as ragQuery } from "../lib/rag";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate";

type Message = { id: number; role: "user" | "assistant" | "system"; text: string };

export const ChatRAG: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // welcome message
    setMessages([{ id: 0, role: "assistant", text: "Hi — ask me anything about Fynq's products and services." }]);
  }, []);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setLoading(true);
    // retrieve top passages
    const hits = await ragQuery(text, 4);

    // build a system prompt that instructs the model to use only provided context
    const contextText = hits.map((h, i) => `Context ${i + 1}: ${h.text}`).join("\n\n");

    const prompt = `You are a helpful assistant. Use ONLY the following context to answer the user's question. If the answer is not contained in the context, say you don't know.\n\n${contextText}\n\nUser question: ${text}`;

    // call Gemini (client-side). Warning: exposing API key in client is insecure.
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    let answer = "";
    if (!apiKey) {
      answer = `No API key provided. Here are the retrieved passages:\n\n${contextText}`;
    } else {
      try {
        const body = {
          prompt: { text: prompt },
          // model-specific params
          temperature: 0.2,
          maxOutputTokens: 512,
        };

        const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const textErr = await res.text();
          answer = `LLM error: ${res.status} ${textErr}`;
        } else {
          const data = await res.json();
          // For different API versions the field naming varies. We try to extract text safely.
          answer = data?.candidates?.[0]?.content?.[0]?.text || data?.output?.[0]?.content?.text || JSON.stringify(data);
        }
      } catch (err: any) {
        answer = `Request failed: ${err.message || err}`;
      }
    }

    const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", text: answer };
    setMessages((m) => [...m, assistantMsg]);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-card rounded-lg shadow-sm">
      <div className="space-y-3 mb-3">
        {messages.map((m) => (
          <div key={m.id} className={`p-3 rounded-md ${m.role === "user" ? "bg-foreground/5 text-foreground" : "bg-background text-muted-foreground"}`}>
            <div className="text-sm whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-full border border-border px-4 py-3 focus:outline-none"
          placeholder="Ask something about our products or services"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} disabled={loading} className="bg-foreground text-background px-4 py-2 rounded-full">
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatRAG;
