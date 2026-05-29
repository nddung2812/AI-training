export type GlossaryEntry = { term: string; meaning: string };

export const glossary: GlossaryEntry[] = [
  {
    term: "Agent",
    meaning:
      "Anyone (or any AI) that thinks before acting — looks at the situation, decides what to do, uses tools or calls others. The CEO is an agent. Sub-agents are agents. Tools are NOT agents — they just execute.",
  },
  {
    term: "Orchestrator (CEO)",
    meaning:
      "The main agent. Breaks work into pieces, decides who handles what, assembles the final answer.",
  },
  {
    term: "Sub-agent (Sub-contractor)",
    meaning:
      "Hired by the CEO for one focused job. Walks in cold each time — no memory of past projects. Returns clean output, leaves the detail behind.",
  },
  {
    term: "Direct Tool",
    meaning:
      "A thing the agent uses directly. No briefing. Press → get result. (Calculator, web search, send email.)",
  },
  {
    term: "Skill",
    meaning:
      "A how-to playbook the AI pulls off the shelf when the situation matches.",
  },
  {
    term: "Command",
    meaning:
      "A preset workflow the user triggers in one action (like /run-payroll).",
  },
  {
    term: "Plugin",
    meaning:
      "A shareable bundle of agents + skills + tools + commands. Install, use, transfer.",
  },
  {
    term: "Input Tokens",
    meaning:
      "Everything fed INTO the AI — your prompt, files, history. Cheaper per token.",
  },
  {
    term: "Output Tokens",
    meaning:
      "Everything the AI writes back. About 5x more expensive per token than input.",
  },
  {
    term: "MCP Server",
    meaning:
      "A standardized phone line between the AI and an outside service (HubSpot, Slack, Drive, Notion). Provides the AI with tools it can call. Same protocol for every service — like USB for AI.",
  },
];
