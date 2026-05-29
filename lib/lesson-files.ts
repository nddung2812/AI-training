import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

// Lesson 7 — Files, Tools & Deliverables
export const filesScenarios: Scenario[] = [
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">📄</span><span class="arrow">→</span><span class="lg fx-pulse">🤖</span><span class="arrow">→</span><span class="md fx-pop">📋</span>
        <span class="tag">Upload → summarize, extract, ask</span>
      </div>`,
    story:
      "Randall drags a 40-page PDF report into the chat and asks for the key points.",
    question: "What can Claude do with it?",
    options: [
      {
        text: "Read it and summarize, extract facts, or answer questions about it",
        correct: true,
      },
      { text: "Only count how many pages it has", correct: false },
      { text: "Nothing — it's just a PDF", correct: false },
    ],
    concept: "Claude reads your files",
    explanation:
      "Upload PDFs, docs, spreadsheets, even images — Claude can summarize, pull key facts, answer questions, or reshape the content. Turning a long document into a one-page brief is one of the most useful everyday moves.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-shake">🧾🧾🧾</span><span class="arrow">→</span><span class="lg fx-pulse">🤖</span><span class="arrow">→</span><span class="md fx-pop">📊</span>
        <span class="tag">Messy files → clean table</span>
      </div>`,
    story:
      "Randall has 30 invoices and wants vendor, amount, and date for each, lined up in a spreadsheet.",
    question: "Good task for Claude?",
    options: [
      {
        text: "Yes — extract structured data from messy files into a clean table",
        correct: true,
      },
      { text: "No, that's impossible for AI", correct: false },
      { text: "Only if he switches to Code mode", correct: false },
    ],
    concept: "Messy → structured",
    explanation:
      "Pulling structured data — tables, lists, fields — out of unstructured files like invoices, emails, or notes is bread-and-butter knowledge work. Just name the exact columns you want and let Claude fill them in.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-pulse">🤖</span><span class="md">🔌</span>
        <div class="row"><span class="chip info fx-casc-1">Drive</span><span class="chip info fx-casc-2">Slack</span><span class="chip info fx-casc-3">Notion</span></div>
        <span class="tag">Connectors plug Claude into your tools</span>
      </div>`,
    story:
      "Randall connects Google Drive, then asks: 'Find the Q2 deck and summarize slide 5.' Claude fetches it without him copy-pasting a thing.",
    question: "What made that possible?",
    options: [
      { text: "A connector (built on MCP) linking Claude to Drive", correct: true },
      { text: "A screenshot", correct: false },
      { text: "A bigger model", correct: false },
    ],
    concept: "Connectors bring your tools in",
    explanation:
      "Connectors — built on MCP from Lesson 1 — plug Claude into services you already use: Drive, Slack, Notion, and more. Now it can fetch a file or message directly instead of you copy-pasting. Connect once, then just ask.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">whole account</span><span class="md">🗝️</span></div>
        <div class="row"><span class="chip good">just this folder</span><span class="md fx-pop">📂</span></div>
        <span class="tag">Connect narrowly</span>
      </div>`,
    story:
      "When connecting Drive, Randall is asked how much access to grant.",
    question: "What should he share?",
    options: [
      { text: "Just the folder the task needs", correct: true },
      { text: "His entire account", correct: false },
      { text: "Nothing — then it can't help", correct: false },
    ],
    concept: "Connect narrowly",
    explanation:
      "Give a connector the least access that does the job — one folder, not everything. Same instinct as Cowork's contained workspace and Lesson 6's least-privilege rule. Useful and safe aren't a trade-off.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-pulse">🤖</span><span class="arrow">→</span><span class="row"><span class="md fx-casc-1">📄</span><span class="md fx-casc-2">📊</span><span class="md fx-casc-3">📈</span></span>
        <span class="tag">Artifacts = finished deliverables</span>
      </div>`,
    story:
      "Beyond chatting, Claude hands Randall a polished, formatted document he can copy straight into his deck.",
    question: "What are these usable, finished outputs called?",
    options: [
      { text: "Artifacts — deliverables, not just chat text", correct: true },
      { text: "Tokens", correct: false },
      { text: "Plugins", correct: false },
    ],
    concept: "Artifacts = usable output",
    explanation:
      "Beyond conversation, Claude can produce artifacts: a formatted document, a table, a slide outline, a chart, even a small working app. These are things you copy out and actually use — the deliverable, not just the back-and-forth.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">📄</span><span class="note">"tighten the intro"</span><span class="arrow">→</span><span class="md fx-pop">📄✨</span>
        <span class="tag">Refine the artifact in place</span>
      </div>`,
    story:
      "The document Claude produced is 90% there — the intro just needs to be punchier.",
    question: "Next move?",
    options: [
      {
        text: "Ask Claude to revise that artifact directly — 'tighten the intro'",
        correct: true,
      },
      { text: "Rewrite the whole thing by hand", correct: false },
      { text: "Start over from a blank prompt", correct: false },
    ],
    concept: "Refine the deliverable",
    explanation:
      "Artifacts are editable through conversation. 'Make the heading punchier,' 'add a totals row,' 'shorten section 2' — Claude updates the deliverable in place. The iteration habit from Lesson 3 applies here too.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip info">1 document</span><span class="arrow">→</span><span class="chip">Chat</span></div>
        <div class="row"><span class="chip info">folder of 200</span><span class="arrow">→</span><span class="chip good">Cowork</span></div>
        <span class="tag">Match the file job to the mode</span>
      </div>`,
    story:
      "Randall has a whole folder of 200 files to turn into a single report.",
    question: "Which Desktop App mode fits?",
    options: [
      {
        text: "Cowork — autonomous work across many files into one deliverable",
        correct: true,
      },
      { text: "Chat, with all 200 pasted into one message", correct: false },
      { text: "Code", correct: false },
    ],
    concept: "Match files to the mode",
    explanation:
      "A single doc in Chat is fine. A whole folder turned into a finished report is a Cowork job (Lesson 2). Building software around the files would be Code. Pick the mode that fits the scale of the file work.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">📥</span><span class="arrow">→</span><span class="lg fx-pulse">🤖</span><span class="arrow">→</span><span class="md fx-pop">📦</span>
        <span class="tag">Inputs → deliverable → refine → share safely</span>
      </div>`,
    story:
      "Randall wants the whole files-and-tools workflow in one line for the team.",
    question: "Which captures it?",
    options: [
      {
        text: "Bring in the right files/tools, produce a deliverable, refine it, keep access narrow",
        correct: true,
      },
      { text: "Paste everything and hope for the best", correct: false },
      { text: "Never upload or connect anything", correct: false },
    ],
    concept: "From inputs to deliverable",
    explanation:
      "The loop: connect or upload what's relevant → ask for the deliverable you need → iterate → keep access narrow and safe. That's most knowledge work, done in minutes instead of hours.",
  },
];

export const filesGlossary: GlossaryEntry[] = [
  { term: "File upload", meaning: "Dropping a PDF, doc, sheet, or image into chat so Claude can read, summarize, or reshape it." },
  { term: "Structured extraction", meaning: "Pulling clean tables/lists/fields out of messy files — invoices, emails, notes." },
  { term: "Connector", meaning: "An MCP-based link from Claude to a service (Drive, Slack, Notion) so it can fetch files and messages directly." },
  { term: "Artifact", meaning: "A finished, usable deliverable — formatted doc, table, chart, or mini-app — not just chat text." },
  { term: "Least-privilege (recap)", meaning: "Grant connectors only the narrow access the task needs — one folder, not your whole account." },
];
