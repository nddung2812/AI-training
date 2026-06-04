// Hands-on Labs — the deep, practice-first version of an Advanced topic.
// A Lab is: a short "learn" (minimal concept), then a sequence of INTERACTIVE
// exercises you actually do (order, spot, categorize, calculate), then a recap
// that reuses the matching advanced lesson's actions/sources/glossary.
//
// Exercises are a small set of reusable, data-driven primitives so new labs are
// mostly content, not new components.

import type { Source } from "./lessons";

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
  /** Matches an advanced lesson slug when one exists, so the recap can reuse
   *  its content. Expert-only labs (no matching playbook) carry their own
   *  tagline/topics/actions/sources below. */
  slug: string;
  title: string;
  icon: string;
  accent: [string, string];
  /** Short hook for the Expert card (falls back to the advanced lesson's) */
  tagline?: string;
  /** Pills for the Expert card (falls back to the advanced lesson's) */
  topics?: string[];
  /** One line: what you'll actually DO in this lab */
  whatYouDo: string;
  /** 3–4 quick concept cards — kept short on purpose */
  keyIdeas: KeyIdea[];
  exercises: LabExercise[];
  /** Recap extras for Expert-only labs (fall back to the advanced lesson's) */
  actions?: string[];
  sources?: Source[];
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
  {
    slug: "agent-loop",
    title: "The Agent Loop",
    icon: "🔁",
    accent: ["#22d3ee", "#3b82f6"],
    tagline:
      "Why a reliable agent takes a step, checks the result, and adjusts — instead of guessing a whole job in one shot.",
    topics: ["The loop", "Act & observe", "Verify"],
    whatYouDo:
      "Walk the loop yourself: sort the moves into gather / act / verify, catch the run that shipped without checking, decide when a job needs the loop at all, and react to the result that should change the plan.",
    keyIdeas: [
      {
        term: "Gather → act → verify → repeat",
        point:
          "An agent runs a cycle: pull the context it needs, take one action, check what happened, then go again. That cycle is the whole trick.",
      },
      {
        term: "Observe before the next step",
        point:
          "Every action returns a result. The agent reads it and decides the next move from reality, not from a guess made up front.",
      },
      {
        term: "Verify is a step, not an afterthought",
        point:
          "Checking the work against the goal lives inside the loop — that's what catches a mistake before it ships.",
      },
      {
        term: "One shot is a hope",
        point:
          "A five-step job answered blind in a single reply can't see its own errors. The loop is what makes multi-step work reliable.",
      },
    ],
    exercises: [
      {
        kind: "categorize",
        id: "al-phase",
        title: "Which part of the loop is this?",
        prompt:
          "Every move an agent makes is gathering context, taking an action, or verifying. Sort each one.",
        buckets: [
          { id: "gather", label: "🔍 Gather context" },
          { id: "act", label: "⚙️ Take an action" },
          { id: "verify", label: "✅ Verify" },
        ],
        items: [
          { id: "p1", label: "Read the order #4471 spec file", bucket: "gather" },
          { id: "p2", label: "Render the square to a draft", bucket: "act" },
          { id: "p3", label: "Compare the draft against the brief", bucket: "verify" },
          { id: "p4", label: "Look up the brand blue hex in the guide", bucket: "gather" },
          { id: "p5", label: "Email the approved proof to the client", bucket: "act" },
          { id: "p6", label: "Re-check every spec line was met", bucket: "verify" },
        ],
        hint: "Reading or looking something up = gather. Doing something that changes the world = act. Checking the result against the goal = verify.",
        explanation:
          "The loop only has three kinds of move. Gathering pulls in what the agent needs to decide. Acting changes something — renders a file, sends a mail. Verifying holds the result up against the goal. A good harness keeps cycling through all three; skip verifying and mistakes sail straight through.",
      },
      {
        kind: "spot",
        id: "al-skip",
        title: "Find where it skipped a step",
        prompt:
          "This run shipped a flawed proof. Click the single step where the agent acted on the outside world without first checking its work.",
        lines: [
          { id: "s1", text: "Read order #4471 spec.", culprit: false },
          { id: "s2", text: "Pulled the brand blue from the guide.", culprit: false },
          { id: "s3", text: "Rendered the square to a draft.", culprit: false },
          { id: "s4", text: "Emailed the draft straight to the client. (no check against the brief)", culprit: true },
          { id: "s5", text: "Logged 'done'.", culprit: false },
        ],
        hint: "Which line pushes something out to a client with no verify step in front of it?",
        explanation:
          "The agent went render → email with no verification in between, so an off-brief draft reached the client. Verifying isn't optional polish — it's the loop step that sits between acting and shipping. Anything outward-facing should never be the step right after a blind action.",
      },
      {
        kind: "categorize",
        id: "al-need",
        title: "One shot, or run the loop?",
        prompt:
          "Some jobs are a single clean answer. Others need the agent to act, look, and adjust. Sort them.",
        buckets: [
          { id: "shot", label: "💬 Fine as one shot" },
          { id: "loop", label: "🔁 Needs the loop" },
        ],
        items: [
          { id: "n1", label: "What's 7 × 7?", bucket: "shot" },
          { id: "n2", label: "Re-render 200 orders in the new blue, fixing any that fail", bucket: "loop" },
          { id: "n3", label: "Define 'orchestrator' in one sentence", bucket: "shot" },
          { id: "n4", label: "Debug why the render pipeline crashes on some files", bucket: "loop" },
          { id: "n5", label: "Translate this tagline into French", bucket: "shot" },
          { id: "n6", label: "Migrate the whole catalog, checking each item", bucket: "loop" },
        ],
        hint: "If you can't know the answer is right without trying something and seeing what happens, it needs the loop.",
        explanation:
          "A single fact or a clean transform is fine in one shot — there's nothing to observe. But anything that spans multiple steps, can partly fail, or depends on results you can't predict needs the act-observe loop. Reaching for the loop on a one-shot task is wasted motion; skipping it on a multi-step job is how things break.",
      },
      {
        kind: "spot",
        id: "al-react",
        title: "Spot the result that changes the plan",
        prompt:
          "The agent just got back four tool results. Click the one it must react to before doing anything else.",
        lines: [
          { id: "r1", text: "Read spec ✓", culprit: false },
          { id: "r2", text: "Fetched brand guide ✓", culprit: false },
          { id: "r3", text: "Render failed: required font 'StudioSans' is missing.", culprit: true },
          { id: "r4", text: "Saved draft path /orders/4471/draft.png ✓", culprit: false },
        ],
        hint: "Three results say 'all good.' One says 'stop — something's broken.'",
        explanation:
          "Observing means actually reading the results, not just collecting them. The failed render is a signal to change course — fix the missing font before proceeding — not a line to skim past. An agent that doesn't react to what its tools report is running blind, even with the loop technically in place.",
      },
    ],
    actions: [
      "Take one multi-step task you do by hand and rewrite it as gather → act → verify, with a check after each action.",
      "Next time an agent gives a flaky one-shot answer, ask it to work one step at a time and show its result at each step.",
      "Add an explicit 'check it against the brief' step before anything you'd actually send to a client.",
    ],
    sources: [
      { label: "Anthropic — Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents" },
      { label: "Anthropic — Building agents with the Claude Agent SDK", url: "https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk" },
      { label: "ReAct: Synergizing Reasoning and Acting in Language Models", url: "https://arxiv.org/abs/2210.03629" },
    ],
  },
  {
    slug: "sub-agents",
    title: "Sub-agents & Isolation",
    icon: "🧩",
    accent: ["#10b981", "#22d3ee"],
    tagline:
      "Why one lead agent that delegates to focused specialists beats a single agent trying to hold everything.",
    topics: ["Orchestrator", "Specialists", "Isolation"],
    whatYouDo:
      "Run the studio like an orchestrator: route each subtask to the right specialist, decide what crosses the isolation boundary, catch the sub-agent that dumped instead of summarized, and judge when a job is worth splitting up.",
    keyIdeas: [
      {
        term: "Orchestrator + workers",
        point:
          "A lead agent breaks a big job into pieces and hands each to a specialist built for it — then assembles the results.",
      },
      {
        term: "Each works in isolation",
        point:
          "A sub-agent gets its own context window, so it can dig deep without cluttering the lead agent or the others.",
      },
      {
        term: "Return a summary, not the haystack",
        point:
          "A sub-agent might read tens of thousands of tokens, but it reports back a tight 1–2 paragraph answer — the finding, not the search.",
      },
      {
        term: "Specialists beat a generalist",
        point:
          "A focused agent with the right tools and a clean context outperforms one agent juggling research, doing, and checking all at once.",
      },
    ],
    exercises: [
      {
        kind: "categorize",
        id: "sa-route",
        title: "Route each subtask to a specialist",
        prompt:
          "The lead agent is splitting a big custom order across three sub-agents. Send each subtask to the right one.",
        buckets: [
          { id: "research", label: "🔎 Research agent" },
          { id: "render", label: "🖼️ Render agent" },
          { id: "qa", label: "🧪 QA agent" },
        ],
        items: [
          { id: "r1", label: "Find 3 reference squares in the archive", bucket: "research" },
          { id: "r2", label: "Produce the final PNG at four sizes", bucket: "render" },
          { id: "r3", label: "Check the output matches the brief", bucket: "qa" },
          { id: "r4", label: "Pull this client's past preferences", bucket: "research" },
          { id: "r5", label: "Re-export with the corrected blue", bucket: "render" },
          { id: "r6", label: "Flag anything off-brand before it ships", bucket: "qa" },
        ],
        hint: "Finding/looking up → research. Producing the artifact → render. Checking quality → QA.",
        explanation:
          "Orchestrator-workers means the lead agent doesn't do the work itself — it delegates to specialists. Each one has a narrow job, the right tools, and its own clean context, so it does that job better than a single agent trying to research, render, and review all at once.",
      },
      {
        kind: "categorize",
        id: "sa-boundary",
        title: "What crosses back to the lead?",
        prompt:
          "The research agent explored a lot. Decide what it sends back to the lead agent versus what stays inside its own context.",
        buckets: [
          { id: "back", label: "📤 Send back to the lead" },
          { id: "stays", label: "🗄️ Stays inside the sub-agent" },
        ],
        items: [
          { id: "b1", label: "\"Use reference #3 — it matches the brief (2 lines why).\"", bucket: "back" },
          { id: "b2", label: "The 40 archive files it opened while searching", bucket: "stays" },
          { id: "b3", label: "The final chosen reference + one-line reason", bucket: "back" },
          { id: "b4", label: "Every dead-end search it tried", bucket: "stays" },
          { id: "b5", label: "\"Done — 4 sizes exported, all pass.\"", bucket: "back" },
          { id: "b6", label: "The raw 12,000-token render log", bucket: "stays" },
        ],
        hint: "The lead only needs the answer and why. The messy exploration that produced it should stay behind.",
        explanation:
          "Isolation is the point: a sub-agent can burn tens of thousands of tokens exploring, but only a tight summary crosses back. If it dumped everything it read into the lead agent's context, you'd lose the whole benefit — the lead would drown in detail and slow down. Return the conclusion, keep the haystack.",
      },
      {
        kind: "spot",
        id: "sa-dump",
        title: "Catch the sub-agent that over-shared",
        prompt:
          "Three sub-agents just reported to the lead. Click the one that broke the rule and dumped its raw work instead of a summary.",
        lines: [
          { id: "d1", text: "Research agent → \"Ref #3 matches; here's why (3 lines).\"", culprit: false },
          { id: "d2", text: "Render agent → \"Exported 4 sizes, all pass.\"", culprit: false },
          { id: "d3", text: "QA agent → [pasted all 14,000 lines of its raw check log]", culprit: true },
          { id: "d4", text: "Lead agent → assembles the three reports.", culprit: false },
        ],
        hint: "Two reports are a sentence or two. One is a firehose.",
        explanation:
          "The QA agent returned its entire raw log instead of a verdict, flooding the lead agent's context — exactly what isolation is meant to prevent. The fix is a disciplined hand-off: 'pass/fail, and here's the one issue.' A sub-agent's value is that it digests the detail so no one else has to.",
      },
      {
        kind: "categorize",
        id: "sa-split",
        title: "One agent, or split into specialists?",
        prompt:
          "Splitting into sub-agents adds power but also overhead. Sort each job by whether it's worth it.",
        buckets: [
          { id: "one", label: "🙂 Fine for one agent" },
          { id: "split", label: "🧩 Split into specialists" },
        ],
        items: [
          { id: "x1", label: "Answer one quick question about an order", bucket: "one" },
          { id: "x2", label: "Audit 500 past orders for off-brand colors", bucket: "split" },
          { id: "x3", label: "Draft a single quote", bucket: "one" },
          { id: "x4", label: "Research + render + QA a whole new catalog", bucket: "split" },
          { id: "x5", label: "Rename one file", bucket: "one" },
          { id: "x6", label: "Migrate the archive while checking each item", bucket: "split" },
        ],
        hint: "Small and single-step → one agent. Big, multi-part, or parallel → split it up.",
        explanation:
          "Sub-agents shine when a job is large, has distinct parts, or benefits from parallel specialists. For a quick single-step task, spinning up an orchestrator and workers is pure overhead — one agent is faster and simpler. Match the structure to the size of the job.",
      },
    ],
    actions: [
      "Take a big task and split it: name 2–3 specialist roles (research, do, check) instead of one mega-prompt.",
      "When you delegate, ask for a short summary back — the answer and why — not the whole transcript.",
      "Notice when one chat is juggling too much at once; that's the signal to break it into focused sub-tasks.",
    ],
    sources: [
      { label: "Anthropic — Building agents with the Claude Agent SDK (sub-agents)", url: "https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk" },
      { label: "Anthropic — Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
      { label: "Anthropic — Building effective agents (orchestrator-workers)", url: "https://www.anthropic.com/engineering/building-effective-agents" },
    ],
  },
  {
    slug: "workflows-vs-agents",
    title: "Workflows vs Agents",
    icon: "⚙️",
    accent: ["#f59e0b", "#fb923c"],
    tagline:
      "Predefined path or dynamic agent? Pick the right pattern — and know when NOT to hand over the wheel.",
    topics: ["Workflows", "Agents", "5 patterns"],
    whatYouDo:
      "Make the architecture call: sort jobs into fixed workflows vs open-ended agents, match each to one of the classic patterns, catch the over-engineered design, and find the one step that actually needs judgment.",
    keyIdeas: [
      {
        term: "Workflow = a path you set",
        point:
          "LLM steps wired together in code you control. Same route every time — predictable, testable, cheap.",
      },
      {
        term: "Agent = directs itself",
        point:
          "The model decides its own steps and which tools to use. Flexible for open-ended work, but less predictable.",
      },
      {
        term: "Simplest thing that works",
        point:
          "Don't hand the wheel to a full agent when a fixed path does the job. More autonomy is more to go wrong.",
      },
      {
        term: "Know the patterns",
        point:
          "Routing, parallelization, orchestrator-workers, evaluator-optimizer — most real systems are one of these, not magic.",
      },
    ],
    exercises: [
      {
        kind: "categorize",
        id: "wa-which",
        title: "Workflow or agent?",
        prompt:
          "For each job, decide whether a fixed workflow (same steps every time) or a self-directing agent fits better.",
        buckets: [
          { id: "workflow", label: "🛤️ Fixed workflow" },
          { id: "agent", label: "🤖 Dynamic agent" },
        ],
        items: [
          { id: "w1", label: "Every order: validate → render → email proof, same steps", bucket: "workflow" },
          { id: "w2", label: "Investigate why some renders fail and fix them", bucket: "agent" },
          { id: "w3", label: "Translate each incoming review into English", bucket: "workflow" },
          { id: "w4", label: "Plan and run a one-off catalog migration", bucket: "agent" },
          { id: "w5", label: "Tag each ticket by topic, then route it", bucket: "workflow" },
          { id: "w6", label: "\"Improve our quoting however you can\"", bucket: "agent" },
        ],
        hint: "If you can write the exact steps in advance, it's a workflow. If the steps depend on what's found along the way, it's an agent.",
        explanation:
          "A workflow runs LLM calls through a path you defined in code — predictable and easy to trust. An agent decides its own steps as it goes — the right call only when the path genuinely can't be known up front. Most production work is workflows; reach for an agent when the task is open-ended.",
      },
      {
        kind: "categorize",
        id: "wa-pattern",
        title: "Match the pattern",
        prompt:
          "These are the classic ways to wire LLM work together. Match each setup to its pattern.",
        buckets: [
          { id: "routing", label: "🔀 Routing" },
          { id: "parallel", label: "🧵 Parallelization" },
          { id: "orchestrator", label: "🎯 Orchestrator-workers" },
          { id: "evaluator", label: "🔁 Evaluator-optimizer" },
        ],
        items: [
          { id: "m1", label: "Billing questions go to the billing prompt, design Qs to the design prompt", bucket: "routing" },
          { id: "m2", label: "Render all 200 squares at once, then collect the results", bucket: "parallel" },
          { id: "m3", label: "A lead splits a custom job across specialists and merges their work", bucket: "orchestrator" },
          { id: "m4", label: "Draft → a reviewer scores it against the brief → revise → repeat", bucket: "evaluator" },
          { id: "m5", label: "Classify each support email, then send it down the matching track", bucket: "routing" },
          { id: "m6", label: "One agent writes, another keeps critiquing until it passes", bucket: "evaluator" },
        ],
        hint: "Routing = send to the right place. Parallel = many at once. Orchestrator = split & merge. Evaluator = draft-and-critique loop.",
        explanation:
          "Naming the pattern keeps designs simple. Routing classifies then sends down a track. Parallelization fans the same work out at once. Orchestrator-workers splits a job across specialists and recombines. Evaluator-optimizer loops a maker against a checker until the output passes. Reach for the simplest pattern that fits.",
      },
      {
        kind: "spot",
        id: "wa-over",
        title: "Spot the over-engineering",
        prompt:
          "One of these reaches for a full autonomous agent where a simple fixed path would be safer and cheaper. Click it.",
        lines: [
          { id: "o1", text: "Quick FAQ reply → a fixed prompt template.", culprit: false },
          { id: "o2", text: "Same 3-step proof pipeline every order → wired as a workflow.", culprit: false },
          { id: "o3", text: "Stamp today's date on a file → a self-directing agent with 12 tools and web access.", culprit: true },
          { id: "o4", text: "Open-ended catalog migration → an agent.", culprit: false },
        ],
        hint: "Which task is trivial and fixed, yet got handed the most powerful, least predictable tool?",
        explanation:
          "Stamping a date is a one-line, fully predictable job — handing it an autonomous agent adds cost, latency, and ways to fail, for zero benefit. The principle is the simplest thing that works: use a fixed path for fixed jobs, and save agents for work whose steps truly can't be scripted.",
      },
      {
        kind: "spot",
        id: "wa-judgment",
        title: "Find the step that needs judgment",
        prompt:
          "This quoting pipeline is mostly fixed steps. Click the one step that genuinely needs an agent's judgment — leave the rest as plain workflow.",
        lines: [
          { id: "j1", text: "1. Validate the order is in the right format.", culprit: false },
          { id: "j2", text: "2. Look up each item's price from the price sheet.", culprit: false },
          { id: "j3", text: "3. Handle a weird non-standard custom request that isn't on the sheet.", culprit: true },
          { id: "j4", text: "4. Email the finished quote to the client (after approval).", culprit: false },
        ],
        hint: "Three steps follow exact rules. One has no rule to follow — it needs reasoning.",
        explanation:
          "Workflows and agents compose: keep the predictable steps as fixed code and drop an agent in only at the step that needs reasoning — here, pricing a one-off custom request with no sheet entry. You get the reliability of a workflow everywhere it counts and the flexibility of an agent exactly where you need it, not across the whole pipeline.",
      },
    ],
    actions: [
      "For one repeatable job, wire a fixed workflow (the same steps every time) instead of trusting an open-ended agent.",
      "Before reaching for a full agent, ask: would a simple predefined path do this more reliably?",
      "Find the one uncertain step in a process and let an agent handle just that — keep the rest fixed.",
    ],
    sources: [
      { label: "Anthropic — Building effective agents (workflows, agents & the 5 patterns)", url: "https://www.anthropic.com/engineering/building-effective-agents" },
      { label: "Anthropic — Building agents with the Claude Agent SDK", url: "https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk" },
    ],
  },

  // ── Dynamic Workflows (Claude Code) ──────────────────────────────────
  // Built from Thariq Shihipar & Sid Bidasaria's article "A harness for every
  // task: dynamic workflows in Claude Code" (claude.com/blog). The feature:
  // Claude writes its own multi-agent harness on the fly. Sibling to
  // "workflows-vs-agents" (the concept); this one is grounded in the article's
  // real examples and its library of named patterns.
  {
    slug: "dynamic-workflows",
    title: "Dynamic Workflows",
    icon: "🧩",
    accent: ["#14b8a6", "#0ea5e9"],
    tagline:
      "Claude writes its own harness on the fly — fanning a task across hundreds of subagents, having them refute each other, and handing back only what survives.",
    topics: ["6 patterns", "Subagents at scale", "Adversarial verify"],
    whatYouDo:
      "Decide which jobs earn a workflow, match real tasks to the pattern that fits, catch the step that would stall a run mid-flight, and tell a genuine fit from token-burning overkill.",
    keyIdeas: [
      {
        term: "Claude writes the harness",
        point:
          "A dynamic workflow is a script Claude writes on the fly, custom-built for the task — fanning work across tens to hundreds of subagents in the background, with only the final answer returned to you.",
      },
      {
        term: "A library of patterns",
        point:
          "Most workflows are one of a few shapes: classify-and-route, fan-out-and-synthesize, adversarial verify, generate-and-filter, tournament, and loop-until-done. Name the shape and the design stays simple.",
      },
      {
        term: "Other agents try to refute",
        point:
          "The trust comes from verification: a finding isn't reported until a separate agent tries to refute it, and only survivors reach you. That's the guard against laziness, bias, and goal drift.",
      },
      {
        term: "More compute — only when earned",
        point:
          "A workflow spends far more tokens than a normal chat. Worth it for high-value, multi-angle, massively parallel work — not a routine task that doesn't need a panel of five reviewers.",
      },
    ],
    exercises: [
      {
        kind: "categorize",
        id: "dw-when",
        title: "Earns a workflow, or just code it?",
        prompt:
          "A workflow pays off on high-value, multi-angle, or massively parallel work — and wastes tokens on routine jobs. Sort each task.",
        buckets: [
          { id: "workflow", label: "🧩 Worth a workflow" },
          { id: "regular", label: "💬 Just do it normally" },
        ],
        items: [
          { id: "dw1", label: "Reproduce a flaky test — form competing theories, don't stop till one survives", bucket: "workflow" },
          { id: "dw2", label: "Rename the User model to Account across thousands of callsites", bucket: "workflow" },
          { id: "dw3", label: "“Why did sales drop in March?” — investigate from several angles, cross-checked", bucket: "workflow" },
          { id: "dw4", label: "Add a null check to the function you're already editing", bucket: "regular" },
          { id: "dw5", label: "Write one unit test for the function on screen", bucket: "regular" },
          { id: "dw6", label: "Bump a dependency and re-run the build", bucket: "regular" },
        ],
        hint: "Would the work genuinely benefit from many agents, independent review, or several angles? Or is it a few steps your current context already handles?",
        explanation:
          "Workflows shine where extra compute buys something: a flaky race worth attacking from competing theories, a migration spanning thousands of callsites, an open question worth several cross-checked angles — even non-coding ones like a sales dip. A null check, a single test, a version bump don't need a panel of five reviewers; spinning up agents just burns tokens and time.",
      },
      {
        kind: "categorize",
        id: "dw-pattern",
        title: "Match the task to its pattern",
        prompt:
          "Real workflows from the article. Match each to the pattern it's built on.",
        buckets: [
          { id: "route", label: "🔀 Classify & route" },
          { id: "fanout", label: "🧵 Fan-out & synthesize" },
          { id: "adversarial", label: "🥊 Adversarial verify" },
          { id: "tournament", label: "🏆 Tournament" },
        ],
        items: [
          { id: "p1", label: "Tag each support ticket by type, then send it down the matching track", bucket: "route" },
          { id: "p2", label: "Tear apart the business plan from investor, customer & competitor angles, then synthesize", bucket: "fanout" },
          { id: "p3", label: "After each bug is found, a second agent tries to refute it — only survivors reach you", bucket: "adversarial" },
          { id: "p4", label: "Brainstorm CLI names, then have agents compete head-to-head until the top 3 emerge", bucket: "tournament" },
          { id: "p5", label: "Rank 80 resumes by comparing them pairwise until a winning order settles", bucket: "tournament" },
          { id: "p6", label: "Verify every technical claim in the blog draft — one agent finds claims, others confirm each", bucket: "adversarial" },
        ],
        hint: "Send-to-the-right-place vs. split-then-merge vs. make-then-refute vs. compete-until-a-winner.",
        explanation:
          "Classify-and-route sorts an item then sends it down a track. Fan-out-and-synthesize splits a job across agents and merges at a barrier (the business plan's three personas). Adversarial verify pairs every maker agent with a refuter, so bug-hunts and fact-checks report only what survives. Tournament has agents compete — pairwise judging is more reliable than absolute scores, which is why it fits both naming and resume ranking.",
      },
      {
        kind: "spot",
        id: "dw-stall",
        title: "Find the step that stalls the run",
        prompt:
          "This is the User→Account rename workflow. It runs start-to-finish in the background and can't stop to ask you anything mid-flight. Click the one step that assumes it can.",
        lines: [
          { id: "s1", text: "Fan out a subagent per callsite, each editing in its own git worktree.", culprit: false },
          { id: "s2", text: "Pause and ask the developer to approve each rename before continuing.", culprit: true },
          { id: "s3", text: "A second agent adversarially reviews every edit before it's merged.", culprit: false },
          { id: "s4", text: "Merge the verified worktrees back and report what changed.", culprit: false },
        ],
        hint: "Only an agent's own permission prompt can pause a run. Which step waits on a human decision in the middle?",
        explanation:
          "A workflow takes no mid-run user input — only an agent's permission prompt can pause it. Gather any rubric or sign-off up front (interview first, then run), or split the stages into separate workflows. The rest is textbook migration: isolate each fix in a worktree, fan out, have a refuter review before merge — exactly how the article describes renaming a model across a codebase.",
      },
      {
        kind: "categorize",
        id: "dw-fit",
        title: "Real fit, or token-burning overkill?",
        prompt:
          "The feature is powerful but expensive. Sort each use into a genuine fit or overkill — drawing on the article's own guidance.",
        buckets: [
          { id: "fit", label: "✅ Genuine fit" },
          { id: "overkill", label: "🚫 Overkill" },
        ],
        items: [
          { id: "f1", label: "Mine 6 months of #incidents for recurring root causes nobody filed a ticket for", bucket: "fit" },
          { id: "f2", label: "Go through my last 50 sessions, find corrections I keep making, turn them into CLAUDE.md rules", bucket: "fit" },
          { id: "f3", label: "Research a question across the web and cross-check every source before answering", bucket: "fit" },
          { id: "f4", label: "Reformat a single file with the linter", bucket: "overkill" },
          { id: "f5", label: "Run a panel of five reviewers on a one-line typo fix", bucket: "overkill" },
          { id: "f6", label: "Answer a quick factual question already in your context", bucket: "overkill" },
        ],
        hint: "Does the task gain from scale, independent review, or many angles — enough to justify spending far more tokens? Or is it small, certain, and already in reach?",
        explanation:
          "Good fits are high-value and benefit from distribution: mining incidents or past sessions for patterns, or research that must cross-check sources. The article is blunt that most traditional coding tasks don't need this — a reformat, a typo fix, or a question already answered in context just spend a lot more tokens for nothing. Gauge a big run on a small slice first.",
      },
    ],
    actions: [
      "Pick a flaky test and run a workflow that forms competing theories and won't stop until one survives the evidence.",
      "Point a workflow at your last 50 sessions to mine the corrections you keep making, and turn the recurring ones into CLAUDE.md rules.",
      "Run an adversarial-review workflow on one real assumption or plan — investor, customer, and competitor agents tearing it apart, then synthesized.",
      "Before publishing your next post, have a workflow verify every technical claim against the codebase; gauge a big run on one slice first.",
    ],
    sources: [
      { label: "Thariq Shihipar & Sid Bidasaria — A harness for every task: dynamic workflows in Claude Code", url: "https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code" },
      { label: "Claude Code docs — Orchestrate subagents at scale with dynamic workflows", url: "https://code.claude.com/docs/en/workflows" },
      { label: "Anthropic — Building effective agents (the underlying patterns)", url: "https://www.anthropic.com/engineering/building-effective-agents" },
    ],
  },
];

export function getLab(slug: string): Lab | undefined {
  return labs.find((l) => l.slug === slug);
}

export function hasLab(slug: string): boolean {
  return labs.some((l) => l.slug === slug);
}
