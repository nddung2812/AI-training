// Hands-on Labs — the deep, practice-first version of an Advanced topic.
// A Lab is: a short "learn" (minimal concept), then a sequence of INTERACTIVE
// exercises you actually do (order, spot, categorize, calculate), then a recap
// that reuses the matching advanced lesson's actions/sources/glossary.
//
// Exercises are a small set of reusable, data-driven primitives so new labs are
// mostly content, not new components.

// ── Exercise primitives ──────────────────────────────────────────────────

/** Drag/▲▼ a list into a valid order. Validity = no "volatile" block sits
 *  above a "stable" one (i.e. the cacheable prefix stays intact). */
export type OrderBlock = {
  id: string;
  label: string;
  sub?: string;
  tag: "stable" | "volatile";
};
export type OrderExercise = {
  kind: "order";
  id: string;
  title: string;
  prompt: string;
  /** Blocks in their initial (deliberately wrong) order */
  blocks: OrderBlock[];
  hint?: string;
  explanation: string;
};

/** Click the line(s) that match a condition (e.g. the cache-buster). */
export type SpotLine = { id: string; text: string; culprit: boolean };
export type SpotExercise = {
  kind: "spot";
  id: string;
  title: string;
  prompt: string;
  lines: SpotLine[];
  hint?: string;
  explanation: string;
};

/** Assign each item to its correct bucket. */
export type CatBucket = { id: string; label: string };
export type CatItem = { id: string; label: string; bucket: string };
export type CategorizeExercise = {
  kind: "categorize";
  id: string;
  title: string;
  prompt: string;
  buckets: CatBucket[];
  items: CatItem[];
  hint?: string;
  explanation: string;
};

/** Live calculator — reach a target savings % by adjusting the inputs.
 *  Teaches that caching is a volume play. */
export type CalcExercise = {
  kind: "calc";
  id: string;
  title: string;
  prompt: string;
  targetSavingsPct: number;
  defaults: { contextTokens: number; calls: number };
  hint?: string;
  explanation: string;
};

export type LabExercise =
  | OrderExercise
  | SpotExercise
  | CategorizeExercise
  | CalcExercise;

export type KeyIdea = { term: string; point: string };

export type Lab = {
  /** Matches the advanced lesson slug, so the recap can reuse its content */
  slug: string;
  title: string;
  icon: string;
  accent: [string, string];
  /** One line: what you'll actually DO in this lab */
  whatYouDo: string;
  /** 3–4 quick concept cards — kept short on purpose */
  keyIdeas: KeyIdea[];
  exercises: LabExercise[];
};

// ── Lab catalogue ────────────────────────────────────────────────────────

export const labs: Lab[] = [
  {
    slug: "prompt-caching",
    title: "Prompt Caching",
    icon: "💾",
    accent: ["#a855f7", "#6366f1"],
    whatYouDo:
      "Order a real prompt for a stable cache, hunt down the cache-buster, decide what's worth caching, then dial in the savings yourself — no slides, just reps.",
    keyIdeas: [
      {
        term: "Stable prefix",
        point:
          "The cache matches the unchanging opening of your prompt. Instructions and docs up top; the changing question at the bottom.",
      },
      {
        term: "Write once, read cheap",
        point:
          "The first call writes the cache (a touch more); every reuse is a cheap, fast hit at ~10% of the price.",
      },
      {
        term: "Reuse is the whole point",
        point:
          "Savings scale with how many calls share the same prefix. Big context + many calls = the biggest win.",
      },
      {
        term: "Identical or nothing",
        point:
          "Change one character in the cached prefix and it misses — you pay full price again.",
      },
    ],
    exercises: [
      {
        kind: "order",
        id: "pc-order",
        title: "Order the prompt for a stable cache",
        prompt:
          "Arrange these blocks so the cacheable part stays intact. Everything that never changes belongs above anything that changes call-to-call.",
        blocks: [
          { id: "q", label: "This client's specific question", sub: "different every call", tag: "volatile" },
          { id: "role", label: "System role & studio instructions", sub: "never changes", tag: "stable" },
          { id: "date", label: "Today's date / order ID", sub: "different every call", tag: "volatile" },
          { id: "brand", label: "Brand guide (40 pages)", sub: "never changes", tag: "stable" },
          { id: "fmt", label: "Output format rules + examples", sub: "never changes", tag: "stable" },
        ],
        hint: "Order among the stable blocks doesn't matter — what matters is that nothing volatile sneaks above them.",
        explanation:
          "A cache key is the literal opening bytes of your prompt. Stack every stable block first so the whole top is reusable, and push the parts that change (the question, the date, the order ID) to the very bottom. The cacheable prefix is everything up to the first thing that varies.",
      },
      {
        kind: "spot",
        id: "pc-spot",
        title: "Find the cache-buster",
        prompt:
          "This prompt was meant to cache, but it misses on every single call. Click the one line that's breaking it.",
        lines: [
          { id: "l1", text: "You are Square Drawing Co.'s brand assistant.", culprit: false },
          { id: "l2", text: "Current time: 2026-05-30 14:22:08.391", culprit: true },
          { id: "l3", text: "Brand voice: warm, precise, never salesy.", culprit: false },
          { id: "l4", text: "[Brand guide — 40 pages of standards…]", culprit: false },
          { id: "l5", text: "Few-shot examples of great replies…", culprit: false },
        ],
        hint: "Which of these is different on the very next call — and is sitting up in the part you wanted to reuse?",
        explanation:
          "The timestamp changes every call, and it's sitting inside the prefix you wanted to cache. One changing character in the prefix = a guaranteed miss. Per-call details like timestamps, IDs, and the user's question belong below everything stable — or left out entirely if you don't need them.",
      },
      {
        kind: "categorize",
        id: "pc-cat",
        title: "Cache it, or keep it out?",
        prompt:
          "Sort each piece of context. Cache the big, stable stuff; keep the per-call stuff out of the prefix so it can't bust the cache.",
        buckets: [
          { id: "cache", label: "✓ Cache it (stable prefix)" },
          { id: "skip", label: "✗ Keep out (changes per call)" },
        ],
        items: [
          { id: "i1", label: "The 40-page brand guide", bucket: "cache" },
          { id: "i2", label: "Studio tone & style rules", bucket: "cache" },
          { id: "i3", label: "Few-shot examples of great replies", bucket: "cache" },
          { id: "i4", label: "This customer's new question", bucket: "skip" },
          { id: "i5", label: "Live order status, pulled this second", bucket: "skip" },
          { id: "i6", label: "The current timestamp", bucket: "skip" },
        ],
        hint: "Ask of each one: will this be byte-for-byte identical on the next call?",
        explanation:
          "Anything identical across calls belongs in the cached prefix — that's where the savings live. Anything that changes per call (the question, live data, timestamps) stays out of the prefix so it never forces a rewrite.",
      },
      {
        kind: "calc",
        id: "pc-calc",
        title: "Dial in the savings",
        prompt:
          "You're caching a stable prefix. Move the sliders until caching saves at least 85%. Watch which slider actually moves the percentage — and which one just moves the money.",
        targetSavingsPct: 85,
        defaults: { contextTokens: 8000, calls: 5 },
        hint: "Try pushing the number of calls up while the context stays put. Then try the reverse.",
        explanation:
          "Caching is a volume play. The percentage you save tracks how many calls reuse the prefix — context size barely touches the %, it just scales how many real tokens that % is worth. With only a handful of calls the write-once overhead barely pays off; reuse the same prefix dozens of times and the cheap reads (a tenth of the price) take over, pushing you toward ~90% off the input bill.",
      },
    ],
  },
];

export function getLab(slug: string): Lab | undefined {
  return labs.find((l) => l.slug === slug);
}

export function hasLab(slug: string): boolean {
  return labs.some((l) => l.slug === slug);
}
