import React, { useEffect, useState } from "react";
import { query as ragQuery } from "../lib/rag";

const GEMINI_PROXY = "/api/gemini";

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
    
    console.log("[ChatRAG] Sending message:", text);
    
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setLoading(true);
    try {
      // retrieve top passages (surface a friendly error if the knowledge file is missing)
      console.log("[ChatRAG] Fetching RAG context...");
      const hits = await ragQuery(text, 4);
      console.log("[ChatRAG] Retrieved hits:", hits.length);

      const contextText = hits.length
        ? hits.map((h, i) => `Context ${i + 1}: ${h.text}`).join("\n\n")
        : "No context retrieved.";

      const prompt = `You are a helpful assistant. Use ONLY the following context to answer the user's question. If the answer is not contained in the context, say you don't know.\n\n${contextText}\n\nUser question: ${text}`;

      console.log("[ChatRAG] Calling /api/gemini...");
      let answer = "";
      const body = {
        prompt,
        temperature: 0.2,
        maxOutputTokens: 512,
      };

      const res = await fetch(GEMINI_PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("[ChatRAG] Response status:", res.status);

      if (!res.ok) {
        const textErr = await res.text();
        console.error("[ChatRAG] Error response:", textErr);
        answer = `LLM error: ${res.status} ${textErr}`;
      } else {
        const data = await res.json();
        console.log("[ChatRAG] Response data:", data);
        const candidate = data?.candidates?.[0];
        answer =
          candidate?.content?.[0]?.text ||
          candidate?.output ||
          data?.output ||
          (typeof data === "string" ? data : JSON.stringify(data));
      }

      console.log("[ChatRAG] Final answer:", answer.substring(0, 100));
      const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", text: answer };
      setMessages((m) => [...m, assistantMsg]);
    } catch (err: any) {
      console.error("[ChatRAG] Exception:", err);
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: `Request failed: ${err?.message || err}`,
      };
      setMessages((m) => [...m, assistantMsg]);
    } finally {
      setLoading(false);
    }
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
        <button type="button" onClick={handleSend} disabled={loading} className="bg-foreground text-background px-4 py-2 rounded-full">
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatRAG;
