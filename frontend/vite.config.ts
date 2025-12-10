import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate";

function createGeminiDevMiddleware(apiKey?: string) {
  return {
    name: "vite:gemini-dev-middleware",
    configureServer(server) {
      server.middlewares.use("/api/gemini", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing GEMINI_API_KEY" }));
          return;
        }

        let rawBody = "";
        for await (const chunk of req) {
          rawBody += chunk;
        }

        let payload: Record<string, unknown>;
        try {
          payload = rawBody ? JSON.parse(rawBody) : {};
        } catch (error: any) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Invalid JSON body" }));
          return;
        }

        const { prompt, temperature = 0.2, maxOutputTokens = 512 } = payload as {
          prompt?: string;
          temperature?: number;
          maxOutputTokens?: number;
        };

        if (!prompt || typeof prompt !== "string") {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing prompt" }));
          return;
        }

        try {
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
          res.statusCode = upstream.ok ? 200 : upstream.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        } catch (error: any) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: error?.message || "Upstream request failed" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars from .env files (VITE_ prefixed and non-prefixed)
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
  
  console.log('[vite.config] GEMINI_API_KEY available:', !!apiKey);
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      ...(mode === "development" ? [createGeminiDevMiddleware(apiKey)] : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
