import { scenarios as aiConceptScenarios } from "./scenarios";
import { glossary as aiConceptGlossary } from "./glossary";
import { desktopScenarios, desktopGlossary } from "./lesson-desktop";
import { promptingScenarios, promptingGlossary } from "./lesson-prompting";
import { contextScenarios, contextGlossary } from "./lesson-context";
import { trustScenarios, trustGlossary } from "./lesson-trust";
import { safetyScenarios, safetyGlossary } from "./lesson-safety";
import { filesScenarios, filesGlossary } from "./lesson-files";
import { modelScenarios, modelGlossary } from "./lesson-models";
import type { Scenario } from "./scenarios";
import type { GlossaryEntry } from "./glossary";

/** A reliable, external place to go deeper (shown on the results screen) */
export type Source = { label: string; url: string };

export type Lesson = {
  slug: string;
  /** Short number shown on the card, e.g. "01" */
  order: string;
  title: string;
  /** One-line hook for the dashboard card */
  tagline: string;
  /** Emoji used as the card icon */
  icon: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationMin: number;
  /** Highlights high-impact, must-do lessons with a "Recommended" badge */
  recommended?: boolean;
  /** Pills shown under the card title */
  topics: string[];
  /** Two-tone gradient used to accent the card */
  accent: [string, string];
  // ── Intro screen content ──
  introTagline: string;
  introParagraph: string;
  /** Comma-separated concepts, rendered bold in the intro */
  learnList: string;
  // ── Game data ──
  scenarios: Scenario[];
  glossary: GlossaryEntry[];
  // ── Optional results-screen extras (used by the Advanced track) ──
  /** Concrete next actions — "try these this week" */
  actions?: string[];
  /** Authoritative links to go deeper */
  sources?: Source[];
};

export const lessons: Lesson[] = [
  {
    slug: "ai-concepts",
    order: "01",
    title: "How AI Agents Actually Work",
    tagline:
      "Agents, sub-agents, tools, skills, commands, plugins, tokens & MCP — explained with squares.",
    icon: "🧠",
    level: "Beginner",
    durationMin: 5,
    recommended: true,
    topics: ["Agents", "Tools", "Skills", "Plugins", "Tokens", "MCP"],
    accent: ["#a855f7", "#ec4899"],
    introTagline: "A 5-minute game to learn how AI agents actually work",
    introParagraph:
      "Welcome to Square Drawing Co. — a company run by Randall the CEO that draws beautiful squares for clients around the world. You'll see real situations the team faces, with a quick visual demo above each one. Pick the right answer, learn the AI concept behind it.",
    learnList:
      "agents, orchestrators, sub-agents, tools, skills, commands, plugins, tokens, and MCP servers",
    scenarios: aiConceptScenarios,
    glossary: aiConceptGlossary,
  },
  {
    slug: "prompting",
    order: "02",
    title: "How to Talk to Claude",
    tagline:
      "The #1 skill: context, examples, format, roles & iteration. Turn vague asks into great results.",
    icon: "🗣️",
    level: "Beginner",
    durationMin: 5,
    recommended: true,
    topics: ["Context", "Examples", "Format", "Iterating", "Patterns"],
    accent: ["#fb923c", "#f43f5e"],
    introTagline: "A 5-minute game to write prompts that actually work",
    introParagraph:
      "Same Square Drawing Co., new skill. Randall keeps blaming the AI when really it's the brief. You'll watch vague asks flop and sharp ones shine, and learn the handful of habits that turn 'make something nice' into exactly what you wanted.",
    learnList:
      "giving context, showing examples, specifying format, setting a role, iterating, and reusable prompt patterns",
    scenarios: promptingScenarios,
    glossary: promptingGlossary,
  },
  {
    slug: "choosing-a-model",
    order: "03",
    title: "Pick the Right Model",
    tagline:
      "Opus, Sonnet or Haiku? Match model to task for the best mix of quality, speed & cost.",
    icon: "⚖️",
    level: "Intermediate",
    durationMin: 4,
    recommended: true,
    topics: ["Opus", "Sonnet", "Haiku", "Speed vs depth"],
    accent: ["#fbbf24", "#fb923c"],
    introTagline: "A 4-minute game on right-sizing the model",
    introParagraph:
      "Claude comes in a few sizes, and picking well saves both time and money. Randall learns when to bring out the heavyweight, when the balanced all-rounder is plenty, and when the fast little one wins — no overthinking required.",
    learnList:
      "the model family, Opus, Sonnet, Haiku, how model size meets token cost, and right-sizing",
    scenarios: modelScenarios,
    glossary: modelGlossary,
  },
  {
    slug: "desktop-app",
    order: "04",
    title: "The Claude Desktop App",
    tagline:
      "Chat, Cowork, or Code? Learn which mode fits each job — and when to spin up a Project.",
    icon: "🖥️",
    level: "Beginner",
    durationMin: 5,
    topics: ["Chat", "Cowork", "Code", "Projects"],
    accent: ["#22d3ee", "#6366f1"],
    introTagline: "A 5-minute game to master the Claude Desktop App",
    introParagraph:
      "Randall's team just installed the Claude Desktop App — same Square Drawing Co., brand-new superpower. You'll face real situations and decide: is this a job for Chat, Cowork, or Code? And when should Randall stop re-pasting context and set up a Project? Pick the right mode, learn exactly why.",
    learnList:
      "Chat, Cowork, Code, contained workspaces, scheduled automation, and when to create Projects",
    scenarios: desktopScenarios,
    glossary: desktopGlossary,
  },
  {
    slug: "context-memory",
    order: "05",
    title: "Context & Memory",
    tagline:
      "Why long chats drift, when to start fresh, and how to keep Claude's working memory sharp.",
    icon: "🪟",
    level: "Beginner",
    durationMin: 4,
    topics: ["Context window", "Fresh chats", "Custom instructions"],
    accent: ["#34d399", "#22d3ee"],
    introTagline: "A 4-minute game on Claude's working memory",
    introParagraph:
      "Think of Claude's attention as Randall's desk — it only fits so many papers at once. This lesson is about keeping that desk tidy: what to include, when to start a new chat, and how to make preferences stick so you stop repeating yourself.",
    learnList:
      "the context window, context hygiene, fresh chats, custom instructions, and Project memory",
    scenarios: contextScenarios,
    glossary: contextGlossary,
  },
  {
    slug: "trust-verify",
    order: "06",
    title: "Trust, but Verify",
    tagline:
      "Hallucinations, knowledge cutoffs & the verify habit — use AI fast without getting burned.",
    icon: "🔍",
    level: "Beginner",
    durationMin: 4,
    topics: ["Hallucinations", "Cutoffs", "Verifying", "Grounding"],
    accent: ["#60a5fa", "#a78bfa"],
    introTagline: "A 4-minute game on using AI output safely",
    introParagraph:
      "Claude is brilliant — and sometimes confidently wrong. This lesson shows you where to lean on it (drafting, ideas, structure) and where to check (names, numbers, dates, claims), so you move fast without forwarding a made-up stat to a client.",
    learnList:
      "hallucinations, knowledge cutoffs, grounding, verification, and keeping a human in the loop",
    scenarios: trustScenarios,
    glossary: trustGlossary,
  },
  {
    slug: "data-safety",
    order: "07",
    title: "Keep It Safe",
    tagline:
      "What's okay to share, what to anonymize, and how to grant the least access needed.",
    icon: "🔒",
    level: "Beginner",
    durationMin: 4,
    topics: ["Privacy", "What to share", "Least-privilege", "Policy"],
    accent: ["#f87171", "#fb7185"],
    introTagline: "A 4-minute game on safe AI habits at work",
    introParagraph:
      "Useful and safe aren't a trade-off. Randall learns to pause before pasting, share only what's needed, mind who can see a shared Project, and connect tools narrowly — the simple habits that prevent real incidents.",
    learnList:
      "sensitive data, data minimization, least-privilege access, approved tools, and your company AI policy",
    scenarios: safetyScenarios,
    glossary: safetyGlossary,
  },
  {
    slug: "files-and-tools",
    order: "08",
    title: "Files, Tools & Deliverables",
    tagline:
      "Upload docs, connect your tools, and turn it all into polished artifacts you can actually use.",
    icon: "📎",
    level: "Intermediate",
    durationMin: 5,
    topics: ["Documents", "Connectors", "Artifacts", "Deliverables"],
    accent: ["#2dd4bf", "#3b82f6"],
    introTagline: "A 5-minute game on getting real work out",
    introParagraph:
      "This is where it all comes together. Randall uploads documents, connects Drive and Slack, and turns messy files into clean tables and finished deliverables — then refines them in place. Bread-and-butter knowledge work, done in minutes.",
    learnList:
      "file uploads, structured extraction, connectors, artifacts, and matching the file job to the right mode",
    scenarios: filesScenarios,
    glossary: filesGlossary,
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}
