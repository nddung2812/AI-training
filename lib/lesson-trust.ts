import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

// Lesson 5 — Trust, but Verify (hallucinations, cutoffs, verification)
export const trustScenarios: Scenario[] = [
  {
    animation: `
      <div class="scene">
        <span class="lg fx-pulse">🤖</span><span class="md fx-pop">💬</span><span class="md fx-flick">📊</span><span class="chip bad">made up!</span>
        <span class="tag">Fluent &amp; confident ≠ correct</span>
      </div>`,
    story:
      "Claude hands Randall a crisp, confident answer with a specific statistic — '63% of buyers prefer blue.' It turns out no such study exists.",
    question: "What just happened?",
    options: [
      {
        text: "A hallucination — it produced something plausible-sounding but false",
        correct: true,
      },
      { text: "A bug he should file a ticket for", correct: false },
      { text: "It lied to him on purpose", correct: false },
    ],
    concept: "Confident ≠ correct",
    explanation:
      "AI can generate fluent, confident text that's simply wrong — a 'hallucination.' It's predicting likely words, not looking facts up in a database. The cure isn't fear; it's the habit of verifying anything that matters before you rely on it.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md">📅</span><span class="note">last week's news</span><span class="arrow">→</span><span class="lg fx-wobble">🤖</span><span class="md fx-flick">❓</span>
        <span class="tag">Knowledge cutoff · give it the source</span>
      </div>`,
    story:
      "Randall asks about something that happened last week. Claude either doesn't know or gives a vague, possibly outdated answer.",
    question: "Why?",
    options: [
      {
        text: "Its training has a knowledge cutoff — for fresh info, give it the source or let it search",
        correct: true,
      },
      { text: "The model is broken", correct: false },
      { text: "It's hiding the answer from him", correct: false },
    ],
    concept: "Knowledge cutoff",
    explanation:
      "Claude was trained up to a certain date and doesn't automatically know recent events. For anything current, paste in the source, use a connector, or use a mode that can search the web — don't rely on its memory for fresh facts.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip good">trust</span><span class="note">structure · ideas · first drafts</span></div>
        <div class="row"><span class="chip warn">verify</span><span class="note">names · numbers · dates · quotes · claims</span></div>
        <span class="tag">Check the facts that matter</span>
      </div>`,
    story:
      "Randall is about to forward a Claude-written summary straight to an important client.",
    question: "What should he double-check first?",
    options: [
      {
        text: "Names, numbers, dates, quotes, legal/medical claims — anything factual that matters",
        correct: true,
      },
      { text: "Nothing — it reads well", correct: false },
      { text: "Only the spelling", correct: false },
    ],
    concept: "Verify the facts that matter",
    explanation:
      "Trust Claude for drafting, structure, and ideas. Verify the specifics — figures, names, dates, citations, and anything with real consequences. That split is the whole 'trust, but verify' mindset.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-float">🔍</span><span class="arrow">→</span><span class="md fx-pulse">🤖</span><span class="md fx-pop">📎</span>
        <span class="tag">"What's your source?" → then check it</span>
      </div>`,
    story:
      "A claim in the answer feels a little too convenient.",
    question: "Good habit when facts matter?",
    options: [
      {
        text: "Ask Claude to cite sources / show its reasoning — then actually check them",
        correct: true,
      },
      { text: "Assume it's right because it sounds sure", correct: false },
      { text: "Ask the exact same question twice", correct: false },
    ],
    concept: "Make it show its work",
    explanation:
      "Ask 'what's your source?' or 'walk me through how you got that.' It surfaces shaky reasoning — and remember a cited source can itself be fabricated, so click through on the ones that count.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-pop">📝</span><span class="note">AI drafts</span><span class="arrow">→</span><span class="lg fx-pulse">🧑‍⚖️</span><span class="note">human decides</span>
        <span class="tag">You're still the decider</span>
      </div>`,
    story:
      "Claude drafts a contract clause that looks great. Randall is tempted to sign and send it as-is.",
    question: "Right call?",
    options: [
      {
        text: "Treat it as a smart first draft, then apply human (or expert) judgment",
        correct: true,
      },
      { text: "Sign it immediately — it's well written", correct: false },
      { text: "Never use AI for anything important, ever", correct: false },
    ],
    concept: "You're still the decider",
    explanation:
      "Claude is a powerful assistant, not the final authority. For high-stakes work — legal, financial, medical, client-facing — a human, or an expert, makes the call. AI drafts; you decide. Keep a human in the loop.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip bad">from memory</span><span class="md fx-flick">🤖 ❓</span></div>
        <div class="row"><span class="chip good">from the doc</span><span class="md">📄</span><span class="arrow">→</span><span class="md fx-pop">🤖 ✅</span></div>
        <span class="tag">Ground it in the real source</span>
      </div>`,
    story:
      "Randall wants accurate answers about his own company's Q2 numbers.",
    question: "Most reliable way to ask?",
    options: [
      {
        text: "Give Claude the actual report to work from, instead of asking from memory",
        correct: true,
      },
      { text: "Just ask 'what were our Q2 sales?' and trust it", correct: false },
      { text: "Ask more politely", correct: false },
    ],
    concept: "Ground it in real data",
    explanation:
      "'From this attached report, what were Q2 sales?' is far safer than 'what were our Q2 sales?' Grounding Claude in the real source — a file, a connector, pasted text — dramatically cuts hallucinations.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-float">🤝</span><span class="md fx-pulse">🔍</span>
        <span class="tag">Trust, but verify</span>
      </div>`,
    story:
      "Randall wants a one-line rule the whole team can remember.",
    question: "Which captures the right mindset?",
    options: [
      {
        text: "Great for drafts and thinking; check anything factual before it counts",
        correct: true,
      },
      { text: "Believe everything it says — it's an AI", correct: false },
      { text: "Never trust any of it", correct: false },
    ],
    concept: "Trust, but verify",
    explanation:
      "The sweet spot is neither blind trust nor blanket refusal. Lean on Claude to think, draft, and explore fast — then verify the facts that carry weight. That balance is how professionals use it safely and still move quickly.",
  },
];

export const trustGlossary: GlossaryEntry[] = [
  { term: "Hallucination", meaning: "Fluent, confident output that's actually false. The AI predicts likely words, not verified facts." },
  { term: "Knowledge cutoff", meaning: "The date training data ends. Claude doesn't automatically know newer events — supply the source." },
  { term: "Grounding", meaning: "Giving Claude the real document/data to answer from, instead of relying on its memory. Cuts hallucinations." },
  { term: "Verification", meaning: "Checking the facts that matter — names, numbers, dates, quotes, claims — before relying on them." },
  { term: "Human-in-the-loop", meaning: "Keeping a person (or expert) as the final decision-maker on high-stakes work." },
];
