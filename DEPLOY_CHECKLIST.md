# Redeploy Checklist for /api/gemini

- [ ] Ensure only one API env var is set in the deployment environment:
  - Prefer `GOOGLE_API_KEY` for the `google-genai` SDK.
  - If you set `GEMINI_API_KEY`, the proxy will copy it to `GOOGLE_API_KEY` at startup and remove `GEMINI_API_KEY` to avoid duplicate-key errors.
- [ ] Add `requirements.txt` entry `google-genai` (already present) and pin in production if desired.
- [ ] Ensure the Python runtime is enabled in Vercel and `vercel.json` rewrites `/api/*` to the Python handler.
- [ ] Redeploy and confirm logs show successful import of `google.genai` (no duplicate-key warnings).
- [ ] Smoke test production endpoint with a POST to `/api/gemini` (use `scripts/test_api_gemini.py`).
- [ ] Verify front-end can call `/api/gemini` without CORS or 500 errors.
- [ ] If you see `API key not valid` in logs during testing, confirm the API key value in Vercel is correct and has access to the Generative Language API.

Optional:
- Pin `google-genai` in `requirements.txt` to a tested version to avoid signature drift.
