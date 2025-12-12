"""Gemini 2.5 Flash proxy using the official python client."""

from __future__ import annotations

import argparse
import json
import os
import sys
import inspect
from typing import Any, Dict

try:  # Available only inside Vercel Python runtime
    from vercel import VercelRequest, VercelResponse  # type: ignore
except ModuleNotFoundError:  # Local dev / CLI mode
    VercelRequest = VercelResponse = None  # type: ignore

GEMINI_MODEL = "gemini-2.5-flash"
BASE_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}


def _prime_google_env() -> None:
    """Ensure the SDK only sees GOOGLE_API_KEY before it loads."""

    gemini_key = os.environ.get("GEMINI_API_KEY")
    google_key = os.environ.get("GOOGLE_API_KEY")

    if gemini_key and not google_key:
        os.environ["GOOGLE_API_KEY"] = gemini_key
        google_key = gemini_key

    if google_key and gemini_key:
        # Remove the redundant variable so the SDK never detects duplicates.
        os.environ.pop("GEMINI_API_KEY", None)


def _ensure_api_key() -> str:
    _prime_google_env()
    key = os.environ.get("GOOGLE_API_KEY")
    if not key:
        raise ValueError("Missing GEMINI_API_KEY")
    return key


_prime_google_env()

from google import genai


def _run_generation(prompt: str, max_output_tokens: int) -> Dict[str, Any]:
    client = genai.Client(api_key=_ensure_api_key())
    # The google-genai client has evolved; some versions accept `temperature`
    # and `max_output_tokens` as kwargs, others only accept (model, contents).
    # Try the richer call first and fall back to the minimal call on TypeError.
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            temperature=None,
            max_output_tokens=max_output_tokens,
        )
    except TypeError:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )
    # Call `generate_content` using introspection to only pass supported
    # keyword arguments. This avoids TypeError across different SDK versions.
    fn = client.models.generate_content
    try:
        sig = inspect.signature(fn)
        allowed_kwargs: Dict[str, Any] = {}
        if "model" in sig.parameters:
            allowed_kwargs["model"] = GEMINI_MODEL
        if "contents" in sig.parameters:
            allowed_kwargs["contents"] = prompt
        if "temperature" in sig.parameters:
            # keep temperature available for SDKs that support it
            allowed_kwargs["temperature"] = None
        if "max_output_tokens" in sig.parameters:
            allowed_kwargs["max_output_tokens"] = max_output_tokens

        if "model" in allowed_kwargs and "contents" in allowed_kwargs:
            response = fn(**allowed_kwargs)
        else:
            # Fall back to positional signature if keywords are not supported
            response = fn(GEMINI_MODEL, prompt)
    except Exception:
        # Last-resort fallback: try positional call, then keyword call.
        try:
            response = fn(GEMINI_MODEL, prompt)
        except TypeError:
            response = fn(model=GEMINI_MODEL, contents=prompt)

    text = getattr(response, "text", "") or ""
    raw = response.to_dict() if hasattr(response, "to_dict") else None
    return {"text": text.strip(), "model": GEMINI_MODEL, "raw": raw}


def _resolve_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    prompt = payload.get("prompt")
    if not prompt or not isinstance(prompt, str):
        raise ValueError("Missing prompt")

    # Keep reading `temperature` from payload for compatibility but currently
    # we don't forward it to the SDK call (SDK versions differ in support).
    _ = float(payload.get("temperature", 0.2))
    max_tokens = int(payload.get("maxOutputTokens", 512))
    return _run_generation(prompt, max_tokens)


def _json_response(body: Dict[str, Any], status: int = 200):
    if VercelResponse is None:  # pragma: no cover - CLI mode
        return body
    return VercelResponse(json.dumps(body), status=status, headers=BASE_HEADERS)


def handler(request: "VercelRequest") -> "VercelResponse":  # type: ignore[valid-type]
    if request.method == "OPTIONS":
        return _json_response({}, status=204)
    if request.method != "POST":
        return _json_response({"error": "Method not allowed"}, status=405)

    payload: Dict[str, Any] = {}
    try:
        if hasattr(request, "json"):
            payload_candidate = request.json  # Could be property or callable
            payload = payload_candidate() if callable(payload_candidate) else (payload_candidate or {})
        elif hasattr(request, "get_json"):
            payload = request.get_json() or {}
    except Exception:
        payload = {}

    if not payload:
        try:
            body_bytes = getattr(request, "body", None) or getattr(request, "data", None)
            payload = json.loads(body_bytes or "{}")
        except Exception:
            payload = {}

    try:
        result = _resolve_payload(payload)
        return _json_response(result)
    except ValueError as exc:
        return _json_response({"error": str(exc)}, status=400)
    except Exception as exc:  # pragma: no cover - upstream failures
        return _json_response({"error": str(exc)}, status=500)


def _run_cli() -> int:
    raw = sys.stdin.read()
    try:
        payload = json.loads(raw or "{}")
        result = _resolve_payload(payload)
        sys.stdout.write(json.dumps(result))
        return 0
    except Exception as exc:
        sys.stdout.write(json.dumps({"error": str(exc)}))
        return 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--cli", action="store_true", help="Run in CLI mode")
    args = parser.parse_args()
    sys.exit(_run_cli())
