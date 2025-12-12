#!/usr/bin/env python3
"""Simple test script to POST to /api/gemini and print the JSON response.

Usage:
  python3 scripts/test_api_gemini.py --url http://localhost:8080/api/gemini

Set `GOOGLE_API_KEY` or `GEMINI_API_KEY` in the environment before running.
"""

import argparse
import json
import os
import sys
from urllib.request import Request, urlopen


def post_json(url: str, payload: dict) -> dict:
    data = json.dumps(payload).encode("utf-8")
    req = Request(url, data=data, headers={"Content-Type": "application/json"})
    with urlopen(req, timeout=15) as resp:
        raw = resp.read()
        return json.loads(raw or b"{}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=os.environ.get("GEMINI_TEST_URL", "http://localhost:8080/api/gemini"))
    args = parser.parse_args()

    payload = {"prompt": "Hello from automated test", "maxOutputTokens": 64}
    print("Posting to:", args.url)
    try:
        result = post_json(args.url, payload)
        print(json.dumps(result, indent=2))
    except Exception as e:
        print("Request failed:", e, file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
