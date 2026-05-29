export type Option = { text: string; correct: boolean };

export type Scenario = {
  animation: string; // HTML string rendered via dangerouslySetInnerHTML
  story: string;
  question: string;
  options: Option[];
  concept: string;
  explanation: string;
};

const calculatorSVG = `<svg viewBox="0 0 64 80" width="48" height="60" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a2a5e"/><stop offset="100%" stop-color="#1a1a3e"/></linearGradient></defs><rect x="4" y="2" width="56" height="76" rx="8" fill="url(#cb)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><rect x="10" y="9" width="44" height="15" rx="3" fill="#0a0a1a"/><text x="51" y="20" text-anchor="end" fill="#10b981" font-family="ui-monospace,monospace" font-size="11" font-weight="700">7×7</text><g fill="#5a5a8e"><circle cx="17" cy="36" r="3.5"/><circle cx="27" cy="36" r="3.5"/><circle cx="37" cy="36" r="3.5"/><circle cx="17" cy="48" r="3.5"/><circle cx="27" cy="48" r="3.5"/><circle cx="37" cy="48" r="3.5"/><circle cx="17" cy="60" r="3.5"/><circle cx="27" cy="60" r="3.5"/><circle cx="37" cy="60" r="3.5"/></g><g fill="#a855f7"><circle cx="47" cy="36" r="3.5"/><circle cx="47" cy="48" r="3.5"/></g><rect x="13" y="68" width="34" height="6" rx="3" fill="#ec4899"/></svg>`;

export const scenarios: Scenario[] = [
  {
    animation: `
      <div class="scene s1">
        <span class="ceo">👨‍💼</span>
        <span class="arrow">→</span>
        <span class="calc">${calculatorSVG}</span>
        <span class="eq">=</span>
        <span class="result">49</span>
        <span class="tag">Randall uses tool directly · no briefing needed</span>
      </div>`,
    story:
      "Randall, the CEO of Square Drawing Co., needs to know the area of a square that's 7 feet on each side. He grabs the calculator from his desk, types 7 × 7, gets 49. Done in 2 seconds.",
    question: "What's the calculator?",
    options: [
      { text: "A direct tool", correct: true },
      { text: "A sub-agent", correct: false },
      { text: "A skill", correct: false },
    ],
    concept: "Direct Tool",
    explanation:
      "A tool is a thing the agent uses directly — no briefing, no conversation, just action and result. Calculator, web search, file reader, send-email button. If you can just press it and get the answer, it's a tool.",
  },
  {
    animation: `
      <div class="scene savt">
        <div class="row">
          <span class="tool-label">TOOL</span>
          <span>🔘</span>
          <span class="arrow">→</span>
          <span class="fixed">🟦</span>
          <span class="micro">always blue · zero thinking</span>
        </div>
        <div class="row">
          <span class="agent-label">AGENT</span>
          <span>🧑‍🎨</span>
          <span class="brain">🧠</span>
          <span class="arrow">→</span>
          <span class="varies">🟥🟦🟨🟩</span>
          <span class="micro">picks what fits the situation</span>
        </div>
        <span class="tag">Tool executes · Agent decides</span>
      </div>`,
    story:
      "Randall needs to pick paint for a custom client mural. He has two options on his desk. (A) A 'PICK PAINT' button that always returns the same blue #4 — fast, predictable, zero thinking. (B) Maya, the color consultant, who'd look at the customer's brand, the lighting, and the mood, then recommend a color. She might pick blue, or something completely different depending on what fits.",
    question: "What makes Maya an agent and the button NOT an agent?",
    options: [
      { text: "Maya takes longer to give an answer", correct: false },
      {
        text: "Maya thinks and decides based on the situation — the button just executes the same script every time",
        correct: true,
      },
      { text: "Maya costs more money to hire", correct: false },
    ],
    concept: "Agent vs Tool",
    explanation:
      "An agent looks at the situation, weighs the options, and DECIDES what to do — it can use one tool or another, ask a sub-contractor, or do the job itself. A tool just executes one preset action. The simple test: if it has judgment, it's an agent. If it just does its one job no matter what, it's a tool. Randall = agent. Maya = agent. Sub-contractors = agents. The calculator, the red button, a file reader = tools.",
  },
  {
    animation: `
      <div class="scene s2">
        <span class="pile">📚</span>
        <span class="arrow">→</span>
        <span class="contractor">🧑‍💼</span>
        <span class="arrow">→</span>
        <span class="summary">📄</span>
        <span class="tag">200 pages in · 1-page summary out</span>
      </div>`,
    story:
      "A 200-page legal contract lands on Randall's desk. Reading it himself would eat his whole day. He calls in Riya, a sub-contractor. Riya doesn't work at Square Drawing Co. She walks in cold, reads the whole doc, hands back a 1-page summary, and leaves.",
    question: "What is Riya?",
    options: [
      { text: "A direct tool", correct: false },
      { text: "A sub-agent", correct: true },
      { text: "A plugin", correct: false },
    ],
    concept: "Sub-agent",
    explanation:
      "A sub-agent is a sub-contractor called in for one focused task. They walk in cold (no memory of past work), do the job, hand back the result, and leave. The big win: Riya read 200 pages so Randall doesn't have to fill his brain with all that detail.",
  },
  {
    animation: `
      <div class="scene s3">
        <span class="riya-gone">🧑‍💼</span>
        <span class="hourglass">⏳</span>
        <span class="cal">📅</span>
        <span class="arrow">→</span>
        <span class="johnny">🧑‍💻</span>
        <span class="q">❓</span>
        <span class="tag">Different sub-contractor walks in · no idea what Riya did</span>
      </div>`,
    story:
      "Two weeks later, Randall has another contract that needs reviewing. Riya is unavailable, so Randall calls in Johnny — a different sub-contractor.",
    question: "Does Johnny know what Riya worked on two weeks ago?",
    options: [
      { text: "Yes, he picks up where Riya left off", correct: false },
      { text: "Yes, sub-contractors share a team knowledge base", correct: false },
      {
        text: "No, Johnny walks in completely fresh — no memory shared between sub-agents",
        correct: true,
      },
    ],
    concept: "Sub-agents Don't Share Memory",
    explanation:
      "Sub-agents don't share memory — not across calls of the same person, AND not across different sub-agents on the same project. Every one walks in cold. If Johnny needs to know what Riya did, Randall (the orchestrator) has to brief him explicitly. This kills a common assumption — that sub-agents form a 'team' that remembers things together. They don't. They're freelancers who never met each other.",
  },
  {
    animation: `
      <div class="scene s4">
        <span class="worker">👷</span>
        <span class="arrow">→</span>
        <span class="shelf">📚</span>
        <span class="arrow">→</span>
        <span class="book">📖</span>
        <span class="arrow">→</span>
        <span class="bulb">💡</span>
        <span class="tag">Worker pulls playbook off the shelf · learns how</span>
      </div>`,
    story:
      "A new hire on the drafting floor doesn't know how to draw a custom 8-sided square (technically not even a square, but the customer is paying). He walks to the shelf, pulls down a binder labeled 'Drawing Custom Polygons,' follows the steps, and gets it done perfectly.",
    question: "What's the binder?",
    options: [
      { text: "A command", correct: false },
      { text: "A plugin", correct: false },
      { text: "A skill", correct: true },
    ],
    concept: "Skill",
    explanation:
      "A skill is a how-to playbook anyone can pull off the shelf when the situation matches. It tells the worker 'here's how we do this kind of thing.' It doesn't do the work itself — it teaches the worker how. AI only loads the skill when the situation fits, so it doesn't have to memorize every playbook upfront.",
  },
  {
    animation: `
      <div class="scene s5">
        <span class="button">🟢</span>
        <span class="arrow">→</span>
        <span class="casc c1">💡</span>
        <span class="casc c2">🖥️</span>
        <span class="casc c3">📅</span>
        <span class="tag">One press triggers the full Monday routine</span>
      </div>`,
    story:
      "Every Monday at 9am, Randall presses the big green 'START WEEK' button on the wall. It triggers a preset sequence: open the studio, turn on the tablets, run the warm-up check, post the schedule on Slack. One button, full routine.",
    question: "What's that button?",
    options: [
      { text: "A command", correct: true },
      { text: "A direct tool", correct: false },
      { text: "A skill", correct: false },
    ],
    concept: "Command",
    explanation:
      "A command is a preset workflow the user triggers with one action — like typing /start-week or pressing a shortcut. It's a skill underneath, but the user invokes it directly instead of letting the AI decide when to use it. Think Slack slash commands, or the one button on the espresso machine that makes your exact drink.",
  },
  {
    animation: `
      <div class="scene s6">
        <span class="box-ship">📦</span>
        <span class="contents">👥 + 🔧 + 📖</span>
        <span class="plane">✈️</span>
        <span class="dest">🏭</span>
        <span class="tag">Whole team + tools + playbooks ship as one bundle</span>
      </div>`,
    story:
      "Square Drawing Co. wins a one-month contract to help a partner studio in Vietnam set up their own square-drawing line. They send a packaged team: a manager, two sub-contractors, all their playbooks, the tools they need, and a /quick-start command. The whole bundle drops into the partner's office, works there for a month, and packs up to leave — everything intact, transferable to the next partner.",
    question: "What is this packaged team?",
    options: [
      { text: "A sub-agent", correct: false },
      { text: "A plugin", correct: true },
      { text: "A command", correct: false },
    ],
    concept: "Plugin",
    explanation:
      "A plugin is a transferable bundle: agents + their skills + their tools + their commands, all wrapped together. Install it into any environment and the whole team comes along. This is how AI capabilities become shareable products. DrawingHub could build a plugin and ship it to a marketing agency, and they'd instantly have your whole workflow.",
  },
  {
    animation: `
      <div class="scene s7">
        <span class="order">📋</span>
        <span class="arrow">→</span>
        <span class="ceo">👨‍💼</span>
        <span class="arrow">→</span>
        <span class="workers"><span class="w">👷</span><span class="w">👷</span><span class="w">👷</span></span>
        <span class="arrow">→</span>
        <span class="out">📦✨</span>
        <span class="tag">Randall splits work, assigns workers, assembles result</span>
      </div>`,
    story:
      "A complex order arrives at Square Drawing Co.: 'Draw 50 squares, 10 different colors, deliver to 3 different cities, by Friday.' Someone needs to break this into pieces, decide who handles what, track progress, follow up with each team, and pull it all together into one delivery.",
    question: "Whose job is this?",
    options: [
      { text: "A sub-agent", correct: false },
      { text: "Randall — the CEO / orchestrator", correct: true },
      { text: "A tool", correct: false },
    ],
    concept: "Orchestrator",
    explanation:
      "The orchestrator is the CEO of the operation. Its job isn't to do the work — it's to break the request into pieces, decide who handles each piece, hand work off to sub-agents or call tools, and assemble the final result. When you chat with Claude, the main Claude IS the orchestrator. Everything else is something it calls in.",
  },
  {
    animation: `
      <div class="scene s8">
        <div class="col">
          <span class="words">"Please review the…"</span>
          <span class="words w2">"…here are the docs…"</span>
          <span class="words w3">"…and the history…"</span>
        </div>
        <span class="arrow">→</span>
        <span class="brain">🧠</span>
        <span class="counter">+842 tokens</span>
        <span class="tag">Words flowing IN · cheap per token, adds up</span>
      </div>`,
    story:
      "In a meeting, Randall briefs the team for 30 minutes — full background, customer history, requirements, attached docs, past emails. The team listens, takes it all in.",
    question: "What does the listening time represent in AI?",
    options: [
      { text: "Input tokens", correct: true },
      { text: "Output tokens", correct: false },
      { text: "A skill", correct: false },
    ],
    concept: "Input Tokens",
    explanation:
      "Input tokens = everything fed INTO the AI. Your question, attached files, instructions, conversation history. Tokens are like syllables — the unit of measurement. Listening (input) is cheaper per token than talking, but it adds up. Long files + long history = lots of input tokens = real cost.",
  },
  {
    animation: `
      <div class="scene s9">
        <span class="brain">🧠</span>
        <span class="arrow">→</span>
        <div class="col">
          <span class="words">"Here is the proposal…"</span>
          <span class="words w2">"…with three options…"</span>
          <span class="words w3">"…and recommended next…"</span>
        </div>
        <span class="cost">💸 5× cost</span>
        <span class="tag">Words flowing OUT · ~5x more expensive per token</span>
      </div>`,
    story:
      "After the briefing, the team writes a detailed 10-page proposal back to Randall. Every sentence carefully crafted. They spend hours producing it.",
    question: "What does the writing represent?",
    options: [
      { text: "Input tokens", correct: false },
      { text: "Output tokens", correct: true },
      { text: "A direct tool", correct: false },
    ],
    concept: "Output Tokens",
    explanation:
      "Output tokens = everything the AI produces back to you. The answer, code, summary, document. Output is roughly 5x MORE expensive per token than input. This is why asking for a tight summary costs less than asking for a 10-page essay, even on the same input. Talking is pricier than listening.",
  },
  {
    animation: `
      <div class="scene s10">
        <div class="row">
          <span class="bad-label">BAD</span>
          <span>👨‍💼</span>
          <span class="stack">📚📚📚📚📚</span>
          <span class="arrow">→</span>
          <span class="crush">😵</span>
          <span class="small">Randall crushed by detail</span>
        </div>
        <div class="row">
          <span class="good-label">GOOD</span>
          <span>🧑‍💼</span>
          <span class="stack">📚📚📚📚📚</span>
          <span class="arrow">→</span>
          <span>📄</span>
          <span class="arrow">→</span>
          <span>👨‍💼</span>
          <span class="small">✅</span>
        </div>
        <span class="tag">Sub-contractor protects Randall's working memory</span>
      </div>`,
    story:
      "Randall has a 500-page market research report on his desk. If he reads it all himself, he'll be tied up all day AND his brain will be full of irrelevant details by the time he walks into the next meeting.",
    question: "Smartest move?",
    options: [
      { text: "Read it himself end to end", correct: false },
      {
        text: "Hand it to a sub-agent who reads it, summarizes, then leaves the detail behind",
        correct: true,
      },
      { text: "Turn it into a skill", correct: false },
    ],
    concept: "Why Sub-agents Matter",
    explanation:
      "Sub-agents protect the orchestrator's 'context window' (working memory). The sub-contractor absorbs 500 pages of detail, distills it into 1 page, and Randall only loads that 1 page into his mind. The 499 pages of noise stay with the sub-contractor. This is THE main reason sub-agents exist in real AI systems.",
  },
  {
    animation: `
      <div class="scene smcp">
        <span class="randall">👨‍💼</span>
        <span class="phone">📞</span>
        <div class="connections">
          <span class="ext e1">🏬 HubSpot</span>
          <span class="ext e2">💬 Slack</span>
          <span class="ext e3">📁 Drive</span>
        </div>
        <span class="tag">One standard phone style · works with every outside service</span>
      </div>`,
    story:
      "A customer asks Randall about her last 5 orders. Square Drawing Co. doesn't store order history — it lives in HubSpot. Randall doesn't go digging through files. He picks up a standardized phone line, dials 'HubSpot,' and asks for the customer's order history. The same phone style works for Slack (send a message), Google Drive (grab a file), or any other outside service the team uses.",
    question: "What is that standardized phone line called?",
    options: [
      { text: "A plugin", correct: false },
      { text: "An MCP server", correct: true },
      { text: "Just another direct tool", correct: false },
    ],
    concept: "MCP Server",
    explanation:
      "An MCP server is a standardized 'phone line' from the AI to an outside service. HubSpot has one, Slack has one, Notion has one, Google Drive has one. Each one exposes a set of tools the AI can call (look up customer, send message, grab file). The win: every MCP server speaks the same protocol (Model Context Protocol), so the AI doesn't need a custom integration for each service. Think of it as USB for AI — same plug shape, different devices.",
  },
  {
    animation: `
      <div class="scene s11">
        <span class="piece p1">📅</span>
        <span class="piece p2">👥</span>
        <span class="piece p3">🔧</span>
        <span class="piece p4">⚡</span>
        <span class="arrow">→</span>
        <span class="box-final">📦</span>
        <span class="tag">Calendar + agents + tools + command → one shippable plugin</span>
      </div>`,
    story:
      "DrawingHub wants to give a partner agency a complete 'product launch' system in one install: posting calendar template, copywriter agent, designer agent, brand guidelines doc, scheduling tool, and a /run-launch command. All wrapped together so the agency installs it and immediately has the full setup ready to go.",
    question: "What is this?",
    options: [
      { text: "A skill", correct: false },
      { text: "A command", correct: false },
      { text: "A plugin", correct: true },
    ],
    concept: "Plugin (recap)",
    explanation:
      "Plugins are the unit of sharing. One plugin can hold many agents + many skills + many tools + many commands. It's how an AI workflow becomes a product you can ship, install, share, or sell. When DrawingHub builds a plugin, it's turning your team's know-how into a shareable asset.",
  },
];
