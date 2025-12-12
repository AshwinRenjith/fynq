import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { spawn } from "child_process";

const ROOT_DIR = path.resolve(__dirname, "..");
const PYTHON_ENTRY = path.resolve(ROOT_DIR, "api", "gemini.py");
const PYTHON_BIN = process.env.PYTHON_BIN || (process.platform === "win32" ? "python" : "python3");
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function runGeminiPython(payload: Record<string, unknown>) {
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    const proc = spawn(PYTHON_BIN, [PYTHON_ENTRY], {
      env: { ...process.env },
    });

    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    proc.on("error", (err) => reject(err));
    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || stdout.trim() || `Python exited with code ${code}`));
        return;
      }

      try {
        resolve(JSON.parse(stdout || "{}"));
      } catch (err: any) {
        reject(new Error(`Invalid JSON from python: ${err?.message || err}`));
      }
    });

    proc.stdin.write(JSON.stringify(payload));
    proc.stdin.end();
  });
}

function createGeminiDevMiddleware(apiKey?: string) {
  if (apiKey) {
    process.env.GEMINI_API_KEY = apiKey;
  }
  return {
    name: "vite:gemini-dev-middleware",
    configureServer(server) {
      server.middlewares.use("/api/gemini", async (req, res) => {
        if (!process.env.GEMINI_API_KEY) {
          res.statusCode = 500;
          Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
          res.end(JSON.stringify({ error: "Missing GEMINI_API_KEY" }));
          return;
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
          res.end(JSON.stringify({ error: "Method not allowed" }));
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
          Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
          res.end(JSON.stringify({ error: "Missing prompt" }));
          return;
        }

        try {
          const data = await runGeminiPython({ prompt, temperature, maxOutputTokens });
          res.statusCode = 200;
          Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
          res.end(JSON.stringify(data));
        } catch (error: any) {
          // Try to extract a structured error from the python subprocess.
          const raw = error?.message || String(error);
          let parsed: any = null;
          try {
            parsed = JSON.parse(raw);
          } catch (e) {
            parsed = null;
          }

          // If python returned structured JSON with an `error` field, forward it
          // and use 400 as the client-provided payload or API errors are likely
          // user-level issues. Otherwise, map known substrings to 400.
          if (parsed && parsed.error) {
            res.statusCode = 400;
            Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
            res.end(JSON.stringify(parsed));
            return;
          }

          if (raw && (raw.includes("INVALID_ARGUMENT") || raw.includes("API key not valid"))) {
            res.statusCode = 400;
            Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
            res.end(JSON.stringify({ error: raw }));
            return;
          }

          res.statusCode = 500;
          Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
          res.end(JSON.stringify({ error: raw || "Python invocation failed" }));
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
