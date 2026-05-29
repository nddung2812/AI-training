import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

// =====================================================
// Lesson 2 — The Claude Desktop App: Chat · Cowork · Code
// Same Square Drawing Co. universe, new superpower.
// Teaches: when to use Chat vs Cowork vs Code, and when
// to set up a Project. Content reflects the 2026 desktop app.
// =====================================================

export const desktopScenarios: Scenario[] = [
  {
    animation: `
      <div class="scene dchat">
        <span class="user">🧑‍💼</span>
        <span class="bubble b1">💬</span>
        <span class="bubble b2">💡</span>
        <span class="bubble b3">💬</span>
        <span class="tag">Quick back-and-forth · just thinking out loud</span>
      </div>`,
    story:
      "Randall has four minutes before his next meeting. He wants to riff on headline ideas for the new square-mural campaign — toss a few thoughts back and forth, no files, no finished document. Just thinking out loud with a smart sounding board.",
    question: "Which Desktop App mode fits best?",
    options: [
      { text: "Chat", correct: true },
      { text: "Cowork", correct: false },
      { text: "Code", correct: false },
    ],
    concept: "Chat — the mode for thinking",
    explanation:
      "Chat is the fast lane: quick questions, brainstorming, drafting, rubber-ducking. It's the same Claude you know from claude.ai — but running natively on your desktop. No digging through files, no autonomous tasks, just a conversation. When the job is 'help me think,' reach for Chat.",
  },
  {
    animation: `
      <div class="scene dshot">
        <span class="screen">🖥️</span>
        <span class="snap">📸</span>
        <span class="arrow">→</span>
        <span class="chat-bubble">💬</span>
        <span class="mic">🎙️</span>
        <span class="tag">Screenshot · dictate · Quick Entry — native to your desktop</span>
      </div>`,
    story:
      "A confusing analytics dashboard is open on Randall's screen. He wants Claude to explain one weird metric — but retyping the whole table would be painful.",
    question: "What desktop-only trick makes Chat perfect here?",
    options: [
      {
        text: "Snap a screenshot (or share the window) straight into Chat",
        correct: true,
      },
      { text: "Hand Claude the terminal", correct: false },
      { text: "Give Claude your entire hard drive", correct: false },
    ],
    concept: "Chat's desktop superpowers",
    explanation:
      "Because Chat runs natively on your computer, you get tricks a browser tab can't do: snap a screenshot or share a window, dictate by voice, and pop Claude open instantly with Quick Entry (the Option-key overlay). These native extras are the whole reason to use the desktop Chat over claude.ai in a browser.",
  },
  {
    animation: `
      <div class="scene dfolder">
        <span class="folder">📁</span>
        <span class="arrow">→</span>
        <span class="bot">🤖</span>
        <span class="gear">⚙️</span>
        <span class="arrow">→</span>
        <span class="report">📊</span>
        <span class="tag">Share a folder · Claude works for an hour · deliverable out</span>
      </div>`,
    story:
      "Fifty client contracts sit in a folder. Randall needs every clause about delivery deadlines pulled out, cross-referenced, and turned into one clean summary report. It'll take an hour of careful reading — but there's zero coding involved.",
    question: "Which mode should do this work?",
    options: [
      { text: "Cowork", correct: true },
      { text: "Chat", correct: false },
      { text: "Code", correct: false },
    ],
    concept: "Cowork — the mode for doing",
    explanation:
      "Cowork is for real work that takes effort but isn't software. You point it at a folder, hand it a goal, and it executes autonomously — reading files, synthesizing across many sources, and producing a finished deliverable. It's Claude Code's agentic engine wrapped in a UI built for non-developers: researchers, analysts, ops, legal, finance.",
  },
  {
    animation: `
      <div class="scene dsandbox">
        <span class="laptop">💻</span>
        <span class="arrow">→</span>
        <div class="fence">
          <span class="shared">📂 shared folder ✅</span>
          <span class="locked">🔒 everything else</span>
        </div>
        <span class="tag">Cowork only sees the folders you choose to share</span>
      </div>`,
    story:
      "Randall likes Cowork but gets nervous: he does NOT want it rummaging through his whole laptop. He only wants it touching the 'Q2 Contracts' folder and nothing else.",
    question: "How does Cowork's file access actually work?",
    options: [
      {
        text: "It runs in a contained workspace — it only sees the folders you share with it",
        correct: true,
      },
      { text: "It has full run of your entire file system", correct: false },
      { text: "It can't read files at all", correct: false },
    ],
    concept: "Cowork's contained workspace",
    explanation:
      "Cowork runs in a contained workspace limited to the folders you explicitly share. That's the safety line — you decide exactly what it can see. This is the key difference from Code, which works directly in your real project with full file-system access. Cowork = sandboxed to what you share; Code = full access to your actual files.",
  },
  {
    animation: `
      <div class="scene dsched">
        <span class="clock">⏰</span>
        <span class="arrow">→</span>
        <span class="src sa">💬</span>
        <span class="src sb">📅</span>
        <span class="src sc">📦</span>
        <span class="arrow">→</span>
        <span class="brief">📝</span>
        <span class="tag">Runs on a schedule · multitasks across sources</span>
      </div>`,
    story:
      "Every morning Randall wants a single briefing note that pulls together overnight Slack messages, the day's calendar, and any new orders — ready on his desk before he sits down, without him asking each time.",
    question: "What Cowork capability is this?",
    options: [
      {
        text: "Scheduled automation — it runs on a recurring schedule and multitasks across sources",
        correct: true,
      },
      { text: "A direct tool he presses each morning", correct: false },
      { text: "A screenshot", correct: false },
    ],
    concept: "Cowork runs on its own",
    explanation:
      "Cowork can multitask — juggling different parts of a job and spinning up sub-agents — and it can run on a schedule. Set up a recurring task once and the finished result just shows up. This is what makes it a 'coworker' rather than a chatbot: you hand off the whole task, not one question at a time.",
  },
  {
    animation: `
      <div class="scene dcode">
        <span class="term">⌨️</span>
        <span class="arrow">→</span>
        <span class="gitb">🌿</span>
        <span class="check">✅</span>
        <span class="arrow">→</span>
        <span class="commit">📦</span>
        <span class="tag">Terminal · git-aware · writes, tests &amp; commits real code</span>
      </div>`,
    story:
      "Square Drawing Co. is building its own order-tracking web app. Randall needs Claude to write the code, run the test suite, fix whatever breaks, and commit the changes to git with proper messages.",
    question: "Which mode is built for this?",
    options: [
      { text: "Code", correct: true },
      { text: "Cowork", correct: false },
      { text: "Chat", correct: false },
    ],
    concept: "Code — the mode for building",
    explanation:
      "Code is the developer's mode: terminal-based, git-aware, with direct access to your real files — no sandbox between Claude and your project. It writes code, runs commands and tests, and makes real commits with real messages. If the job is building or modifying software, Code is where you start.",
  },
  {
    animation: `
      <div class="scene drule">
        <div class="lane"><span class="ico">⚡</span><span class="lbl">quick question</span><span class="arrow">→</span><span class="mode mc">Chat</span></div>
        <div class="lane"><span class="ico">📁</span><span class="lbl">files, no code</span><span class="arrow">→</span><span class="mode mw">Cowork</span></div>
        <div class="lane"><span class="ico">🔧</span><span class="lbl">build software</span><span class="arrow">→</span><span class="mode mo">Code</span></div>
        <span class="tag">Match the task to the mode</span>
      </div>`,
    story:
      "A teammate wants to reorganize a folder of 200 marketing PDFs and rename them all consistently. No programming whatsoever. They almost reached for Code 'because it touches files.'",
    question: "What's the better pick?",
    options: [
      {
        text: "Cowork — it's file work, but not software, so Code is overkill",
        correct: true,
      },
      { text: "Code, because the task touches files", correct: false },
      { text: "Chat — just paste all 200 PDFs into the message", correct: false },
    ],
    concept: "The decision rule",
    explanation:
      "Here's the whole rule: building or modifying software → Code. A time-consuming task on your local files that needs no code → Cowork. A quick conversational question → Chat. 'It touches files' alone doesn't mean Code — Cowork handles file work for non-developers. Don't bring a terminal to a paperwork job.",
  },
  {
    animation: `
      <div class="scene dproj">
        <span class="repeat r1">📋</span>
        <span class="repeat r2">📋</span>
        <span class="repeat r3">📋</span>
        <span class="arrow">→</span>
        <span class="projbox">🗂️</span>
        <span class="tag">Stop re-pasting · set the context up once in a Project</span>
      </div>`,
    story:
      "Randall keeps pasting the same company brand guidelines, tone rules, and logo specs at the start of every single chat. He's done it twenty times this week, and it's getting old.",
    question: "What should he set up instead?",
    options: [
      {
        text: "A Project — brand docs in its knowledge base, the rules as custom instructions",
        correct: true,
      },
      { text: "A new MCP server", correct: false },
      { text: "A plugin", correct: false },
    ],
    concept: "When to create a Project",
    explanation:
      "Create a Project when the work is ongoing: you reuse the same reference materials, you want consistent instructions every time, or a team needs one shared foundation. Upload the brand docs once to the knowledge base, write the standing rules as custom instructions — and every chat inside that project starts with the context already baked in.",
  },
  {
    animation: `
      <div class="scene dmem">
        <span class="vault">🗂️</span>
        <div class="kb">
          <span class="kb-item">📄 knowledge base</span>
          <span class="kb-item">📐 custom instructions</span>
        </div>
        <span class="arrow">→</span>
        <span class="fresh f1">💬</span>
        <span class="fresh f2">💬</span>
        <span class="tag">Curated context carries · raw chat history does not</span>
      </div>`,
    story:
      "After lots of chatting inside his new Project, Randall assumes Claude now 'remembers' everything from all those past conversations automatically.",
    question: "Is that how Projects work?",
    options: [
      {
        text: "No — each chat starts clean; only the knowledge base + custom instructions carry across",
        correct: true,
      },
      { text: "Yes, every chat remembers every other chat", correct: false },
      { text: "Yes, but only for 24 hours", correct: false },
    ],
    concept: "A Project is curated memory, not chat history",
    explanation:
      "A Project gives you curated persistent context — not accumulated chat history. Each new chat starts fresh and only knows what you intentionally put in: the knowledge base files and the custom instructions. Tip: name files clearly ('Q2-2026-Brand-Guidelines.pdf' beats 'document1.pdf'), because Claude uses file names to find the right info.",
  },
];

export const desktopGlossary: GlossaryEntry[] = [
  {
    term: "Chat",
    meaning:
      "The quick conversation mode — questions, brainstorming, drafting. Native desktop extras: screenshots, voice dictation, Quick Entry. No autonomous file work. 'For thinking.'",
  },
  {
    term: "Cowork",
    meaning:
      "The autonomous 'doing' mode for knowledge work. Point it at folders you share; it researches, synthesizes, and produces finished deliverables. Can schedule tasks and multitask. No terminal, no coding required.",
  },
  {
    term: "Code",
    meaning:
      "The developer mode — terminal-based, git-aware, with full access to your real files. Writes, tests, runs, and commits software. 'For building.'",
  },
  {
    term: "Contained workspace",
    meaning:
      "Cowork only sees the folders you explicitly share — your safety boundary. (Code, by contrast, has full file-system access.)",
  },
  {
    term: "Project",
    meaning:
      "A persistent workspace holding a knowledge base + custom instructions. Create one for ongoing work you repeat, shared reference materials, or team collaboration.",
  },
  {
    term: "Knowledge base",
    meaning:
      "Files you upload once and reuse across every chat in a Project. Name them clearly — Claude uses file names to find the right info.",
  },
  {
    term: "Custom instructions",
    meaning:
      "Standing rules (your role, tone, format, must-follow constraints) applied to every chat in a Project.",
  },
  {
    term: "The decision rule",
    meaning:
      "Quick question → Chat. Time-consuming file work with no code → Cowork. Building or modifying software → Code.",
  },
];
