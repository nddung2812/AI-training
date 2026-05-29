# AI Training at DrawingHub

Interactive training game for DrawingHub teammates to learn how AI agents actually work — built around **Square Drawing Co.**, a fictional company that teaches **agents, sub-agents, tools, skills, commands, plugins, tokens, and MCP servers** through 13 scenarios with animated visual demos.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- shadcn/ui (purple DrawingHub theme)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Push this scaffold to GitHub

The empty repo already exists at `https://github.com/drawinghub/AI-training-at-drawinghub.git`. From this folder, run:

```bash
git init
git add .
git commit -m "Initial scaffold: Square Drawing Co. AI training game"
git branch -M main
git remote add origin https://github.com/drawinghub/AI-training-at-drawinghub.git
git push -u origin main
```

If GitHub asks for credentials, use a Personal Access Token (Settings → Developer settings → Personal access tokens → Tokens (classic) → generate one with `repo` scope) in place of your password.

## Deploy to Vercel (recommended)

1. Push to GitHub (above)
2. Go to https://vercel.com/new
3. Import the `drawinghub/AI-training-at-drawinghub` repo
4. Click Deploy — no env vars needed, no config to change

You'll get a live URL like `ai-training-at-drawinghub.vercel.app` in ~60 seconds.

## Project structure

```
.
├── app/
│   ├── layout.tsx        — Root layout
│   ├── page.tsx          — Home page (renders <Game />)
│   └── globals.css       — All game styles + shadcn theme + keyframes
├── components/
│   ├── Game.tsx          — Main client component (state, phases, navigation)
│   └── ui/
│       └── button.tsx    — shadcn Button primitive
├── lib/
│   ├── scenarios.ts      — All 13 scenarios + animation HTML
│   ├── glossary.ts       — Glossary shown on results screen
│   └── utils.ts          — shadcn `cn` helper
├── tailwind.config.ts
├── components.json       — shadcn config
└── package.json
```

## Adding scenarios

Open `lib/scenarios.ts` and append to the `scenarios` array. Each entry needs:

- `animation` — HTML string for the scene above the question (use the existing scene CSS classes in `app/globals.css`, or add new ones)
- `story` — narrative paragraph
- `question` — the prompt
- `options` — array of `{ text, correct }`
- `concept` — short title shown in the feedback box
- `explanation` — what this teaches

## Editing the visual theme

DrawingHub purple gradient is set in `app/globals.css` (`body` background). shadcn HSL variables live in the `:root` block at the top of the same file.

## Notes

- The training game runs entirely client-side — no backend, no database, no auth. Perfect for a static deploy.
- Animations are CSS keyframes (no JS animation libraries), so it stays light.
- Each scene's HTML lives next to its data in `scenarios.ts` for easy editing.
