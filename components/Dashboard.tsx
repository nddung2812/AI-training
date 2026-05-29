"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lessons } from "@/lib/lessons";
import { loadProgress, type ProgressMap } from "@/lib/progress";

export default function Dashboard() {
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const completed = lessons.filter((l) => progress[l.slug]).length;
  const totalScenarios = lessons.reduce(
    (sum, l) => sum + l.scenarios.length,
    0
  );

  return (
    <div className="dashboard">
      <header className="dash-header">
        <Image
          src="/logo.png"
          alt="Square Drawing Co."
          width={72}
          height={72}
          className="dash-logo"
          priority
        />
        <div className="dash-brand">DRAWINGHUB · AI TRAINING</div>
        <h1 className="dash-title">Square Drawing Co. Academy</h1>
        <p className="dash-sub">
          Bite-sized, playful lessons that turn AI buzzwords into things you can
          actually use at work. Pick a lesson and play — about five minutes each.
        </p>
        <div className="dash-stats">
          <div className="stat">
            <span className="stat-num">{lessons.length}</span>
            <span className="stat-label">Lessons</span>
          </div>
          <div className="stat">
            <span className="stat-num">{totalScenarios}</span>
            <span className="stat-label">Scenarios</span>
          </div>
          <div className="stat">
            <span className="stat-num">
              {completed}/{lessons.length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </header>

      <div className="lesson-grid">
        {lessons.map((lesson) => {
          const result = progress[lesson.slug];
          const done = Boolean(result);
          const perfect = result && result.score === result.total;
          return (
            <Link
              key={lesson.slug}
              href={`/lessons/${lesson.slug}`}
              className="lesson-card"
              style={
                {
                  "--accent-a": lesson.accent[0],
                  "--accent-b": lesson.accent[1],
                } as React.CSSProperties
              }
            >
              <div className="card-top">
                <span className="card-icon">{lesson.icon}</span>
                <span className="card-order">{lesson.order}</span>
              </div>

              <h2 className="card-title">{lesson.title}</h2>
              <p className="card-tagline">{lesson.tagline}</p>

              <div className="card-topics">
                {lesson.topics.map((t) => (
                  <span key={t} className="topic-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="card-footer">
                <div className="card-meta">
                  <span>{lesson.level}</span>
                  <span className="dot">·</span>
                  <span>{lesson.durationMin} min</span>
                  <span className="dot">·</span>
                  <span>{lesson.scenarios.length} scenarios</span>
                </div>
                {done ? (
                  <span className={`card-badge ${perfect ? "perfect" : ""}`}>
                    {perfect ? "★ " : "✓ "}
                    Best {result!.score}/{result!.total}
                  </span>
                ) : (
                  <span className="card-badge new">Not started</span>
                )}
              </div>

              <div className="card-cta">
                {done ? "Replay lesson" : "Start lesson"} →
              </div>
            </Link>
          );
        })}

        <div className="lesson-card coming-soon">
          <div className="card-top">
            <span className="card-icon">✨</span>
          </div>
          <h2 className="card-title">More lessons coming</h2>
          <p className="card-tagline">
            New playful lessons get added here as the team learns. Have a topic
            you want covered? Suggest it.
          </p>
        </div>
      </div>
    </div>
  );
}
