"use client";

import { useState } from "react";
import type {
  OrderExercise,
  SpotExercise,
  CategorizeExercise,
  CalcExercise,
} from "@/lib/labs";

// Shared contract: each exercise owns its interaction and decides pass/fail,
// then calls onResolved(passed) exactly once (correct → true, revealed → false).
// While resolved, the interaction is locked. The Lab renders the explanation
// and the "Continue" button afterwards.
type Ctl = {
  resolved: boolean;
  onResolved: (passed: boolean) => void;
};

function reorder<T>(list: T[], from: number, to: number): T[] {
  const next = list.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

// ── Shell ──────────────────────────────────────────────────────────────
function Shell({
  title,
  prompt,
  hint,
  children,
  controls,
}: {
  title: string;
  prompt: string;
  hint?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
}) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className="ex">
      <h2 className="ex-title">{title}</h2>
      <p className="ex-prompt">{prompt}</p>
      <div className="ex-body">{children}</div>
      {controls}
      {hint && (
        <div className="ex-hint">
          {showHint ? (
            <p>
              <span className="ex-hint-label">Hint</span> {hint}
            </p>
          ) : (
            <button className="ex-hint-btn" onClick={() => setShowHint(true)}>
              Need a hint?
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Verdict({ passed }: { passed: boolean }) {
  return passed ? (
    <div className="ex-verdict pass">✓ Nailed it</div>
  ) : (
    <div className="ex-verdict reveal">Revealed — here&apos;s the idea</div>
  );
}

// ── Order ──────────────────────────────────────────────────────────────
export function OrderEx({
  exercise,
  resolved,
  onResolved,
}: { exercise: OrderExercise } & Ctl) {
  const [order, setOrder] = useState(exercise.blocks);
  const [wrong, setWrong] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [passed, setPassed] = useState<boolean | null>(null);

  const firstVolatile = order.findIndex((b) => b.tag === "volatile");
  const prefixCount = firstVolatile === -1 ? order.length : firstVolatile;
  const valid = (() => {
    let seenVol = false;
    for (const b of order) {
      if (b.tag === "volatile") seenVol = true;
      else if (seenVol) return false;
    }
    return true;
  })();

  function move(i: number, dir: -1 | 1) {
    if (resolved) return;
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    setOrder((o) => reorder(o, i, j));
    setWrong(false);
  }
  function drop(i: number) {
    if (resolved || dragIdx === null) return;
    setOrder((o) => reorder(o, dragIdx, i));
    setDragIdx(null);
    setWrong(false);
  }
  function check() {
    if (valid) {
      setPassed(true);
      onResolved(true);
    } else setWrong(true);
  }
  function reveal() {
    setOrder([
      ...exercise.blocks.filter((b) => b.tag === "stable"),
      ...exercise.blocks.filter((b) => b.tag === "volatile"),
    ]);
    setPassed(false);
    onResolved(false);
  }

  return (
    <Shell
      title={exercise.title}
      prompt={exercise.prompt}
      hint={exercise.hint}
      controls={
        resolved ? (
          <Verdict passed={passed ?? valid} />
        ) : (
          <div className="ex-controls">
            {wrong && (
              <span className="ex-inline-wrong">
                A changing block is still above a stable one — keep the stable
                blocks on top.
              </span>
            )}
            <div className="ex-btn-row">
              <button className="btn-primary" onClick={check}>
                Check order
              </button>
              <button className="btn-back" onClick={reveal}>
                Show answer
              </button>
            </div>
          </div>
        )
      }
    >
      <ol className="order-list">
        {order.map((b, i) => (
          <li
            key={b.id}
            className={`order-row ${b.tag} ${
              resolved && i < prefixCount ? "in-prefix" : ""
            }`}
            draggable={!resolved}
            onDragStart={() => setDragIdx(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => drop(i)}
          >
            <span className="order-handle">⠿</span>
            <span className="order-main">
              <span className="order-label">{b.label}</span>
              {b.sub && <span className="order-sub">{b.sub}</span>}
            </span>
            <span className={`order-tag ${b.tag}`}>
              {b.tag === "stable" ? "stable" : "changes"}
            </span>
            <span className="order-moves">
              <button
                aria-label="Move up"
                onClick={() => move(i, -1)}
                disabled={resolved || i === 0}
              >
                ▲
              </button>
              <button
                aria-label="Move down"
                onClick={() => move(i, 1)}
                disabled={resolved || i === order.length - 1}
              >
                ▼
              </button>
            </span>
          </li>
        ))}
      </ol>
      <div className={`order-readout ${valid ? "ok" : "bad"}`}>
        Cacheable prefix:{" "}
        <strong>
          {prefixCount} of {order.length}
        </strong>{" "}
        blocks · {valid ? "✓ prefix is stable" : "✗ a change is breaking the prefix"}
      </div>
    </Shell>
  );
}

// ── Spot ───────────────────────────────────────────────────────────────
export function SpotEx({
  exercise,
  resolved,
  onResolved,
}: { exercise: SpotExercise } & Ctl) {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(false);
  const [passed, setPassed] = useState<boolean | null>(null);
  const culprits = new Set(
    exercise.lines.filter((l) => l.culprit).map((l) => l.id)
  );

  function toggle(id: string) {
    if (resolved) return;
    setSel((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    setWrong(false);
  }
  function check() {
    const ok =
      sel.size === culprits.size && [...sel].every((id) => culprits.has(id));
    if (ok) {
      setPassed(true);
      onResolved(true);
    } else setWrong(true);
  }
  function reveal() {
    setSel(new Set(culprits));
    setPassed(false);
    onResolved(false);
  }

  return (
    <Shell
      title={exercise.title}
      prompt={exercise.prompt}
      hint={exercise.hint}
      controls={
        resolved ? (
          <Verdict passed={passed ?? false} />
        ) : (
          <div className="ex-controls">
            {wrong && (
              <span className="ex-inline-wrong">
                Not quite — look again at which line fits.
              </span>
            )}
            <div className="ex-btn-row">
              <button className="btn-primary" onClick={check}>
                Check pick
              </button>
              <button className="btn-back" onClick={reveal}>
                Show answer
              </button>
            </div>
          </div>
        )
      }
    >
      <div className="spot-doc">
        {exercise.lines.map((l) => {
          const picked = sel.has(l.id);
          const cls = ["spot-line"];
          if (picked) cls.push("picked");
          if (resolved && l.culprit) cls.push("is-culprit");
          if (resolved && picked && !l.culprit) cls.push("mis-pick");
          return (
            <button
              key={l.id}
              className={cls.join(" ")}
              onClick={() => toggle(l.id)}
              disabled={resolved}
            >
              <span className="spot-mark">{picked ? "◉" : "○"}</span>
              <code>{l.text}</code>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}

// ── Categorize ─────────────────────────────────────────────────────────
export function CategorizeEx({
  exercise,
  resolved,
  onResolved,
}: { exercise: CategorizeExercise } & Ctl) {
  const [assign, setAssign] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState(false);
  const [passed, setPassed] = useState<boolean | null>(null);

  const allAssigned = exercise.items.every((it) => assign[it.id]);

  function set(itemId: string, bucketId: string) {
    if (resolved) return;
    setAssign((a) => ({ ...a, [itemId]: bucketId }));
    setWrong(false);
  }
  function check() {
    const ok = exercise.items.every((it) => assign[it.id] === it.bucket);
    if (ok) {
      setPassed(true);
      onResolved(true);
    } else setWrong(true);
  }
  function reveal() {
    const a: Record<string, string> = {};
    exercise.items.forEach((it) => (a[it.id] = it.bucket));
    setAssign(a);
    setPassed(false);
    onResolved(false);
  }

  return (
    <Shell
      title={exercise.title}
      prompt={exercise.prompt}
      hint={exercise.hint}
      controls={
        resolved ? (
          <Verdict passed={passed ?? false} />
        ) : (
          <div className="ex-controls">
            {wrong && (
              <span className="ex-inline-wrong">
                Some are in the wrong bucket — give it another look.
              </span>
            )}
            <div className="ex-btn-row">
              <button
                className="btn-primary"
                onClick={check}
                disabled={!allAssigned}
              >
                {allAssigned ? "Check sorting" : "Sort all items first"}
              </button>
              <button className="btn-back" onClick={reveal}>
                Show answer
              </button>
            </div>
          </div>
        )
      }
    >
      <div className="cat-list">
        {exercise.items.map((it) => {
          const chosen = assign[it.id];
          const correct = resolved && chosen === it.bucket;
          const incorrect = resolved && chosen && chosen !== it.bucket;
          return (
            <div
              key={it.id}
              className={`cat-item ${correct ? "correct" : ""} ${
                incorrect ? "incorrect" : ""
              }`}
            >
              <span className="cat-label">{it.label}</span>
              <span className="cat-buckets">
                {exercise.buckets.map((bk) => (
                  <button
                    key={bk.id}
                    className={`cat-pick ${chosen === bk.id ? "on" : ""}`}
                    onClick={() => set(it.id, bk.id)}
                    disabled={resolved}
                  >
                    {bk.label}
                  </button>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

// ── Calc ───────────────────────────────────────────────────────────────
// Relative cost model (base input = 1 unit/token):
//   no cache  = tokens × calls            (prefix re-sent every call)
//   cache     = tokens×1.25 (write once) + tokens×0.10×(calls−1) (cheap reads)
export function CalcEx({
  exercise,
  resolved,
  onResolved,
}: { exercise: CalcExercise } & Ctl) {
  const [tokens, setTokens] = useState(exercise.defaults.contextTokens);
  const [calls, setCalls] = useState(exercise.defaults.calls);
  const [passed, setPassed] = useState<boolean | null>(null);

  const noCache = tokens * calls;
  const cache = tokens * 1.25 + tokens * 0.1 * (calls - 1);
  const savings = noCache > 0 ? (1 - cache / noCache) * 100 : 0;
  const reached = savings >= exercise.targetSavingsPct;
  const fmt = (n: number) => `${(n / 1000).toFixed(1)}k`;

  function lockIn() {
    setPassed(true);
    onResolved(true);
  }
  function reveal() {
    setCalls(30);
    setPassed(false);
    onResolved(false);
  }

  return (
    <Shell
      title={exercise.title}
      prompt={exercise.prompt}
      hint={exercise.hint}
      controls={
        resolved ? (
          <Verdict passed={passed ?? false} />
        ) : (
          <div className="ex-controls">
            <div className="ex-btn-row">
              <button
                className="btn-primary"
                onClick={lockIn}
                disabled={!reached}
              >
                {reached
                  ? "Lock it in →"
                  : `Reach ${exercise.targetSavingsPct}% to continue`}
              </button>
              <button className="btn-back" onClick={reveal}>
                Show me
              </button>
            </div>
          </div>
        )
      }
    >
      <div className="calc">
        <label className="calc-row">
          <span className="calc-name">
            Stable context <em>{fmt(tokens)} tokens</em>
          </span>
          <input
            type="range"
            min={1000}
            max={40000}
            step={1000}
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
            disabled={resolved}
          />
        </label>
        <label className="calc-row">
          <span className="calc-name">
            Calls reusing it <em>{calls}</em>
          </span>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={calls}
            onChange={(e) => setCalls(Number(e.target.value))}
            disabled={resolved}
          />
        </label>

        <div className="calc-out">
          <div className="calc-cost">
            <span className="calc-cost-label">No caching</span>
            <span className="calc-cost-val bad">{fmt(noCache)} units</span>
          </div>
          <div className="calc-cost">
            <span className="calc-cost-label">With caching</span>
            <span className="calc-cost-val good">{fmt(cache)} units</span>
          </div>
        </div>

        <div className="calc-bar-wrap">
          <div className="calc-bar-track">
            <div
              className={`calc-bar-fill ${reached ? "hit" : ""}`}
              style={{ width: `${Math.max(0, Math.min(100, savings))}%` }}
            />
            <div
              className="calc-bar-target"
              style={{ left: `${exercise.targetSavingsPct}%` }}
              title={`target ${exercise.targetSavingsPct}%`}
            />
          </div>
          <div className={`calc-savings ${reached ? "hit" : ""}`}>
            {savings >= 0 ? "Saving " : "Costing "}
            <strong>{Math.abs(savings).toFixed(0)}%</strong>
            {savings < 0 ? " more" : ""} · target {exercise.targetSavingsPct}%
          </div>
        </div>
      </div>
    </Shell>
  );
}
