import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";
import type { Lesson } from "./lessons";

// Advanced track — same playable game format as the basic lessons
// (scenarios → results), but pitched at practitioners. Each one adds two
// things to the results screen: "Try these this week" (practical actions)
// and "Go deeper" (reliable external sources). Set at Square Drawing Co.

export const advancedLessons: Lesson[] = [
  // ── A1 · Prompt Caching ──────────────────────────────────────────────
  {
    slug: "prompt-caching",
    order: "A1",
    title: "Prompt Caching",
    tagline:
      "Reuse the same big context across many requests — pay for it once, not every time.",
    icon: "💾",
    level: "Advanced",
    durationMin: 5,
    topics: ["Reuse context", "Token cost", "Speed"],
    accent: ["#a855f7", "#6366f1"],
    introTagline: "A 5-minute game on paying for big context once, not every time",
    introParagraph:
      "Randall keeps pasting the same 40-page brand guide into every single client chat — and the bill keeps climbing. This lesson is about prompt caching: when you reuse the same big chunk of context over and over, you can store it so Claude doesn't re-read and re-charge for it each time. Put the stable stuff first, the changing question last.",
    learnList:
      "what prompt caching is, the stable-prefix rule, cache hits vs. misses, cache lifetime, and where it saves the most",
    scenarios: [
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="sm">📄📄📄</span><span class="note">same brand guide, every chat</span></div>
            <div class="row"><span class="chip bad">pay full price ×100</span></div>
            <span class="tag">Re-sending the same context</span>
          </div>`,
        story:
          "Randall pastes Square Drawing Co.'s 40-page brand guide at the top of every client chat. It never changes — but the bill for it shows up on every single message.",
        question: "What would fix the waste?",
        options: [
          { text: "Cache the unchanging brand guide so it's paid for once, not re-read every message", correct: true },
          { text: "Make the brand guide shorter so the waste looks cheaper", correct: false },
          { text: "Stop giving Claude any context at all", correct: false },
        ],
        concept: "Prompt caching",
        explanation:
          "Prompt caching stores a chunk of context you reuse, so Claude doesn't re-process (and re-bill) it every call. The big, stable brand guide gets cached once; each new message only pays for what's actually new.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip good">stable: instructions + docs</span><span class="note">↑ top · cached</span></div>
            <div class="row"><span class="chip info">changing: today's question</span><span class="note">↓ bottom</span></div>
            <span class="tag">Stable first · changing last</span>
          </div>`,
        story:
          "A teammate edits one word at the very top of the instructions between requests, then wonders why nothing got cheaper.",
        question: "Why did the cache stop helping?",
        options: [
          { text: "Caching matches a byte-identical prefix — changing the top busts it. Keep stable stuff up top, changing stuff at the bottom", correct: true },
          { text: "Caching only works on Tuesdays", correct: false },
          { text: "Once cached, a prompt can never be edited again", correct: false },
        ],
        concept: "The stable-prefix rule",
        explanation:
          "The cache matches on an identical opening chunk. Put instructions and reference docs at the top and freeze them; put the part that changes (the question, the specific file) at the bottom. Edit the top and you pay full price again.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-pulse">💾</span><span class="arrow">→</span><span class="chip good">cache hit · cheap+fast</span><span class="md fx-flick">⏳</span><span class="chip warn">expires if idle</span>
            <span class="tag">Use it again soon</span>
          </div>`,
        story:
          "Randall caches the brand guide at 9am, fires off 30 client chats in a burst, then goes to lunch for two hours and starts again.",
        question: "What should he expect?",
        options: [
          { text: "The burst of 30 gets cheap, fast cache hits; after a long idle gap the cache may expire and the next call rebuilds it", correct: true },
          { text: "The cache lasts forever no matter what", correct: false },
          { text: "Caching also makes the very first call cheaper", correct: false },
        ],
        concept: "Hits, misses & lifetime",
        explanation:
          "The first call writes the cache (costs a little more); every reuse within the window is a cheap, fast hit. Caches expire after a stretch of inactivity, so bursty, repeated work benefits most — a long gap means the next call rebuilds it.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="note">big stable context + many calls</span><span class="arrow">→</span><span class="chip good">huge savings</span></div>
            <div class="row"><span class="note">tiny one-off prompt</span><span class="arrow">→</span><span class="chip bad">nothing to cache</span></div>
            <span class="tag">Reuse is the whole point</span>
          </div>`,
        story:
          "Randall wants a rule for when caching is even worth setting up.",
        question: "When does prompt caching pay off most?",
        options: [
          { text: "When a large, unchanging context is reused across many requests", correct: true },
          { text: "When every prompt is short and totally different each time", correct: false },
          { text: "Only when you're using the biggest model", correct: false },
        ],
        concept: "Where caching wins",
        explanation:
          "Caching pays off when there's a big, stable chunk you send again and again — a long system prompt, a knowledge base, a tool-heavy agent loop. If every prompt is short and unique, there's nothing to reuse and caching won't help.",
      },
    ],
    glossary: [
      { term: "Prompt caching", meaning: "Storing a reused chunk of context so the model doesn't re-process and re-bill it on every call." },
      { term: "Cache hit", meaning: "A request that reuses already-cached context — cheaper and faster." },
      { term: "Cache write / miss", meaning: "The first call that builds the cache (costs a bit more); also what happens after the cache expires." },
      { term: "Stable prefix", meaning: "The unchanging opening of your prompt (instructions, reference docs) that gets cached. Keep changing content at the bottom." },
      { term: "Cache lifetime", meaning: "Caches expire after a period of inactivity, so reuse them in bursts." },
    ],
    actions: [
      "In Projects or the API, move your big reusable context — brand guide, SOPs, system prompt — into a stable block at the top and keep your actual question at the bottom.",
      "Group repeated work into bursts so you hit the cache while it's still warm, instead of one-off calls spread across the day.",
      "If you build on the API, switch on prompt caching for your system prompt and long documents and watch the input-token bill drop.",
    ],
    sources: [
      { label: "Anthropic Docs — Prompt caching", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-caching" },
      { label: "Anthropic — Prompt caching announcement (cost & latency numbers)", url: "https://www.anthropic.com/news/prompt-caching" },
    ],
  },

  // ── A2 · Batch Processing ────────────────────────────────────────────
  {
    slug: "batch-processing",
    order: "A2",
    title: "Batch Processing",
    tagline:
      "Send thousands of requests in one batch — about half the cost, processed while you sleep.",
    icon: "📦",
    level: "Advanced",
    durationMin: 5,
    topics: ["Bulk requests", "~50% off", "Async"],
    accent: ["#22d3ee", "#3b82f6"],
    introTagline: "A 5-minute game on sending requests in bulk — half the cost, while you sleep",
    introParagraph:
      "Randall has 5,000 client messages to sort, and firing them off one-by-one is slow and pricey. This lesson is about batch processing: instead of sending requests one at a time and waiting on each, you hand Claude a big batch all at once. It works through them in the background — usually within an hour, up to 24 — at roughly half the cost. Perfect for big, non-urgent jobs.",
    learnList:
      "what batch processing is, sending many requests at once, the ~50% discount, asynchronous results, and when to batch vs. answer live",
    scenarios: [
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip bad">one by one</span><span class="note">wait on each · full price</span></div>
            <div class="row"><span class="chip good">one batch</span><span class="note">send all at once · ~50% off</span></div>
            <span class="tag">Bulk &amp; non-urgent → batch</span>
          </div>`,
        story:
          "Randall needs to tag 5,000 old client messages by topic. He starts sending them to Claude one at a time, waiting for each reply before the next.",
        question: "What's the smarter way to run 5,000 simple, non-urgent requests?",
        options: [
          { text: "Send them as one batch — Claude processes the whole lot in the background, at roughly half the cost", correct: true },
          { text: "Keep sending one at a time and watch each reply live", correct: false },
          { text: "Give up and tag all 5,000 by hand", correct: false },
        ],
        concept: "Batch processing",
        explanation:
          "The Batch API lets you submit many requests in one go instead of one-at-a-time. Claude works through them asynchronously — you collect the results later — and it costs about 50% less. Ideal for large, non-urgent jobs.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-float">📦</span><span class="arrow">→</span><span class="md fx-pulse">⚙️</span><span class="arrow">→</span><span class="md fx-pop">📥</span>
            <span class="tag">Submit · come back later</span>
          </div>`,
        story:
          "Randall submits his batch and sits there expecting the answers to stream back instantly, like a normal chat.",
        question: "What should he actually expect?",
        options: [
          { text: "It's asynchronous — results come back later (usually under an hour, up to 24), not instantly. Submit it and check back", correct: true },
          { text: "Batch results always appear in under one second", correct: false },
          { text: "The batch will never finish unless he watches it", correct: false },
        ],
        concept: "Asynchronous by design",
        explanation:
          "Batches are processed in the background. Most finish well within an hour, and all within 24. You don't wait live — you submit the job, then poll or come back for the results. That delay is exactly why it's cheaper.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="note">client waiting in chat now</span><span class="arrow">→</span><span class="chip warn">answer live</span></div>
            <div class="row"><span class="note">5,000 tags by Friday</span><span class="arrow">→</span><span class="chip good">batch it</span></div>
            <span class="tag">Urgency decides</span>
          </div>`,
        story:
          "Randall has two jobs: reply to a client waiting in chat right now, and re-categorize a year of old briefs by Friday.",
        question: "Which job is the batch job?",
        options: [
          { text: "The year of old briefs — big, non-urgent, perfect for a discounted overnight batch. The waiting client gets a live answer", correct: true },
          { text: "The waiting client — make them wait 24 hours for a cheaper reply", correct: false },
          { text: "Both should always be batched, no matter how urgent", correct: false },
        ],
        concept: "Batch vs. live",
        explanation:
          "Reach for batching when the work is large and can wait: evaluations, bulk tagging, summarizing an archive, generating thousands of variations. Anything a person is waiting on right now should stay a live, real-time request.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip info">1 batch</span><span class="arrow">→</span><span class="sm">up to 10,000 requests</span></div>
            <div class="row"><span class="note">each request = its own full prompt</span></div>
            <span class="tag">Batches of requests, not loose tokens</span>
          </div>`,
        story:
          "Randall says he wants to 'send the tokens in a batch.' His teammate clarifies what's actually being batched.",
        question: "What does a batch actually contain?",
        options: [
          { text: "A list of complete requests — each its own full prompt, up to thousands at once — not a loose pile of tokens", correct: true },
          { text: "Just raw tokens with no prompts attached", correct: false },
          { text: "Exactly one request, same as a normal chat", correct: false },
        ],
        concept: "What's in a batch",
        explanation:
          "You don't batch loose 'tokens' — you batch whole requests. Each entry is a full prompt with its own context, and a single batch can hold thousands of them (up to 10,000). Claude runs through the list and returns a result for each.",
      },
      {
        animation: `
          <div class="scene">
            <span class="chip good">batch ~50% off</span><span class="arrow">+</span><span class="chip good">cache shared prompt</span><span class="arrow">→</span><span class="md fx-pop">💰</span>
            <span class="tag">Savings stack</span>
          </div>`,
        story:
          "Randall's 5,000 tagging requests all share the exact same long instructions at the top.",
        question: "How can he save even more?",
        options: [
          { text: "Combine batching with prompt caching — the shared instructions get cached while the whole job runs at the batch discount", correct: true },
          { text: "Pick one saving only; they cancel each other out", correct: false },
          { text: "Make the instructions longer to qualify for a bigger discount", correct: false },
        ],
        concept: "Stacking the savings",
        explanation:
          "Batching and caching solve different parts of the bill — batching discounts the whole job for being non-urgent, caching stops you re-paying for a repeated prefix. On bulk work that shares context, using both together compounds the savings. (Remember caching from A1.)",
      },
    ],
    glossary: [
      { term: "Batch processing (Batch API)", meaning: "Submitting many requests at once to be processed asynchronously, at a reduced cost." },
      { term: "Asynchronous", meaning: "You don't wait on the answer live — you submit the job and collect results later." },
      { term: "~50% discount", meaning: "Batched requests typically cost about half the standard price, in exchange for the delay." },
      { term: "Batch size", meaning: "A single batch can hold thousands of requests (up to 10,000), each a full prompt." },
      { term: "Batch vs. live", meaning: "Batch big, non-urgent jobs; keep anything a person is waiting on as a real-time request." },
    ],
    actions: [
      "List your recurring bulk jobs — tagging, summarizing an archive, grading test cases, generating variations — and move them to batch instead of live calls.",
      "For batch jobs, plan around the delay: submit before you leave, collect the results next session, instead of watching a progress bar.",
      "Stack batching with prompt caching when the requests share a long, identical prefix.",
    ],
    sources: [
      { label: "Anthropic Docs — Batch processing (Message Batches API)", url: "https://docs.claude.com/en/docs/build-with-claude/batch-processing" },
      { label: "Anthropic — Introducing the Message Batches API (50% off, up to 10k)", url: "https://www.anthropic.com/news/message-batches-api" },
    ],
  },

  // ── A3 · Live Artifacts ──────────────────────────────────────────────
  {
    slug: "live-artifacts",
    order: "A3",
    title: "Live Artifacts",
    tagline:
      "Turn answers into living, usable things — a working tool in a panel, not a wall of text.",
    icon: "🪄",
    level: "Advanced",
    durationMin: 4,
    topics: ["Interactive", "Build apps", "Share"],
    accent: ["#ec4899", "#a855f7"],
    introTagline: "A 4-minute game on turning answers into living, usable things",
    introParagraph:
      "Most AI replies are a wall of text you copy out and rebuild somewhere else. Artifacts change that: Claude produces a live, self-contained thing — a working calculator, a dashboard, a polished doc — in a panel next to the chat. You use it, tweak it by asking, and share it. The answer becomes the deliverable.",
    learnList:
      "what a live artifact is, generating interactive tools, iterating by conversation, AI-powered apps, and sharing & reusing them",
    scenarios: [
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip bad">wall of text</span><span class="arrow">→</span><span class="sm">📋 copy &amp; rebuild</span></div>
            <div class="row"><span class="chip good">live artifact</span><span class="arrow">→</span><span class="md fx-pop">🧮 use it now</span></div>
            <span class="tag">Answer becomes deliverable</span>
          </div>`,
        story:
          "Randall asks for a pricing tool and gets back three paragraphs describing one. He still has to go build the actual thing himself.",
        question: "What would an artifact give him instead?",
        options: [
          { text: "A live, working pricing tool in a panel he can use right away — not a description to rebuild", correct: true },
          { text: "An even longer description of the tool", correct: false },
          { text: "A promise to email it next week", correct: false },
        ],
        concept: "Live artifacts",
        explanation:
          "An artifact is a self-contained, working thing Claude builds beside the chat — a calculator, chart, doc, or mini-app. Instead of describing the deliverable, Claude produces it, ready to use.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-float">🧩</span><span class="arrow">→</span><span class="sm">"add a total, make it blue"</span><span class="arrow">→</span><span class="md fx-pop">✨</span>
            <span class="tag">Refine by just asking</span>
          </div>`,
        story:
          "The first version of the tool is close, but the layout's off and it's missing a total row.",
        question: "How do you fix it?",
        options: [
          { text: "Just ask in the chat — 'add a total row, tidy the layout' — and the artifact updates in place", correct: true },
          { text: "Start completely over from a blank prompt", correct: false },
          { text: "Edit raw code by hand or give up", correct: false },
        ],
        concept: "Iterate in place",
        explanation:
          "Artifacts update live as you refine them by conversation. You describe the change and watch it apply — rapid back-and-forth without rebuilding from scratch.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-pulse">🧩</span><span class="arrow">↔</span><span class="md fx-float">🧠</span><span class="arrow">→</span><span class="chip good">smart app</span>
            <span class="tag">An artifact that calls Claude</span>
          </div>`,
        story:
          "Randall wants a little 'brief grader' anyone on the team can paste a brief into and get instant feedback.",
        question: "What makes that possible inside an artifact?",
        options: [
          { text: "Artifacts can call Claude themselves — so the tool has real intelligence built in, not just static buttons", correct: true },
          { text: "Artifacts can only ever show fixed, hard-coded text", correct: false },
          { text: "He'd need to hire a developer and a server first", correct: false },
        ],
        concept: "AI-powered artifacts",
        explanation:
          "Artifacts can embed Claude's intelligence — the app itself can ask Claude to grade a brief, answer a question, or adapt to input. That turns a static tool into a genuinely smart one, no setup required.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="md fx-float">🧩</span><span class="arrow">→</span><span class="chip good">🔗 share link</span><span class="arrow">→</span><span class="sm">🧑‍🎨🧑‍💼🧑‍🔧</span></div>
            <span class="tag">Build once · whole team uses it</span>
          </div>`,
        story:
          "The brief grader works great. Randall wants the whole studio using it, not just him.",
        question: "What's the artifact advantage here?",
        options: [
          { text: "Share it with a link so the whole team uses the same tool — build once, reuse everywhere", correct: true },
          { text: "Re-explain how to rebuild it to each teammate", correct: false },
          { text: "Keep it locked in his own chat forever", correct: false },
        ],
        concept: "Share & reuse",
        explanation:
          "Artifacts can be shared and even published, so one good tool serves the whole team. Some can store data across sessions too — trackers, journals, collaborative tools — so they keep working over time.",
      },
    ],
    glossary: [
      { term: "Artifact", meaning: "A live, self-contained thing Claude builds beside the chat — a tool, chart, doc, or mini-app — that you use directly." },
      { term: "Iterate in place", meaning: "Refining an artifact by describing changes in the chat; it updates live." },
      { term: "AI-powered artifact", meaning: "An artifact that calls Claude itself, giving the tool real built-in intelligence." },
      { term: "Share & publish", meaning: "Handing an artifact to others via a link so the whole team reuses one tool." },
      { term: "Stateful artifact", meaning: "One that stores data across sessions — trackers, journals, collaborative tools." },
    ],
    actions: [
      "Next time you'd describe a tool, ask Claude to build it as an artifact instead — a quote calculator, a checklist, a small dashboard.",
      "Refine it by conversation ('add a total, match our brand') rather than rebuilding from scratch.",
      "When one works, share the link so the whole studio uses the same tool.",
    ],
    sources: [
      { label: "Claude Help — What are artifacts and how do I use them?", url: "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" },
      { label: "Anthropic — Build interactive, AI-powered apps with artifacts", url: "https://www.anthropic.com/news/build-artifacts" },
    ],
  },

  // ── A4 · Hooks ───────────────────────────────────────────────────────
  {
    slug: "hooks",
    order: "A4",
    title: "Hooks",
    tagline:
      "'When X happens, automatically do Y' — deterministic guardrails and chores that just happen.",
    icon: "🪝",
    level: "Advanced",
    durationMin: 4,
    topics: ["Event triggers", "Guardrails", "Automate"],
    accent: ["#6366f1", "#8b5cf6"],
    introTagline: "A 4-minute game on 'when X happens, automatically do Y'",
    introParagraph:
      "Reminding the AI to do the same thing every time is fragile — sooner or later it gets forgotten. Hooks make it automatic: they fire on events (a file gets edited, a task finishes, you're asked for input) and run a fixed action you defined. Deterministic guardrails and chores that just happen, every time, without being asked.",
    learnList:
      "what hooks are, event triggers, deterministic guardrails, automating chores, and where hooks beat reminders",
    scenarios: [
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip bad">"please remember to check"</span><span class="arrow">→</span><span class="sm">😬 sometimes</span></div>
            <div class="row"><span class="chip good">hook on finish</span><span class="arrow">→</span><span class="sm">✅ every time</span></div>
            <span class="tag">Automatic beats reminding</span>
          </div>`,
        story:
          "Randall keeps telling the AI 'always run the brand check before you finish' — and it works, until the one time it's forgotten and a bad file ships.",
        question: "What makes it reliable?",
        options: [
          { text: "A hook — it fires automatically on the event every time, instead of relying on a reminder that can be skipped", correct: true },
          { text: "Asking more politely in each prompt", correct: false },
          { text: "Accepting that it'll sometimes be skipped", correct: false },
        ],
        concept: "Hooks",
        explanation:
          "A hook is an action wired to an event: 'when this happens, run that.' Because it fires automatically and deterministically, it doesn't depend on the AI remembering — the chore or check just happens, every single time.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip info">before a tool runs</span></div>
            <div class="row"><span class="chip info">after a file edit</span></div>
            <div class="row"><span class="chip info">when the task ends</span></div>
            <span class="tag">Fire on lifecycle events</span>
          </div>`,
        story:
          "Randall wants different automatic actions at different moments — one before the AI acts, one after it edits a file, one when it wraps up.",
        question: "Can hooks do that?",
        options: [
          { text: "Yes — hooks fire on specific lifecycle events (before a tool runs, after an edit, when a session ends), each with its own action", correct: true },
          { text: "No, hooks only ever fire at random", correct: false },
          { text: "Hooks can only run once, ever", correct: false },
        ],
        concept: "Event triggers",
        explanation:
          "Hooks attach to points in the workflow — before a tool runs, after a file is edited, when you're asked for input, when a task ends. You pick the moment and the action, so the right thing happens at the right time.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-float">🤖</span><span class="arrow">→</span><span class="md fx-shake">🚫</span><span class="chip warn">protected files</span>
            <span class="tag">Block risky actions, automatically</span>
          </div>`,
        story:
          "Randall never wants the AI touching the live pricing file or the client master list — no exceptions.",
        question: "How do hooks help enforce that?",
        options: [
          { text: "A hook can block actions on protected files automatically — a deterministic guardrail, not a hopeful instruction", correct: true },
          { text: "Just trust it won't, and check manually afterward", correct: false },
          { text: "Delete the files so they can't be touched", correct: false },
        ],
        concept: "Deterministic guardrails",
        explanation:
          "Because hooks run code you control, they can hard-enforce rules — block edits to sensitive files, require a check to pass before continuing. That's deterministic control: the rule holds whether or not the model 'decides' to follow it.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="sm">edit done</span><span class="arrow">→</span><span class="chip good">auto-format</span><span class="chip good">log it</span><span class="chip good">notify me</span></div>
            <span class="tag">Chores that just happen</span>
          </div>`,
        story:
          "After every change, someone's supposed to tidy the formatting, log what happened, and ping Randall — but it's tedious and often skipped.",
        question: "What's the hook play?",
        options: [
          { text: "Wire those chores to fire automatically after each change — formatting, logging, a notification — so no one has to remember", correct: true },
          { text: "Add the chores to a checklist and hope", correct: false },
          { text: "Skip the chores to save effort", correct: false },
        ],
        concept: "Automating chores",
        explanation:
          "Hooks shine for the small, repetitive must-dos: auto-format after edits, log every action, notify you when the AI needs input. They run quietly every time, so the boring-but-important stuff never gets dropped.",
      },
    ],
    glossary: [
      { term: "Hook", meaning: "An action wired to an event — 'when X happens, automatically run Y.'" },
      { term: "Event trigger", meaning: "The moment a hook fires — before a tool runs, after an edit, when a task ends." },
      { term: "Deterministic control", meaning: "Hooks run code you control, so a rule holds regardless of what the model decides." },
      { term: "Guardrail hook", meaning: "A hook that blocks risky actions, e.g. editing protected files." },
      { term: "Chore automation", meaning: "Using hooks for repetitive must-dos — formatting, logging, notifications." },
    ],
    actions: [
      "List the 'always do this' reminders you repeat to Claude, and turn the most important one into a hook so it can't be skipped.",
      "Add a guardrail hook that blocks edits to your sensitive files (pricing, client lists).",
      "Wire a notification hook so you're pinged when the AI needs your input, instead of watching it.",
    ],
    sources: [
      { label: "Claude Code Docs — Get started with hooks", url: "https://docs.claude.com/en/docs/claude-code/hooks-guide" },
      { label: "Claude Code Docs — Hooks reference", url: "https://docs.claude.com/en/docs/claude-code/hooks" },
    ],
  },

  // ── A5 · Routines (Scheduled Agents) ─────────────────────────────────
  {
    slug: "routines",
    order: "A5",
    title: "Routines",
    tagline:
      "Work that runs itself on a schedule — the Monday report, the overnight cleanup, the morning triage.",
    icon: "⏰",
    level: "Advanced",
    durationMin: 4,
    topics: ["Scheduled", "Unattended", "Cadence"],
    accent: ["#fb923c", "#f43f5e"],
    introTagline: "A 4-minute game on work that runs itself on a schedule",
    introParagraph:
      "Some jobs should just happen on a cadence — the Monday report, the overnight cleanup, the morning triage — without anyone kicking them off. Routines are scheduled agents: you set the schedule and the instructions once, and they run on their own, even while you sleep, then hand you the result.",
    learnList:
      "what a routine is, scheduling work, running unattended, writing explicit autonomous prompts, and routines vs. live chat",
    scenarios: [
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip bad">remember every Monday</span><span class="arrow">→</span><span class="sm">😴 missed</span></div>
            <div class="row"><span class="chip good">routine · Mon 8am</span><span class="arrow">→</span><span class="sm">📊 ready</span></div>
            <span class="tag">Set the cadence once</span>
          </div>`,
        story:
          "Every Monday Randall is supposed to compile a weekend-orders summary. Half the time he forgets until Wednesday.",
        question: "What's the fix?",
        options: [
          { text: "A routine — a scheduled agent that runs every Monday morning on its own and has the summary waiting", correct: true },
          { text: "A sticky note reminding him to remember", correct: false },
          { text: "Doing it twice on the Mondays he does remember", correct: false },
        ],
        concept: "Routines (scheduled agents)",
        explanation:
          "A routine runs an agent on a schedule you set — daily, weekly, hourly. You define it once and the work happens on cadence without anyone starting it, so recurring jobs stop slipping.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-flick">💻</span><span class="sm">off</span><span class="arrow">→</span><span class="md fx-pulse">☁️🤖</span><span class="arrow">→</span><span class="md fx-pop">✅</span>
            <span class="tag">Runs even when you're offline</span>
          </div>`,
        story:
          "Randall wants the overnight cleanup to run at 2am — but his laptop is shut and he's asleep.",
        question: "Can a routine still run?",
        options: [
          { text: "Yes — routines can run on managed infrastructure, so they keep going even when your computer is off", correct: true },
          { text: "No, you must sit and watch every run live", correct: false },
          { text: "Only if he stays awake until 2am", correct: false },
        ],
        concept: "Unattended execution",
        explanation:
          "Routines run on their own schedule, and managed ones run on Anthropic's infrastructure — so they fire even when your machine is off. They can also be triggered by events like an API call or a GitHub change, not just the clock.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip bad">"do the thing"</span><span class="arrow">→</span><span class="sm">🤷 no one to ask</span></div>
            <div class="row"><span class="chip good">clear goal + what to do with the output</span></div>
            <span class="tag">It can't ask you mid-run</span>
          </div>`,
        story:
          "Randall writes a vague routine prompt — 'sort out the orders' — assuming he can clarify later. But it runs at 3am with no one around.",
        question: "Why does that fail?",
        options: [
          { text: "A routine runs autonomously and can't ask clarifying questions — the prompt must spell out the goal and what to do with the result", correct: true },
          { text: "Vague prompts work better when unattended", correct: false },
          { text: "It will pause and wait days for him to reply", correct: false },
        ],
        concept: "Explicit autonomous prompts",
        explanation:
          "Because a routine runs with no one to interrupt it, the instructions have to stand on their own: be explicit about what success looks like and what to do with the output (save it here, email it there). No room for 'I'll clarify later.'",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="note">predictable cadence</span><span class="arrow">→</span><span class="chip good">routine</span></div>
            <div class="row"><span class="note">one-off, needs your steering</span><span class="arrow">→</span><span class="chip warn">live chat</span></div>
            <span class="tag">Schedule the repeatable</span>
          </div>`,
        story:
          "Randall has two things: a report due like clockwork every week, and a messy one-off problem he needs to think through with the AI.",
        question: "Which one becomes a routine?",
        options: [
          { text: "The weekly report — predictable and repeatable. The messy one-off stays a live, interactive chat", correct: true },
          { text: "The messy one-off — automate the thing that needs the most steering", correct: false },
          { text: "Both should run unattended at 3am", correct: false },
        ],
        concept: "Routine vs. live",
        explanation:
          "Routines fit predictable, repeatable work on a cadence. Anything exploratory that needs your judgment and back-and-forth belongs in a live chat. Schedule the clockwork; stay hands-on for the thinking.",
      },
    ],
    glossary: [
      { term: "Routine", meaning: "A scheduled agent that runs on a cadence (or on an event trigger) without being started by hand." },
      { term: "Unattended execution", meaning: "Running on its own — managed routines keep going even when your computer is off." },
      { term: "Autonomous prompt", meaning: "Instructions explicit enough to run with no one to answer clarifying questions." },
      { term: "Event trigger", meaning: "A routine kicked off by an API call or a GitHub event, not just the clock." },
      { term: "Routine vs. live", meaning: "Schedule repeatable work; keep exploratory, judgment-heavy work in a live chat." },
    ],
    actions: [
      "Pick one clockwork task (weekly summary, morning triage) and set it up as a routine with /schedule or from the web/Desktop app.",
      "Write the routine's prompt to stand alone: state the goal and exactly what to do with the result.",
      "Have it queue output for your review rather than acting on clients or money unattended.",
    ],
    sources: [
      { label: "Claude Code Docs — Overview (run Claude on a schedule)", url: "https://docs.claude.com/en/docs/claude-code/overview" },
      { label: "Anthropic — Building agents with the Claude Agent SDK", url: "https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk" },
    ],
  },

  // ── A6 · The Agent Harness ───────────────────────────────────────────
  {
    slug: "agent-harness",
    order: "A6",
    title: "The Agent Harness",
    tagline:
      "The model is just the engine. The harness — tools, loop, checks — is what makes it reliable.",
    icon: "🦾",
    level: "Advanced",
    durationMin: 5,
    topics: ["Tools", "Loop", "Verification"],
    accent: ["#14b8a6", "#3b82f6"],
    introTagline: "A 5-minute game on what turns a chatbot into a reliable worker",
    introParagraph:
      "Claude on its own is a brilliant engine. But the difference between a clever one-off answer and a process you'd trust on client work is the harness around it — the tools it can use, the act-check-act loop, and the verification gates. Same model, wildly different reliability.",
    learnList:
      "what an agent harness is, giving Claude real tools, the act-observe loop, verification gates, and keeping a human in the loop",
    scenarios: [
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="md fx-pulse">🧠</span><span class="note">model = the engine</span></div>
            <div class="row"><span class="chip info">tools</span><span class="chip info">loop</span><span class="chip info">checks</span><span class="note">harness = the car</span></div>
            <span class="tag">Engine vs. harness</span>
          </div>`,
        story:
          "Two teams use the exact same Claude model. One gets flaky, one-off answers; the other gets reliable, finished work. The model isn't the difference.",
        question: "What is the difference?",
        options: [
          { text: "The harness — the tools, the act-check loop, and verification wrapped around the model", correct: true },
          { text: "One team simply has a secret better model", correct: false },
          { text: "Reliability is purely random and can't be improved", correct: false },
        ],
        concept: "The agent harness",
        explanation:
          "The model is the engine; the harness is everything around it — the tools it can call, the loop that lets it act and see results, and the checks that catch mistakes. Most real-world reliability comes from a good harness, not from swapping models.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-float">🧠</span><span class="arrow">→</span><span class="chip good">order system</span><span class="chip good">render tool</span><span class="arrow">→</span><span class="md fx-pop">🖼️</span>
            <span class="tag">Tools = ability to act</span>
          </div>`,
        story:
          "Claude can describe the perfect custom square in beautiful detail — but it can't actually produce the file the client needs.",
        question: "What unlocks finished deliverables?",
        options: [
          { text: "Give it the right tools — read the order system, call a rendering tool — so it can act, not just describe", correct: true },
          { text: "Ask it to describe the file in even more detail", correct: false },
          { text: "Accept that AI can only ever give advice", correct: false },
        ],
        concept: "Tools turn talk into action",
        explanation:
          "A harness connects Claude to tools it can actually use. With the order system and a rendering tool wired in, it moves from 'here's what I'd do' to producing the real artifact — and can see the result of each action.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-pulse">🤖</span><span class="arrow">→</span><span class="sm">act</span><span class="arrow">→</span><span class="sm">👀 observe</span><span class="arrow">↻</span>
            <span class="tag">Act · observe · adjust</span>
          </div>`,
        story:
          "A one-shot prompt asks Claude to do a five-step job blind, all in a single reply, with no chance to see how each step landed.",
        question: "What does a good harness add?",
        options: [
          { text: "An act-observe loop — take a step, see the result, adjust — instead of guessing the whole job in one blind shot", correct: true },
          { text: "More words in the original prompt and hope for the best", correct: false },
          { text: "Nothing; one giant prompt is always best", correct: false },
        ],
        concept: "The act-observe loop",
        explanation:
          "A harness lets Claude take a step, observe what actually happened, and decide the next move — like a person checking their work as they go. That loop is what makes multi-step jobs reliable instead of a hopeful single guess.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="md fx-float">📝</span><span class="arrow">→</span><span class="chip warn">reviewer check</span><span class="arrow">→</span><span class="chip good">human ok</span><span class="arrow">→</span><span class="sm">📤</span></div>
            <span class="tag">Verify before it ships</span>
          </div>`,
        story:
          "Occasionally a draft slips out with the wrong brand blue or a missed spec — straight to the client.",
        question: "What should the harness add before client-facing output?",
        options: [
          { text: "A verification gate (a reviewer pass against the brief) plus a human approval step before anything ships", correct: true },
          { text: "Ship faster with no checks to save time", correct: false },
          { text: "Give the AI full autonomy over client emails and money", correct: false },
        ],
        concept: "Verification & the human gate",
        explanation:
          "Good harnesses check work before it counts — a reviewer pass against the brand guide and brief catches mistakes inside the loop. And for anything client-facing or money-moving, keep a human approval gate. More autonomy needs more guardrails, not fewer.",
      },
    ],
    glossary: [
      { term: "Agent harness", meaning: "The scaffolding around the model — tools, loop, and checks — that makes it reliable." },
      { term: "Tool", meaning: "Something the agent can call to act (read the order system, render a file, search). Turns talk into action." },
      { term: "Act-observe loop", meaning: "Take a step, see the result, adjust — instead of guessing a whole job in one shot." },
      { term: "Verification gate", meaning: "An automatic check of the work before it advances, e.g. a reviewer pass against the brief." },
      { term: "Human in the loop", meaning: "A required human approval step on anything client-facing or money-moving." },
    ],
    actions: [
      "For one repeatable job, write down the steps and add a check between each — turn an ad-hoc prompt into a real pipeline.",
      "Connect the one tool that would let Claude finish the job instead of just describing it.",
      "Add a 'review against the brief' step and a human approval gate before any output reaches a client.",
    ],
    sources: [
      { label: "Anthropic — Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents" },
      { label: "Anthropic — Building agents with the Claude Agent SDK", url: "https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk" },
      { label: "Anthropic — Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
      { label: "Anthropic Docs — Tool use overview", url: "https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview" },
    ],
  },

  // ── A7 · Build a Second Brain ────────────────────────────────────────
  {
    slug: "second-brain",
    order: "A7",
    title: "Build a Second Brain",
    tagline:
      "An external, searchable memory — past projects, decisions, SOPs — so Claude never starts from zero.",
    icon: "🧠",
    level: "Advanced",
    durationMin: 4,
    topics: ["Memory", "Retrieval", "Consistency"],
    accent: ["#34d399", "#22d3ee"],
    introTagline: "A 4-minute game on giving Claude a memory that outlives the chat",
    introParagraph:
      "Every chat starts from zero and forgets everything when it ends. A second brain fixes that: an external, searchable memory — past projects, decisions, SOPs — that Claude can draw on. Instead of re-explaining the studio every time, you point it at the knowledge.",
    learnList:
      "what a second brain is, retrieval over re-explaining, consistency across the team, curating what goes in, and capturing as you go",
    scenarios: [
      {
        animation: `
          <div class="scene">
            <span class="md fx-float">💬</span><span class="arrow">→</span><span class="md fx-flick">🗑️</span><span class="arrow">vs</span><span class="md fx-pulse">🗄️</span>
            <span class="tag">Chat forgets · brain remembers</span>
          </div>`,
        story:
          "Randall explains Square Drawing Co.'s whole style and history in a chat, gets great work — then the chat ends and it's all gone. Next week he explains it all again.",
        question: "What ends the re-explaining?",
        options: [
          { text: "A second brain — an external, searchable store of the studio's knowledge Claude can pull from", correct: true },
          { text: "Typing faster when he re-explains it each time", correct: false },
          { text: "Hoping Claude memorizes it from one conversation forever", correct: false },
        ],
        concept: "A second brain",
        explanation:
          "A second brain is memory that lives outside any single chat — past briefs, decisions, SOPs — that Claude can search. Instead of re-explaining the business, you point it at the knowledge and it retrieves what's relevant.",
      },
      {
        animation: `
          <div class="scene">
            <span class="sm">"the Acme blue?"</span><span class="arrow">→</span><span class="md fx-pulse">🗄️</span><span class="arrow">→</span><span class="md fx-pop">🟦 #1e40af</span>
            <span class="tag">Pull the exact precedent</span>
          </div>`,
        story:
          "A client asks for 'that blue we used for Acme last spring,' and nobody can remember the exact spec.",
        question: "With a second brain, what happens?",
        options: [
          { text: "Claude retrieves the actual Acme color decision from past project records — no guessing", correct: true },
          { text: "Claude invents a blue that sounds about right", correct: false },
          { text: "Everyone digs through old emails by hand for an hour", correct: false },
        ],
        concept: "Retrieval over recall",
        explanation:
          "A second brain lets Claude look up the real precedent — the exact color, the past brief, the prior feedback — instead of relying on someone's memory or making something up. Institutional knowledge becomes one search away.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="sm">🧑‍🎨</span><span class="sm">🧑‍💼</span><span class="sm">🧑‍🔧</span><span class="arrow">→</span><span class="md fx-pulse">🗄️</span><span class="arrow">→</span><span class="chip good">same answer</span></div>
            <span class="tag">One source of truth</span>
          </div>`,
        story:
          "Two teammates ask Claude the same process question and get two different answers.",
        question: "How does a shared second brain help?",
        options: [
          { text: "Everyone's Claude answers from the same stored SOPs, so the team gives one consistent answer", correct: true },
          { text: "It guarantees nobody ever asks a question again", correct: false },
          { text: "It makes each person's answer more uniquely different", correct: false },
        ],
        concept: "Consistency from a shared brain",
        explanation:
          "When the playbooks and SOPs live in one shared brain, every teammate's Claude pulls from the same source of truth. The answer no longer depends on who happened to remember the detail.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip bad">stale + messy in</span><span class="arrow">→</span><span class="sm">😵 bad answers</span></div>
            <div class="row"><span class="chip good">curated + current in</span><span class="arrow">→</span><span class="sm">✅ good answers</span></div>
            <span class="tag">Curate what goes in</span>
          </div>`,
        story:
          "Randall dumps every old file, draft, and outdated price list into the brain in one big pile.",
        question: "What's the risk?",
        options: [
          { text: "Garbage in, garbage out — stale, messy content makes retrieval surface wrong answers confidently. Curate and keep it current", correct: true },
          { text: "More files always means better answers, no downside", correct: false },
          { text: "The brain automatically deletes anything outdated on its own", correct: false },
        ],
        concept: "Curate, don't dump",
        explanation:
          "A second brain is only as good as what's in it. Stale docs mislead confidently and a messy pile makes retrieval inaccurate. Curate what goes in, prune what's outdated, and capture new decisions as you go so it compounds in value.",
      },
    ],
    glossary: [
      { term: "Second brain", meaning: "An external, searchable memory of the team's knowledge that Claude can draw on across chats." },
      { term: "Retrieval", meaning: "Looking up the relevant stored info on demand instead of re-explaining or recalling from memory." },
      { term: "Source of truth", meaning: "One shared place the whole team's answers come from, so they stay consistent." },
      { term: "Garbage in, garbage out", meaning: "Stale or messy inputs produce confidently wrong outputs — curation matters." },
      { term: "Capture as you go", meaning: "Saving decisions and lessons back into the brain so it grows more valuable over time." },
    ],
    actions: [
      "Create one shared Project loaded with your real reference material — past briefs, style decisions, SOPs — and ask Claude questions against it.",
      "Prune one outdated doc this week so retrieval stops surfacing stale answers.",
      "End your next project by saving the key decisions back into the brain.",
    ],
    sources: [
      { label: "Anthropic — Contextual retrieval (making a knowledge base accurate)", url: "https://www.anthropic.com/news/contextual-retrieval" },
      { label: "Anthropic — Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
    ],
  },

  // ── A8 · Company OS ──────────────────────────────────────────────────
  {
    slug: "company-os",
    order: "A8",
    title: "Company OS",
    tagline:
      "The capstone: AI woven through how the studio runs — knowledge, pipelines, routines, connected tools.",
    icon: "🏢",
    level: "Advanced",
    durationMin: 5,
    topics: ["Automation", "Connectors", "Operations"],
    accent: ["#fbbf24", "#fb923c"],
    introTagline: "A 5-minute game on running the whole studio on a layer of AI",
    introParagraph:
      "The end state isn't one clever chat — it's a system. A shared second brain for knowledge, repeatable harnesses for the work, routines that run on their own, connected tools, and clear policies. The studio runs on AI the way it runs on email. Here's how the pieces fit.",
    learnList:
      "what a Company OS is, scheduled routines, shared context via connectors, composing it from the basics, and not automating a broken process",
    scenarios: [
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip info">second brain</span><span class="chip info">harness</span><span class="chip info">routines</span><span class="chip info">connectors</span></div>
            <span class="tag">Pieces → one operating layer</span>
          </div>`,
        story:
          "Randall has a great personal chat workflow, but the rest of the studio still operates the old way.",
        question: "What's the leap to a 'Company OS'?",
        options: [
          { text: "Wiring the pieces — shared knowledge, repeatable pipelines, routines, connected tools — into one layer the whole studio plugs into", correct: true },
          { text: "Everyone keeping their own private, separate chat tricks", correct: false },
          { text: "Using a single bigger model and nothing else", correct: false },
        ],
        concept: "Company OS",
        explanation:
          "A Company OS is AI as shared infrastructure, not a personal trick. Knowledge (second brain), work (harnesses), automation (routines), and tools (connectors) combine into one operating layer everyone uses — so improvements compound across the whole team.",
      },
      {
        animation: `
          <div class="scene">
            <span class="md fx-float">⏰</span><span class="arrow">→</span><span class="md fx-pulse">🤖</span><span class="arrow">→</span><span class="chip good">drafts ready</span><span class="arrow">→</span><span class="sm">👀 approve</span>
            <span class="tag">Runs on its own · you approve</span>
          </div>`,
        story:
          "Every morning Randall spends his first hour triaging overnight orders and drafting quotes by hand.",
        question: "What's the OS move?",
        options: [
          { text: "A routine reads new orders each morning, drafts quotes from the price sheet, and queues them for one-click approval", correct: true },
          { text: "Wake up earlier to do the same manual triage", correct: false },
          { text: "Let an agent send quotes to clients with no review at all", correct: false },
        ],
        concept: "Routines do the grunt work",
        explanation:
          "In a Company OS, routines run on a schedule without being prompted each time. The morning intake routine does the grunt work — read, draft from the second brain, queue — and Randall starts the day approving finished drafts, not building them. Money still passes a human.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip info">Slack</span><span class="chip info">Drive</span><span class="chip info">orders</span><span class="arrow">→</span><span class="md fx-pulse">🤖</span></div>
            <div class="row"><span class="note">every agent sees the same reality</span></div>
            <span class="tag">One shared context</span>
          </div>`,
        story:
          "The design, ops, and billing chats each know a different slice of the truth, and their answers don't line up.",
        question: "What fixes the mismatch?",
        options: [
          { text: "Connect the tools (Slack, Drive, the order system) so every team agent works from the same live context", correct: true },
          { text: "Keep each chat in its own silo and hope they agree", correct: false },
          { text: "Pick one team's version of the truth and ignore the rest", correct: false },
        ],
        concept: "Connected, shared context",
        explanation:
          "Connectors give every agent the same live view — the same Slack threads, files, and orders. Decisions line up across the studio because everyone's AI is looking at one reality instead of a private slice.",
      },
      {
        animation: `
          <div class="scene stack">
            <div class="row"><span class="chip bad">broken process</span><span class="arrow">→</span><span class="md fx-shake">🤖</span><span class="arrow">→</span><span class="sm">faster mess</span></div>
            <div class="row"><span class="chip good">fix first</span><span class="arrow">→</span><span class="chip good">then automate</span></div>
            <span class="tag">Don't scale a mess</span>
          </div>`,
        story:
          "Randall wants to automate his quoting process — but the process itself is inconsistent and a bit broken.",
        question: "What's the right order of operations?",
        options: [
          { text: "Fix the process first, then automate it — automating a broken process just produces a faster mess", correct: true },
          { text: "Automate it as-is; the AI will fix the process for you", correct: false },
          { text: "Never automate anything, ever", correct: false },
        ],
        concept: "Fix, then automate",
        explanation:
          "A Company OS is built from the basics in this academy — prompting, model choice, safety, a harness, a second brain — composed together, one reliable workflow at a time. But automate a broken process and you just scale the mess. Fix it first, keep humans on money and clients, and mind data safety as you connect more tools.",
      },
    ],
    glossary: [
      { term: "Company OS", meaning: "AI as shared infrastructure across the business — knowledge, pipelines, routines, and tools combined into one operating layer." },
      { term: "Routine (in the OS)", meaning: "A scheduled agent that runs on its own and queues work for human approval." },
      { term: "Connector", meaning: "A link to a tool (Slack, Drive, the order system) that gives agents shared, live context." },
      { term: "Compose from the basics", meaning: "The OS is built by combining the academy's lessons — prompting, models, safety, harness, second brain." },
      { term: "Fix, then automate", meaning: "Repair a broken process before scaling it, or you just produce a faster mess." },
    ],
    actions: [
      "Pick one recurring, low-risk task and set up a routine that drafts it for your approval.",
      "Connect one tool (Drive or Slack) so your agents share the same live context instead of a silo.",
      "Before automating any workflow, write it down and fix the broken steps — and revisit the Keep It Safe habits as you add connectors.",
    ],
    sources: [
      { label: "Anthropic — Model Context Protocol (connect tools & data)", url: "https://www.anthropic.com/news/model-context-protocol" },
      { label: "Model Context Protocol — official site", url: "https://modelcontextprotocol.io" },
      { label: "Anthropic — Building agents with the Claude Agent SDK (orchestrator & sub-agents)", url: "https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk" },
    ],
  },
];

export function getAdvancedLesson(slug: string): Lesson | undefined {
  return advancedLessons.find((t) => t.slug === slug);
}

// Re-export the shared types for convenience.
export type { Scenario, GlossaryEntry };
