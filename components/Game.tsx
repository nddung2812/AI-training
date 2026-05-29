"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/lessons";
import { saveProgress } from "@/lib/progress";

type Phase = "intro" | "playing" | "results";

export default function Game({ lesson }: { lesson: Lesson }) {
  const { scenarios, glossary } = lesson;
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);

  function start() {
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setPhase("playing");
  }

  function answer(i: number) {
    if (answers[current] !== undefined) return;
    const s = scenarios[current];
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
    if (s.options[i].correct) setScore((prev) => prev + 1);
  }

  function nextQ() {
    if (current >= scenarios.length - 1) {
      saveProgress(lesson.slug, score, scenarios.length);
      setPhase("results");
    } else {
      setCurrent((c) => c + 1);
    }
  }

  function backQ() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  // ───── INTRO ─────
  if (phase === "intro") {
    return (
      <div className="game">
        <Link href="/" className="back-link">
          ← All lessons
        </Link>
        <div>
          <div className="intro-eyebrow">
            Lesson {lesson.order} · {lesson.level} · {lesson.durationMin} min
          </div>
          <h1 className="intro-title">{lesson.title}</h1>
          <p className="intro-tagline">{lesson.introTagline}</p>
          <div className="intro-desc">
            {lesson.introParagraph}
            <br />
            <br />
            By the end you&apos;ll understand:{" "}
            <strong>{lesson.learnList}</strong> — explained the way you&apos;d
            explain them to a coworker, not a computer scientist.
          </div>
          <button className="start-btn" onClick={start}>
            Start the game →
          </button>
        </div>
      </div>
    );
  }

  // ───── RESULTS ─────
  if (phase === "results") {
    const pct = Math.round((score / scenarios.length) * 100);
    let verdict: string;
    if (pct === 100) verdict = "Perfect run. You speak fluent AI now.";
    else if (pct >= 80)
      verdict = "Strong. You've got the core mental model down.";
    else if (pct >= 60)
      verdict = "Solid foundation. Glossary below covers anything you missed.";
    else verdict = "Worth a second play — these concepts click fast on review.";

    return (
      <div className="game">
        <div className="results">
          <div className="big-score">
            {score} / {scenarios.length}
          </div>
          <div className="verdict">{verdict}</div>
          <div className="glossary">
            <h3>Glossary — keep this handy</h3>
            {glossary.map((g) => (
              <div key={g.term} className="glossary-item">
                <strong>{g.term}:</strong> {g.meaning}
              </div>
            ))}
          </div>
          <div className="results-actions">
            <button className="start-btn" onClick={start}>
              Play again →
            </button>
            <Link href="/" className="btn-back">
              ← All lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ───── PLAYING ─────
  const s = scenarios[current];
  const alreadyAnswered = answers[current] !== undefined;
  const chosen = answers[current];
  const progress = (current / scenarios.length) * 100;

  return (
    <div className="game">
      <div className="game-header">
        <Link href="/" className="logo logo-link">
          ← {lesson.title.toUpperCase()}
        </Link>
        <div className="score-label">
          Question {current + 1} of {scenarios.length} · Score {score}
        </div>
      </div>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div dangerouslySetInnerHTML={{ __html: s.animation }} />

      <p className="scenario">{s.story}</p>
      <h2 className="game-q">{s.question}</h2>

      <div className="options">
        {s.options.map((opt, i) => {
          const classes = ["option"];
          if (alreadyAnswered) {
            classes.push("disabled");
            if (opt.correct) classes.push("correct");
            else if (i === chosen) classes.push("wrong");
          }
          return (
            <button
              key={i}
              className={classes.join(" ")}
              onClick={() => answer(i)}
              disabled={alreadyAnswered}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {alreadyAnswered && (
        <div className="feedback">
          <div className="label">What this teaches</div>
          <div className="concept">{s.concept}</div>
          <div>{s.explanation}</div>
        </div>
      )}

      <div className="nav-row">
        {current > 0 ? (
          <button className="btn-back" onClick={backQ}>
            ← Back
          </button>
        ) : (
          <span />
        )}
        {alreadyAnswered && (
          <button className="btn-primary" onClick={nextQ}>
            {current === scenarios.length - 1
              ? "See results →"
              : "Next question →"}
          </button>
        )}
      </div>
    </div>
  );
}
