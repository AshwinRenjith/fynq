import React, { useEffect, useState } from "react";
import { query as ragQuery } from "../lib/rag";

const GEMINI_PROXY = import.meta.env.VITE_GEMINI_PROXY || "/api/gemini";

type Message = { id: number; role: "user" | "assistant" | "system"; text: string };

function stripMarkdownToText(input: string): string {
  let text = input || "";
  text = text.replace(/```[\s\S]*?```/g, (m) => m.replace(/^```\w*\n?/, "").replace(/```$/, ""));
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^\)]*\)/g, "$1");
  text = text.replace(/\[([^\]]+)\]\([^\)]*\)/g, "$1");
  text = text.replace(/^\s{0,3}#{1,6}\s+/gm, "");
  text = text.replace(/^\s?>\s?/gm, "");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");
  text = text.replace(/~~([^~]+)~~/g, "$1");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

function extractModelText(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  if (!(s.startsWith("{") || s.startsWith("["))) return raw;
  try {
    const data: any = JSON.parse(s);
    if (typeof data?.text === "string") return data.text;
    if (typeof data?.output === "string") return data.output;
    const cand = data?.candidates?.[0];
    if (typeof cand?.output === "string") return cand.output;
    if (typeof cand?.text === "string") return cand.text;
    if (cand?.content) {
      const content = cand.content;
      if (typeof content === "string") return content;
      if (Array.isArray(content)) {
        const first = content[0];
        if (typeof first === "string") return first;
        if (typeof first?.text === "string") return first.text;
      }
    }
  } catch {
    // ignore
  }
  return raw;
}

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

      console.log("[ChatRAG] Calling /api/gemini (stream)...");

      const body = {
        prompt,
        temperature: 0.2,
        maxOutputTokens: 512,
        stream: true,
        responseFormat: "text",
      };

      const res = await fetch(GEMINI_PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("[ChatRAG] Response status:", res.status);

      if (!res.ok) {
        const rawErr = await res.text();
        const errMsg = rawErr || `HTTP ${res.status}`;
        console.error("[ChatRAG] Error response:", errMsg);
        const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", text: `LLM error: ${res.status} ${errMsg}` };
        setMessages((m) => [...m, assistantMsg]);
      } else if (!res.body) {
        // No streaming body available — fall back to full response
        const raw = await res.text();
        let data: any = null;
        try {
          data = raw ? JSON.parse(raw) : null;
        } catch (e) {
          console.warn("[ChatRAG] Non-JSON response body:", raw);
        }
        const text = stripMarkdownToText(extractModelText(data?.text || data?.output || raw || "No content returned from model."));
        const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", text };
        setMessages((m) => [...m, assistantMsg]);
      } else {
        // Streaming response: read chunks and append progressively
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        const assistantId = Date.now() + 1;
        // push empty assistant message which we'll update
        setMessages((m) => [...m, { id: assistantId, role: "assistant", text: "" }]);

        let done = false;
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = !!streamDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            // append chunk to the assistant message
            setMessages((prev) => prev.map((msg) => (msg.id === assistantId ? { ...msg, text: msg.text + chunk } : msg)));
          }
        }

        // Strip markdown artifacts once the stream completes
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, text: stripMarkdownToText(extractModelText(msg.text)) } : msg
          )
        );
      }
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
          placeholder="Ask about our AI solutions…"
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
