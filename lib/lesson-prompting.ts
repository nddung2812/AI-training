import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

// Lesson 3 — How to Talk to Claude (prompting fundamentals)
export const promptingScenarios: Scenario[] = [
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">VAGUE</span><span class="md">🗣️</span><span class="note">"make something nice"</span><span class="arrow">→</span><span class="lg fx-shake">🤷</span></div>
        <div class="row"><span class="chip good">CLEAR</span><span class="md">🗣️</span><span class="note">"40-word IG blurb, friendly tone"</span><span class="arrow">→</span><span class="lg fx-pop">🎯</span></div>
        <span class="tag">Same Claude · the brief makes the difference</span>
      </div>`,
    story:
      "Randall tells a new contractor, 'Make me something nice for the campaign.' He gets back something generic and off-base, and grumbles that the AI 'just isn't smart.'",
    question: "Why did the result miss?",
    options: [
      {
        text: "The brief had no context, goal, or format — Claude can't read your mind",
        correct: true,
      },
      { text: "The contractor wasn't smart enough", correct: false },
      { text: "You need a secret command for good results", correct: false },
    ],
    concept: "Be specific",
    explanation:
      "A good prompt gives three things: context (who/what this is), the task, and the format you want. 'Make something nice' becomes 'Write a 40-word product blurb for our new blue square print, friendly tone, for Instagram.' Same model — night-and-day result.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-float">🧑‍💼</span>
        <span class="md">🗂️</span>
        <span class="arrow">→</span>
        <span class="lg fx-pulse">🤖</span>
        <span class="md fx-pop">✉️</span>
        <span class="tag">Give the background · then ask</span>
      </div>`,
    story:
      "Randall asks for 'an apology email to the client' — but never says who the client is, what went wrong, or what outcome he wants.",
    question: "What's the key missing ingredient?",
    options: [
      {
        text: "Context — who the client is, what happened, the result he wants",
        correct: true,
      },
      { text: "A bigger, more powerful model", correct: false },
      { text: "A plugin", correct: false },
    ],
    concept: "Context is everything",
    explanation:
      "Claude only knows what you tell it (plus its training). The more relevant background you give — who, what happened, the tone, the goal — the better the result. Brief it like a freelancer who just walked in cold.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-casc-1">📝</span><span class="md fx-casc-2">📝</span><span class="md fx-casc-3">📝</span>
        <span class="arrow">→</span>
        <span class="lg fx-pulse">🤖</span>
        <span class="arrow">→</span>
        <span class="md fx-pop">✨📝</span>
        <span class="tag">Show 3 examples · get 10 in that style</span>
      </div>`,
    story:
      "Randall wants product names in a very particular style. Instead of describing it, he pastes three names he already loves and says 'ten more like these.'",
    question: "What technique is he using?",
    options: [
      { text: "Giving examples — show, don't just tell", correct: true },
      { text: "A skill", correct: false },
      { text: "An MCP server", correct: false },
    ],
    concept: "Examples beat adjectives",
    explanation:
      "Rather than describing a style in vague words ('make it punchy and modern'), show 2–3 examples of what 'good' looks like. Claude matches a demonstrated pattern far more reliably than a fuzzy adjective. This is called few-shot prompting.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="note">"give it as a table"</span><span class="arrow">→</span><span class="lg fx-pop">📊</span></div>
        <div class="row"><span class="note">(no format asked)</span><span class="arrow">→</span><span class="md">📜</span><span class="chip bad">wall of text</span></div>
        <span class="tag">Name the format you want</span>
      </div>`,
    story:
      "Randall needed a 3-column comparison but got back six paragraphs of prose he now has to reformat himself.",
    question: "How does he avoid the rework next time?",
    options: [
      {
        text: "Tell Claude the exact format up front — 'as a 3-column table'",
        correct: true,
      },
      { text: "Ask the same thing again, louder", correct: false },
      { text: "Switch to Code mode", correct: false },
    ],
    concept: "Ask for the format",
    explanation:
      "If you need a table, a bulleted list, JSON, or 'under 100 words,' say so. Left unspecified, Claude defaults to prose. Naming the output format up front saves a whole round-trip.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">📝</span><span class="arrow">→</span><span class="md fx-float-d">✂️📝</span><span class="arrow">→</span><span class="lg fx-pop">⭐</span>
        <span class="tag">Draft → steer → polish · it's a conversation</span>
      </div>`,
    story:
      "The first draft is solid but too formal and a bit long.",
    question: "What's the best next move?",
    options: [
      {
        text: "Steer it — 'warmer and 30% shorter, keep the second paragraph'",
        correct: true,
      },
      { text: "Start a brand-new chat from scratch", correct: false },
      { text: "Accept it as-is — it's good enough", correct: false },
    ],
    concept: "It's a conversation, not a slot machine",
    explanation:
      "Don't accept the first draft or start over — refine. 'Shorter.' 'More casual.' 'Redo just the opening.' 'Give me three options.' Each turn builds on the last, and that back-and-forth is where the best results come from.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-pulse">🎭</span><span class="arrow">→</span><span class="lg fx-float">🤖</span><span class="md fx-pop">🖋️</span>
        <span class="tag">"You're a veteran brand copywriter…"</span>
      </div>`,
    story:
      "Randall opens his request with 'You're a veteran brand copywriter at a design studio,' then asks for the tagline.",
    question: "Why does that opening help?",
    options: [
      {
        text: "Setting a role focuses Claude's tone, vocabulary, and judgment",
        correct: true,
      },
      { text: "It unlocks hidden features", correct: false },
      { text: "It makes Claude respond faster", correct: false },
    ],
    concept: "Give it a role",
    explanation:
      "Telling Claude who to be — 'act as our finance analyst,' 'you're a friendly support agent' — primes the right tone, depth, and vocabulary for the job. It's a cheap, powerful nudge that costs you one sentence.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-shake">🌀</span><span class="arrow">→</span><span class="row"><span class="chip info">1</span><span class="chip info">2</span><span class="chip info">3</span></span><span class="arrow">→</span><span class="md fx-pop">✅</span>
        <span class="tag">Big messy ask → clear steps</span>
      </div>`,
    story:
      "Randall fires off one giant run-on paragraph: research competitors AND draft a deck AND write the email AND make a budget — all at once. The output is a muddle.",
    question: "Better approach for a big, multi-part job?",
    options: [
      {
        text: "Break it into clear steps, or ask Claude to plan first, then execute",
        correct: true,
      },
      { text: "Cram even more detail into the one sentence", correct: false },
      { text: "Send the same paragraph five times", correct: false },
    ],
    concept: "One clear ask at a time",
    explanation:
      "For complex jobs, number the steps or say 'first outline a plan, then we'll do it together.' Clear structure in → clear structure out. You can also invite Claude to ask clarifying questions before it starts.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip info">summarize</span><span class="chip info">rewrite</span><span class="chip info">brainstorm</span></div>
        <div class="row"><span class="chip info">extract</span><span class="chip info">draft</span><span class="chip info">compare</span></div>
        <span class="tag">Six patterns cover most daily work</span>
      </div>`,
    story:
      "Randall wants a reusable cheat-sheet of go-to requests so the team isn't reinventing prompts every day.",
    question: "Which set captures the everyday prompt patterns?",
    options: [
      {
        text: "Summarize · Rewrite · Brainstorm · Extract · Draft · Compare",
        correct: true,
      },
      { text: "Compile · Deploy · Commit · Merge", correct: false },
      { text: "Install · Uninstall · Restart · Update", correct: false },
    ],
    concept: "Keep a pattern cheat-sheet",
    explanation:
      "Most work is one of a few moves: summarize a doc, rewrite in a new tone, brainstorm options, extract key facts, draft from rough notes, or compare choices. Learn these six and you can handle the bulk of daily tasks — and save your best prompts to reuse.",
  },
];

export const promptingGlossary: GlossaryEntry[] = [
  { term: "Context", meaning: "The background you give Claude — who, what, why, and the goal. More relevant context = better results." },
  { term: "Few-shot examples", meaning: "Showing 2–3 examples of what 'good' looks like instead of describing it in words." },
  { term: "Format spec", meaning: "Telling Claude the exact output shape you want: a table, a list, JSON, a word limit." },
  { term: "Role / persona", meaning: "Telling Claude who to act as ('a veteran copywriter') to prime the right tone and depth." },
  { term: "Iteration", meaning: "Refining through conversation — 'shorter,' 'warmer,' 'redo the intro' — instead of accepting the first draft." },
  { term: "Prompt pattern", meaning: "A reusable request type: summarize, rewrite, brainstorm, extract, draft, compare." },
];
