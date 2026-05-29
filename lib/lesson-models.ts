import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

// Lesson 8 — Pick the Right Model (Opus / Sonnet / Haiku trade-offs)
export const modelScenarios: Scenario[] = [
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip warn">Opus</span><span class="note">deepest reasoning · slower · pricier</span></div>
        <div class="row"><span class="chip good">Sonnet</span><span class="note">balanced · the sensible default</span></div>
        <div class="row"><span class="chip info">Haiku</span><span class="note">fastest · lightest · cheapest</span></div>
        <span class="tag">A family · right tool for the job</span>
      </div>`,
    story:
      "Randall notices Claude comes in a few sizes and wonders which one is simply 'the best.'",
    question: "What's the basic trade-off between them?",
    options: [
      {
        text: "Bigger = deeper reasoning but slower/pricier; smaller = faster/cheaper",
        correct: true,
      },
      { text: "They're all identical under the hood", correct: false },
      { text: "Bigger is always better for every task", correct: false },
    ],
    concept: "A family of models",
    explanation:
      "Claude comes as a range: heavyweights tuned for hard reasoning (Opus), a balanced all-rounder (Sonnet), and a light, fast one (Haiku). There's no single 'best' — there's the right tool for each job.",
  },
  {
    animation: `
      <div class="scene">
        <span class="lg fx-shake">🧩</span><span class="arrow">→</span><span class="chip warn">Opus</span><span class="md fx-pop">💡</span>
        <span class="tag">Hard problem → most capable</span>
      </div>`,
    story:
      "Randall has a gnarly strategy analysis full of trade-offs, edge cases, and nuance — and getting it right really matters.",
    question: "Which tier fits?",
    options: [
      { text: "The most capable tier (Opus) — depth over speed", correct: true },
      { text: "The fastest, lightest tier", correct: false },
      { text: "It makes no difference here", correct: false },
    ],
    concept: "Big model for hard problems",
    explanation:
      "For complex reasoning, nuanced writing, tricky code, or high-stakes analysis, reach for the most capable model (Opus). It thinks harder — well worth the extra time and cost when quality matters most.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-float">✉️📝</span><span class="arrow">→</span><span class="chip good">Sonnet</span><span class="md fx-pop">⚡</span>
        <span class="tag">Everyday work → balanced</span>
      </div>`,
    story:
      "Most of Randall's day is drafting emails, summarizing notes, and general back-and-forth.",
    question: "Best default for that?",
    options: [
      { text: "A balanced mid-tier (Sonnet) — very capable and quick", correct: true },
      { text: "Always the biggest model, no matter what", correct: false },
      { text: "Avoid AI for routine work", correct: false },
    ],
    concept: "Balanced for daily work",
    explanation:
      "For most everyday tasks, a balanced model (Sonnet) hits the sweet spot — highly capable, but noticeably faster and cheaper than the top tier. It's the sensible default you reach for first.",
  },
  {
    animation: `
      <div class="scene">
        <span class="md fx-casc-1">💬</span><span class="md fx-casc-2">💬</span><span class="md fx-casc-3">💬</span><span class="arrow">→</span><span class="chip info">Haiku</span><span class="md fx-pop">🏃</span>
        <span class="tag">Simple &amp; high-volume → fastest</span>
      </div>`,
    story:
      "Randall needs to classify 5,000 short customer messages by topic — simple work, but a lot of it.",
    question: "Which tier?",
    options: [
      { text: "The fastest, lightest tier (Haiku) — speed and volume", correct: true },
      { text: "The biggest model, 5,000 times over", correct: false },
      { text: "Sort all 5,000 by hand", correct: false },
    ],
    concept: "Fast model for volume",
    explanation:
      "For simple, repetitive, or high-volume tasks where speed and cost matter more than deep reasoning, the lightest model (Haiku) is ideal. Don't pay heavyweight prices for easy work.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="chip warn">bigger model</span><span class="note">more $ per token</span></div>
        <div class="row"><span class="chip info">smaller model</span><span class="note">less $ per token</span></div>
        <span class="tag">Model size meets token cost</span>
      </div>`,
    story:
      "Randall wonders why the model he picks even affects the bill.",
    question: "Why does it?",
    options: [
      {
        text: "Bigger models cost more per token (remember tokens from Lesson 1)",
        correct: true,
      },
      { text: "Pricing is random", correct: false },
      { text: "All models are always free", correct: false },
    ],
    concept: "Model size meets token cost",
    explanation:
      "Remember tokens from Lesson 1? Bigger models charge more per token. Matching the model to the task is how you keep quality high without overpaying — heavyweight for the hard 10%, lighter models for the routine 90%.",
  },
  {
    animation: `
      <div class="scene stack">
        <div class="row"><span class="note">hard / important</span><span class="arrow">→</span><span class="chip warn">Opus</span></div>
        <div class="row"><span class="note">everyday</span><span class="arrow">→</span><span class="chip good">Sonnet</span></div>
        <div class="row"><span class="note">simple / bulk</span><span class="arrow">→</span><span class="chip info">Haiku</span></div>
        <span class="tag">Right-size the model</span>
      </div>`,
    story:
      "Randall wants a rule of thumb the team can apply without overthinking it.",
    question: "Which one?",
    options: [
      {
        text: "Hard/important → Opus · everyday → Sonnet · simple/bulk → Haiku",
        correct: true,
      },
      { text: "Always pick the biggest", correct: false },
      { text: "Always pick the smallest", correct: false },
    ],
    concept: "Right-size the model",
    explanation:
      "Start with the balanced model; upgrade to the biggest when a task is genuinely hard or high-stakes; drop to the fastest for simple, bulk, or speed-critical work. Right-size it and you get the best of all three.",
  },
];

export const modelGlossary: GlossaryEntry[] = [
  { term: "Model family", meaning: "Claude comes in several sizes trading off depth vs. speed/cost. No single 'best' — pick per task." },
  { term: "Opus", meaning: "The most capable tier. Deepest reasoning, slower and pricier — for hard, high-stakes work." },
  { term: "Sonnet", meaning: "The balanced all-rounder. Very capable, faster and cheaper than Opus — the sensible default." },
  { term: "Haiku", meaning: "The fastest, lightest tier. Best for simple, repetitive, or high-volume tasks." },
  { term: "Right-sizing", meaning: "Matching the model to the job: heavyweight for the hard 10%, lighter models for the routine 90%." },
];
