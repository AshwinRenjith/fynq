import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Send, X, Sparkles, User } from "lucide-react";
import { query as ragQuery } from "@/lib/rag";

const GEMINI_PROXY = import.meta.env.VITE_GEMINI_PROXY || "/api/gemini";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** If provided, the chat will send this message once when opened. */
  queuedMessage?: string;
  onQueuedMessageConsumed?: () => void;
};

function stripMarkdownToText(input: string): string {
  let text = input || "";
  // Remove fenced code blocks
  text = text.replace(/```[\s\S]*?```/g, (m) => {
    const inner = m.replace(/^```\w*\n?/, "").replace(/```$/, "");
    return inner;
  });
  // Inline code
  text = text.replace(/`([^`]+)`/g, "$1");
  // Images: ![alt](url) -> alt
  text = text.replace(/!\[([^\]]*)\]\([^\)]*\)/g, "$1");
  // Links: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^\)]*\)/g, "$1");
  // Headings and blockquotes
  text = text.replace(/^\s{0,3}#{1,6}\s+/gm, "");
  text = text.replace(/^\s?>\s?/gm, "");
  // Bold/italic/strikethrough
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");
  text = text.replace(/~~([^~]+)~~/g, "$1");
  // List markers
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  // Horizontal rules
  text = text.replace(/^\s*([-*_]){3,}\s*$/gm, "");
  // Collapse excessive blank lines
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

function extractModelText(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  if (!(s.startsWith("{") || s.startsWith("["))) return raw;

  try {
    const data: any = JSON.parse(s);

    // Common shapes
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
    // ignore parse errors; return as-is
  }
  return raw;
}

export const ColabChat: React.FC<Props> = ({ open, onOpenChange, queuedMessage, onQueuedMessageConsumed }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sendingRef = useRef(false);

  // Suggestions for empty state
  const suggestions = useMemo(
    () => [
      "What does Fynq build?",
      "Explain RAG assistants for law firms",
      "How can you automate CA workflows?",
    ],
    []
  );

  // Initialize greeting - removed to mimic Colab "empty prompt" state
  // If you prefer a greeting, uncomment this:
  /*
  useEffect(() => {
    if (!open) return;
    if (messages.length) return;
    setMessages([{ id: 0, role: "assistant", text: "Hello! How can I help you today?" }]);
  }, [open, messages.length]);
  */

  useEffect(() => {
    if (!open) return;
    if (!queuedMessage) return;
    if (sendingRef.current) return;

    sendingRef.current = true;
    void handleSend(queuedMessage, true).finally(() => {
      sendingRef.current = false;
      onQueuedMessageConsumed?.();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, queuedMessage]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [open, messages]);

  async function handleSend(forcedText?: string, fromQueue?: boolean) {
    const text = (forcedText ?? input).trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    if (!fromQueue) setInput("");

    setLoading(true);
    try {
      const hits = await ragQuery(text, 4);
      const contextText = hits.length ? hits.map((h, i) => `Context ${i + 1}: ${h.text}`).join("\n\n") : "No context retrieved.";

      const prompt = `You are a helpful assistant. Use ONLY the following context to answer the user's question. If the answer is not contained in the context, say you don't know. Respond in plain text (no Markdown).\n\n${contextText}\n\nUser question: ${text}`;

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

      if (!res.ok) {
        const rawErr = await res.text();
        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: "assistant",
          text: `LLM error: ${res.status} ${rawErr || "Request failed"}`,
        };
        setMessages((m) => [...m, assistantMsg]);
        return;
      }

      if (!res.body) {
        const raw = await res.text();
        let data: any = null;
        try { data = raw ? JSON.parse(raw) : null; } catch { data = null; }
        const answer = stripMarkdownToText(extractModelText(data?.text || data?.output || raw || "No content returned from model."));
        setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: answer }]);
        return;
      }

      const assistantId = Date.now() + 1;
      setMessages((m) => [...m, { id: assistantId, role: "assistant", text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = !!streamDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => prev.map((msg) => (msg.id === assistantId ? { ...msg, text: msg.text + chunk } : msg)));
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, text: stripMarkdownToText(extractModelText(msg.text)) } : msg
        )
      );
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", text: `Request failed: ${err?.message || err}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function close() {
    onOpenChange(false);
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-[30%] -translate-x-1/2 z-[999999] w-[700px] max-w-[calc(100vw-2rem)]"
          role="dialog"
          aria-label="Chat with Fynq"
        >
          {/* Main Container - Auto growing */}
          <div className="relative flex flex-col w-full bg-background/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden">

            {/* Header / Dismiss Area */}
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={close}
                className="p-1 rounded-full text-foreground/40 hover:text-foreground/80 hover:bg-black/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            {messages.length > 0 && (
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh] min-h-[120px] scrollbar-thin scrollbar-thumb-foreground/10 hover:scrollbar-thumb-foreground/20"
              >
                {messages.map((m) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id}
                    className={`flex items-start gap-4 ${m.role === "assistant" ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${m.role === "assistant" ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-foreground/5 text-foreground/70"}
                      `}
                    >
                      {m.role === "assistant" ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div
                      className={`
                        px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed max-w-[85%] shadow-sm
                        ${m.role === "assistant"
                          ? "bg-white dark:bg-zinc-800/50 text-foreground border border-black/5 dark:border-white/5"
                          : "bg-blue-600 text-white"
                        }
                      `}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty State / Suggestions */}
            {messages.length === 0 && (
              <div className="p-6 pb-2">
                <div className="flex flex-wrap gap-2 justify-start mb-4">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      type="button"
                      onClick={() => void handleSend(s)}
                      className="px-3 py-1.5 rounded-full bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-black/5 dark:border-white/5 text-xs font-medium text-foreground/70 transition-colors text-left"
                    >
                      <span className="opacity-50 mr-1.5">✦</span> {s}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 pt-0">
              <div className="relative group rounded-[20px] bg-foreground/[0.03] border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50">
                <div className="flex items-center gap-3 px-4 py-3">

                  <button type="button" className="p-1.5 rounded-full text-foreground/40 hover:text-blue-500 hover:bg-blue-500/10 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our AI solutions..."
                    className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 font-body text-[16px] text-foreground placeholder:text-muted-foreground/50"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") void handleSend();
                    }}
                    autoFocus
                  />

                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={!input.trim() || loading}
                    className={`
                      p-2 rounded-full transition-all duration-200
                      ${input.trim()
                        ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                        : "bg-transparent text-foreground/20 cursor-not-allowed"}
                    `}
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-[10px] text-muted-foreground/40 font-medium tracking-wide">
                  POWERED BY FYNQ AI
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
export default ColabChat;
