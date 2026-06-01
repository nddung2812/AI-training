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
  {
    slug: "agent-harness",
    title: "The Agent Harness",
    icon: "🦾",
    accent: ["#14b8a6", "#3b82f6"],
    whatYouDo:
      "Build the real machinery that turns the model into a reliable worker: sort who runs each tool, stack the context window so it doesn't rot, hunt the thing clogging it, and set the guardrails — hands on, no slides.",
    keyIdeas: [
      {
        term: "It runs a loop",
        point:
          "A harness repeats a cycle — gather context, take an action, check the result — instead of guessing a whole job in one shot. The loop is where reliability comes from.",
      },
      {
        term: "Tools are the interface",
        point:
          "The model asks to use a tool; the harness runs it and hands back the result. Some tools run in your app, some on Anthropic's servers.",
      },
      {
        term: "Context is finite",
        point:
          "Stuff too much in and recall rots. Keep durable stuff up top, fetch big things only when needed, and summarize old turns.",
      },
      {
        term: "Guardrails are deterministic",
        point:
          "Safe actions auto-run; risky or irreversible ones hit a gate your code enforces — not the model's judgement — and wait for a human.",
      },
    ],
    exercises: [
      {
        kind: "categorize",
        id: "ah-tools",
        title: "Who actually runs each tool?",
        prompt:
          "When Claude asks to use a tool, something has to execute it. Sort each one by where it runs.",
        buckets: [
          { id: "client", label: "🖥️ Runs in your app (client tool)" },
          { id: "server", label: "☁️ Runs on Anthropic's servers (server tool)" },
        ],
        items: [
          { id: "t1", label: "Your 'render a square' function", bucket: "client" },
          { id: "t2", label: "Reading the studio's order database", bucket: "client" },
          { id: "t3", label: "Web search", bucket: "server" },
          { id: "t4", label: "Running code in a sandbox (code execution)", bucket: "server" },
          { id: "t5", label: "Sending mail through your mailer", bucket: "client" },
          { id: "t6", label: "Fetching a public web page (web fetch)", bucket: "server" },
        ],
        hint: "Anything that touches YOUR systems or private data has to run in your code. Anthropic-hosted tools like web search run on their side.",
        explanation:
          "The loop is the same either way: the model emits a tool-use request, something executes it, and a result goes back. Client tools (your render function, your database, your mailer) run in your code because only you can reach those systems — you build them. Server tools (web search, code execution, web fetch) run on Anthropic's infrastructure and just hand back the result. Knowing which is which tells you what you have to build versus what you get for free.",
      },
      {
        kind: "order",
        id: "ah-context",
        title: "Stack the context window",
        prompt:
          "A harness assembles a fresh context window each turn. Order it so the durable parts stay on top and the per-turn parts sit at the bottom — nothing that changes every turn should sit above something that never changes.",
        blocks: [
          { id: "c1", label: "The customer's latest message", sub: "new every turn", tag: "volatile" },
          { id: "c2", label: "System role & studio operating rules", sub: "never changes", tag: "stable" },
          { id: "c3", label: "Tool definitions", sub: "never changes", tag: "stable" },
          { id: "c4", label: "Brand guide (retrieved reference)", sub: "stable for this job", tag: "stable" },
          { id: "c5", label: "The conversation so far", sub: "grows each turn", tag: "volatile" },
        ],
        hint: "Durable first: role, tools, reference docs. Then the moving parts: the running conversation and the newest message.",
        explanation:
          "Put the durable layers first — who the agent is, what tools it has, the reference docs it needs — then the volatile turn-by-turn parts. A stable top reads cleaner for the model AND can be cached, while the parts that move stay at the bottom where they belong. It's the same lesson as prompt caching, one layer up.",
      },
      {
        kind: "spot",
        id: "ah-rot",
        title: "Find what's rotting the context",
        prompt:
          "This agent has gotten slow and forgetful. One line is stuffing the context window with raw data it doesn't need loaded. Click it.",
        lines: [
          { id: "r1", text: "Task: re-render order #4471 in the new brand blue.", culprit: false },
          { id: "r2", text: "Brand blue = #1E3A8A (brand guide §4).", culprit: false },
          { id: "r3", text: "[Full 14,000-line render log from every past order pasted inline]", culprit: true },
          { id: "r4", text: "File path: /orders/4471/spec.json — load if needed.", culprit: false },
          { id: "r5", text: "Last status: awaiting re-render.", culprit: false },
        ],
        hint: "More tokens isn't more knowledge. Which line dumps a mountain of raw data the agent could fetch on demand instead?",
        explanation:
          "Context is a finite resource — as it fills with tokens, recall actually gets worse ('context rot'). Pasting a 14,000-line log inline buries the few facts that matter. The fix is just-in-time retrieval: keep a lightweight pointer (the file path on line 4) and let the agent load the detail only if it needs it. Store identifiers, not haystacks.",
      },
      {
        kind: "categorize",
        id: "ah-guard",
        title: "Set the guardrails",
        prompt:
          "You're wiring the harness's permission rules. Sort each action into auto-allow or stop-for-approval.",
        buckets: [
          { id: "allow", label: "✓ Auto-allow (safe, reversible)" },
          { id: "gate", label: "🛑 Require approval (risky / irreversible)" },
        ],
        items: [
          { id: "g1", label: "Read an order file", bucket: "allow" },
          { id: "g2", label: "Render a draft to a scratch folder", bucket: "allow" },
          { id: "g3", label: "Email the client the final proof", bucket: "gate" },
          { id: "g4", label: "Issue a refund", bucket: "gate" },
          { id: "g5", label: "Search the web", bucket: "allow" },
          { id: "g6", label: "Delete rows from the live orders table", bucket: "gate" },
        ],
        hint: "Reads and scratch work are safe to auto-allow. Anything touching money, clients, or live data should stop for a human.",
        explanation:
          "Guardrails in a harness are deterministic and enforced by your code, not left to the model's judgement. An allow-list auto-approves safe, reversible actions (reads, scratch renders, web search) so the agent keeps moving. Anything irreversible or outward-facing — money, client emails, live-data deletes — hits a gate: a check that pauses for human approval before it runs. More autonomy earns more guardrails, not fewer.",
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
