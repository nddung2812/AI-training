import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

// Lesson 4 — Context & Memory (managing Claude's working memory)
export const contextScenarios: Scenario[] = [
  {
    animation: `
      <div class="scene">
        <span class="lg fx-pulse">🧠</span>
        <span class="arrow">←</span>
        <span class="md fx-float">📄📄📄</span>
        <span class="note">holds only so much at once</span>
        <span class="tag">The context window = working memory</span>
      </div>`,
    story:
      "Randall's desk only fits so many papers at once. Pile on too many and the ones he actually needs get buried or fall off the edge.",
    question: "In AI terms, that desk is…",
    options: [
      {
        text: "The context window — Claude's limited working memory",
        correct: true,
      },
      { text: "The hard drive", correct: false },
      { text: "A plugin", correct: false },
    ],
    concept: "The context window",
    explanation:
      "Claude can only 'hold in mind' so much at once: your prompt, the files, and the conversation so far. That's the context window. Fill it with junk and the important material gets crowded out — quality drops.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">3-hour chat</span><span class="md">💬💬💬💬</span><span class="arrow">→</span><span class="lg fx-shake">😵</span></div>
        <div class="row"><span class="chip good">fresh chat</span><span class="md">💬</span><span class="arrow">→</span><span class="lg fx-pop">😃</span></div>
        <span class="tag">Cluttered drifts · clean stays sharp</span>
      </div>`,
    story:
      "A sprawling three-hour chat that wandered across ten topics starts giving confused, repetitive, slightly-off answers.",
    question: "What's going on, and the fix?",
    options: [
      {
        text: "The context is bloated with old, irrelevant turns — start a fresh chat",
        correct: true,
      },
      { text: "Claude got tired and needs a break", correct: false },
      { text: "You've run out of tokens forever", correct: false },
    ],
    concept: "Start fresh when it drifts",
    explanation:
      "Long, meandering chats accumulate noise that crowds the context window. When answers start drifting or repeating, open a new chat and paste in just the relevant bit. A clean desk beats a cluttered one.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">300 pages</span><span class="md fx-shake">📚</span><span class="arrow">→</span><span class="md">🧠</span><span class="chip bad">buried</span></div>
        <div class="row"><span class="chip good">1 section</span><span class="md fx-float">📄</span><span class="arrow">→</span><span class="lg fx-pop">🎯</span></div>
        <span class="tag">Relevant context beats more context</span>
      </div>`,
    story:
      "Randall pastes a 300-page product manual just to ask one question about something on page 4.",
    question: "Smarter move?",
    options: [
      {
        text: "Give only the relevant section (or let Cowork/a sub-agent digest it first)",
        correct: true,
      },
      { text: "Always paste the entire document, just in case", correct: false },
      { text: "Ask the question across 50 small messages", correct: false },
    ],
    concept: "Feed it what matters",
    explanation:
      "More context isn't better — relevant context is. Dumping irrelevant pages costs quality and money and buries the signal. Quote the part that matters, or have Cowork or a sub-agent summarize the document first (callback to Lessons 1 & 2).",
  },
  {
    animation: `
      <div class="scene">
        <span class="md">💬</span><span class="note">yesterday</span><span class="arrow">→</span><span class="lg fx-wobble">💬</span><span class="md fx-flick">❓</span>
        <span class="tag">New chat = clean slate (by default)</span>
      </div>`,
    story:
      "Randall opens a brand-new chat today and expects Claude to remember everything they discussed yesterday.",
    question: "Will it?",
    options: [
      {
        text: "No — each new chat starts fresh unless you use memory or a Project",
        correct: true,
      },
      { text: "Yes, it remembers all past chats forever", correct: false },
      { text: "Only on weekdays", correct: false },
    ],
    concept: "Fresh chat = clean slate",
    explanation:
      "By default, each new conversation is a blank slate. For continuity, use a Project (knowledge base + custom instructions, from Lesson 2) or simply paste the key context back in. Don't assume yesterday carried over.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-pulse">📐</span><span class="arrow">→</span><span class="row"><span class="md fx-float">💬</span><span class="md fx-float-d">💬</span></span>
        <span class="note">set once · applies everywhere</span>
        <span class="tag">Custom instructions</span>
      </div>`,
    story:
      "Randall types 'use British spelling and keep it concise' at the start of literally every chat.",
    question: "What should he set up instead?",
    options: [
      { text: "Custom instructions, so the preference applies automatically", correct: true },
      { text: "Just hope Claude remembers", correct: false },
      { text: "Type it in bigger letters", correct: false },
    ],
    concept: "Set standing preferences",
    explanation:
      "Custom instructions (and Project instructions) let you set preferences once — tone, spelling, your role, format rules — so every chat starts that way. Stop re-typing the same setup; bake it in.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">buried</span><span class="md">📄 ❓ 📄</span></div>
        <div class="row"><span class="chip good">up front</span><span class="md fx-pop">❓</span><span class="md">📄 📄</span></div>
        <span class="tag">Lead with the clear ask</span>
      </div>`,
    story:
      "Randall writes two pages of background and hides his actual question in a single sentence somewhere in the middle.",
    question: "Best practice?",
    options: [
      {
        text: "State the task clearly up front (or clearly labeled at the end) — don't bury it",
        correct: true,
      },
      { text: "Tuck it in the middle so it has context around it", correct: false },
      { text: "Never give any background at all", correct: false },
    ],
    concept: "Make the ask easy to find",
    explanation:
      "Lead with the clear task, then the supporting context — or clearly separate 'here's the background' from 'here's what I need.' A clearly marked request beats one buried mid-paragraph where it can get lost.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">🧹</span><span class="lg fx-pulse">🧠</span><span class="md fx-float-d">✨</span>
        <span class="tag">Context hygiene = sharp answers</span>
      </div>`,
    story:
      "A long, multi-week project keeps producing great results without ever bogging down.",
    question: "Which set of habits makes that possible?",
    options: [
      {
        text: "Fresh chat per task + only relevant context + a Project for what should persist",
        correct: true,
      },
      { text: "One giant never-ending chat for everything", correct: false },
      { text: "Pasting every file into every single message", correct: false },
    ],
    concept: "Context hygiene",
    explanation:
      "The pros keep it tidy: a new chat per task, only the context that's relevant, and anything that should persist parked in a Project. Tidy context in, sharp answers out — every time.",
  },
];

export const contextGlossary: GlossaryEntry[] = [
  { term: "Context window", meaning: "Claude's limited working memory — your prompt, files, and the chat so far. Fill it with junk and quality drops." },
  { term: "Context hygiene", meaning: "Keeping the window clean: relevant info only, fresh chats for new tasks." },
  { term: "Fresh chat", meaning: "A new conversation = a clean slate. By default it remembers nothing from past chats." },
  { term: "Custom instructions", meaning: "Standing preferences (tone, spelling, role, format) set once and applied to every chat." },
  { term: "Project memory", meaning: "Curated persistence via a Project's knowledge base + instructions — not raw chat history (Lesson 2)." },
];
