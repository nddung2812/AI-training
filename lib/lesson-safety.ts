import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

// Lesson 6 — Keep It Safe (data privacy & good habits)
export const safetyScenarios: Scenario[] = [
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">📄🔒</span><span class="arrow">→</span><span class="lg fx-pulse">✋</span><span class="md fx-flick">❓</span>
        <span class="tag">Pause before you paste</span>
      </div>`,
    story:
      "Randall is about to paste a client's full contract — complete with personal details — into a tool he found online five minutes ago.",
    question: "What's the first question he should ask?",
    options: [
      {
        text: "'Am I allowed to share this data here, and do I even need to?'",
        correct: true,
      },
      { text: "'Will it answer quickly?'", correct: false },
      { text: "'Is the file small enough to upload?'", correct: false },
    ],
    concept: "Pause before you paste",
    explanation:
      "Before sharing anything sensitive — client personal info, secrets, financials, legal docs — ask whether you're permitted to, and whether you even need to include it. Often you can anonymize it or share just the relevant slice.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-float">📋</span><span class="note">company AI policy</span><span class="arrow">→</span><span class="md fx-pulse">✅</span>
        <span class="tag">Follow the rules · ask if unsure</span>
      </div>`,
    story:
      "Two teammates disagree about whether a certain spreadsheet can go into an AI tool.",
    question: "Who decides what's okay?",
    options: [
      {
        text: "Your company's data/AI policy — follow it, and ask if you're unsure",
        correct: true,
      },
      { text: "Whoever's standing closest", correct: false },
      { text: "It's all allowed by default", correct: false },
    ],
    concept: "Follow the policy",
    explanation:
      "Every workplace has (or needs) rules about what data can go into AI tools and which approved tools to use. When in doubt, ask before you share. Approved business plans typically offer stronger data protections than random free tools.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">Jane Smith · acct #4471</span><span class="arrow">→</span><span class="lg fx-shake">⚠️</span></div>
        <div class="row"><span class="chip good">"an upset client, late order"</span><span class="arrow">→</span><span class="lg fx-pop">👍</span></div>
        <span class="tag">Share the minimum needed</span>
      </div>`,
    story:
      "Randall wants help drafting a reply to an angry customer.",
    question: "Which prompt is safer?",
    options: [
      {
        text: "Strip the identifiers — 'an upset client whose order was late'",
        correct: true,
      },
      { text: "Include her full name, account number, and address", correct: false },
      { text: "Add even more personal detail so it's 'accurate'", correct: false },
    ],
    concept: "Share the minimum",
    explanation:
      "Claude can write a great reply without the customer's real name, account number, or address. Share the minimum needed for the task — less sensitive data in means less risk if anything ever goes wrong. This is data minimization.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">🗂️🔒</span><span class="arrow">→</span><span class="row"><span class="sm">👥</span></span>
        <span class="note">shared ≠ private</span>
        <span class="tag">Mind who has access</span>
      </div>`,
    story:
      "Randall drops confidential salary figures into the knowledge base of a Project that the whole team shares.",
    question: "Who can now see them?",
    options: [
      {
        text: "Everyone with access to that Project — match sharing to sensitivity",
        correct: true,
      },
      { text: "Only Randall, always", correct: false },
      { text: "Nobody — knowledge bases are private", correct: false },
    ],
    concept: "Mind who has access",
    explanation:
      "A shared Project's knowledge base is visible to everyone on it. Put confidential material only where the right people — and no one else — can reach it. Shared is not the same as private (callback to Projects in Lesson 2).",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">whole drive</span><span class="md">📁📁📁📁</span></div>
        <div class="row"><span class="chip good">one folder</span><span class="md fx-pop">📂</span></div>
        <span class="tag">Grant only the access needed</span>
      </div>`,
    story:
      "Randall is connecting Google Drive and Slack so Claude can help with a project.",
    question: "Best practice for connecting work tools?",
    options: [
      {
        text: "Use sanctioned connectors and grant only the access the task needs",
        correct: true,
      },
      { text: "Connect everything to everything, just in case", correct: false },
      { text: "Share your master password to be safe", correct: false },
    ],
    concept: "Least-privilege access",
    explanation:
      "Connect through approved integrations and grant the narrowest access that does the job — one folder, not the whole drive. Revoke what you no longer use. (Same instinct as Cowork's contained workspace in Lesson 2.)",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-pulse">🔒</span><span class="md fx-float">⚡</span>
        <span class="tag">Safe habits · full speed</span>
      </div>`,
    story:
      "Randall wants a one-liner so the team stays safe without slowing down.",
    question: "Which sums it up?",
    options: [
      {
        text: "Share the minimum, in approved tools, following your policy",
        correct: true,
      },
      { text: "Share everything — more data, better answers", correct: false },
      { text: "Never use AI at work to be safe", correct: false },
    ],
    concept: "Safe by default",
    explanation:
      "You don't have to choose between useful and safe. Share only what's needed, use approved tools, mind who can see it, and follow your company's policy. Safe habits, full speed.",
  },
];

export const safetyGlossary: GlossaryEntry[] = [
  { term: "Sensitive data / PII", meaning: "Personal or confidential info — names, accounts, financials, secrets, legal docs — that needs protecting." },
  { term: "Data minimization", meaning: "Sharing only the minimum information the task actually requires." },
  { term: "Least-privilege access", meaning: "Granting connectors/tools the narrowest access that gets the job done — one folder, not everything." },
  { term: "Approved tools", meaning: "The sanctioned, usually business-grade tools your company permits, with stronger data protections." },
  { term: "Company AI policy", meaning: "Your workplace's rules for what data can be used with AI and which tools are allowed. Ask if unsure." },
];
