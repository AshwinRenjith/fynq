// Lightweight client-side RAG retriever using TF-IDF
// - Fetches a Markdown knowledge file from `/knowledge.md`
// - Splits into passages by paragraph
// - Builds TF-IDF vectors in-memory
// - Exposes `query(text, k)` to return top-k passages

type Passage = {
  id: number;
  text: string;
  tfidf?: Map<string, number>;
};

let passages: Passage[] | null = null;
let idf: Map<string, number> | null = null;

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildIndex(docs: string[]) {
  const docsTokens = docs.map((d) => normalize(d));
  const vocab = new Map<string, number>();

  // build idf
  const df = new Map<string, number>();
  docsTokens.forEach((tokens) => {
    const seen = new Set<string>();
    tokens.forEach((t) => {
      if (!seen.has(t)) {
        seen.add(t);
        df.set(t, (df.get(t) || 0) + 1);
      }
    });
  });

  const N = docsTokens.length;
  idf = new Map();
  df.forEach((count, term) => {
    idf!.set(term, Math.log((N + 1) / (count + 1)) + 1);
  });

  // compute tf-idf for each doc
  passages = docs.map((text, i) => {
    const tokens = docsTokens[i];
    const tf = new Map<string, number>();
    tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    // normalize tf
    const maxTf = Math.max(...Array.from(tf.values()), 1);
    const tfidf = new Map<string, number>();
    tf.forEach((count, term) => {
      const v = (count / maxTf) * (idf!.get(term) || 0);
      tfidf.set(term, v);
    });

    return { id: i, text, tfidf } as Passage;
  });
}

function dot(a: Map<string, number>, b: Map<string, number>) {
  let s = 0;
  for (const [k, v] of a) {
    const bv = b.get(k);
    if (bv) s += v * bv;
  }
  return s;
}

function norm(a: Map<string, number>) {
  let s = 0;
  for (const v of a.values()) s += v * v;
  return Math.sqrt(s) || 1;
}

export async function loadKnowledge(url = "/knowledge.md") {
  if (passages) return passages;
  const res = await fetch(url);
  const md = await res.text();
  // split by two or more newlines into paragraphs
  const parts = md
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 30); // ignore tiny lines

  buildIndex(parts);
  return passages!;
}

export async function query(text: string, k = 3) {
  await loadKnowledge();
  if (!passages || !idf) return [];

  const qTokens = normalize(text);
  const qtf = new Map<string, number>();
  qTokens.forEach((t) => qtf.set(t, (qtf.get(t) || 0) + 1));
  const maxTf = Math.max(...Array.from(qtf.values()), 1);
  const qTfidf = new Map<string, number>();
  qtf.forEach((count, term) => {
    qTfidf.set(term, (count / maxTf) * (idf!.get(term) || 0));
  });

  const scores = passages.map((p) => {
    const s = dot(p.tfidf!, qTfidf) / (norm(p.tfidf!) * norm(qTfidf));
    return { p, s };
  });

  scores.sort((a, b) => b.s - a.s);
  return scores.slice(0, k).map((x) => ({ text: x.p.text, score: x.s }));
}

export function clearIndex() {
  passages = null;
  idf = null;
}
