"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lab } from "@/lib/labs";
import { getAdvancedLesson } from "@/lib/advanced";
import { saveProgress } from "@/lib/progress";
import { OrderEx, SpotEx, CategorizeEx, CalcEx } from "@/components/lab/exercises";

type Stage = "learn" | "practice" | "recap";

export default function LabView({ lab }: { lab: Lab }) {
  const [stage, setStage] = useState<Stage>("learn");
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<(boolean | undefined)[]>([]);

  const recap = getAdvancedLesson(lab.slug);
  const total = lab.exercises.length;
  const ex = lab.exercises[idx];
  const resolved = results[idx] !== undefined;
  const score = results.filter(Boolean).length;

  function resolveCurrent(passed: boolean) {
    setResults((r) => {
      const n = [...r];
      n[idx] = passed;
      return n;
    });
  }

  function next() {
    if (idx >= total - 1) {
      saveProgress(lab.slug, results.filter(Boolean).length, total);
      setStage("recap");
    } else {
      setIdx((i) => i + 1);
    }
  }

  function restart() {
    setResults([]);
    setIdx(0);
    setStage("learn");
  }

  const style = {
    "--accent-a": lab.accent[0],
    "--accent-b": lab.accent[1],
  } as React.CSSProperties;

  // ───── LEARN ─────
  if (stage === "learn") {
    return (
      <div className="lab" style={style}>
        <Link href="/?tab=advanced" className="back-link">
          ← Advanced track
        </Link>
        <div className="lab-eyebrow">Hands-on lab · {total} exercises</div>
        <div className="lab-hero">
          <span className="lab-hero-icon">{lab.icon}</span>
          <h1 className="lab-title">{lab.title}</h1>
        </div>
        <p className="lab-whatyoudo">{lab.whatYouDo}</p>

        <div className="lab-ideas">
          {lab.keyIdeas.map((k) => (
            <div key={k.term} className="lab-idea">
              <div className="lab-idea-term">{k.term}</div>
              <div className="lab-idea-point">{k.point}</div>
            </div>
          ))}
        </div>

        <button className="start-btn" onClick={() => setStage("practice")}>
          Start practicing →
        </button>
        <p className="lab-note">
          Four short exercises. You do the work; you get instant feedback on
          each.
        </p>
      </div>
    );
  }

  // ───── RECAP ─────
  if (stage === "recap") {
    const pct = Math.round((score / total) * 100);
    let verdict: string;
    if (pct === 100) verdict = "Clean sweep — you can run this for real now.";
    else if (pct >= 75) verdict = "Strong. The reps stuck.";
    else if (pct >= 50) verdict = "Good start — the recap below locks in the rest.";
    else verdict = "Worth another run — these click fast the second time.";

    return (
      <div className="lab" style={style}>
        <div className="results">
          <div className="big-score">
            {score} / {total}
          </div>
          <div className="verdict">{verdict}</div>

          <div className="results-block ideas-block">
            <h3>The habits you just practiced</h3>
            <ul className="action-list">
              {lab.keyIdeas.map((k) => (
                <li key={k.term}>
                  <strong>{k.term}.</strong> {k.point}
                </li>
              ))}
            </ul>
          </div>

          {recap?.actions && recap.actions.length > 0 && (
            <div className="results-block actions-block">
              <h3>Try these this week</h3>
              <ul className="action-list">
                {recap.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {recap?.sources && recap.sources.length > 0 && (
            <div className="results-block sources-block">
              <h3>Go deeper — reliable sources</h3>
              <ul className="source-list">
                {recap.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label} <span className="ext">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="results-actions">
            <button className="start-btn" onClick={restart}>
              Run it again →
            </button>
            <Link href="/?tab=advanced" className="btn-back">
              ← Advanced track
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ───── PRACTICE ─────
  const progress = (idx / total) * 100;
  return (
    <div className="lab" style={style}>
      <div className="q-topbar">
        <Link href="/?tab=advanced" className="q-close" aria-label="Advanced track">
          ✕
        </Link>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="q-xp">⚡ {score}</span>
      </div>

      {ex.kind === "order" && (
        <OrderEx exercise={ex} resolved={resolved} onResolved={resolveCurrent} />
      )}
      {ex.kind === "spot" && (
        <SpotEx exercise={ex} resolved={resolved} onResolved={resolveCurrent} />
      )}
      {ex.kind === "categorize" && (
        <CategorizeEx
          exercise={ex}
          resolved={resolved}
          onResolved={resolveCurrent}
        />
      )}
      {ex.kind === "calc" && (
        <CalcEx exercise={ex} resolved={resolved} onResolved={resolveCurrent} />
      )}

      {resolved && (
        <div className="ex-explain">
          <div className="ex-explain-label">Why this matters</div>
          <p>{ex.explanation}</p>
        </div>
      )}

      <div className="nav-row">
        <span />
        {resolved && (
          <button className="btn-primary" onClick={next}>
            {idx === total - 1 ? "See recap →" : "Next exercise →"}
          </button>
        )}
      </div>
    </div>
  );
}
