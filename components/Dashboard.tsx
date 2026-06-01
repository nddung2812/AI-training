"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lessons } from "@/lib/lessons";
import { advancedLessons } from "@/lib/advanced";
import { hasLab } from "@/lib/labs";
import { loadProgress, type ProgressMap } from "@/lib/progress";

type Tab = "lessons" | "advanced";

export default function Dashboard() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [tab, setTab] = useState<Tab>("lessons");

  useEffect(() => {
    setProgress(loadProgress());
    // Let a ?tab=advanced link (e.g. the back-link from a playbook) land here.
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") === "advanced") setTab("advanced");
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
          src="/drawinghub-logo.png"
          alt="DrawingHub"
          width={84}
          height={84}
          className="dash-logo"
          priority
        />
        <div className="dash-brand">DrawingHub · AI Training</div>
        <h1 className="dash-title">DrawingHub AI Academy</h1>
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

      <div className="dash-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "lessons"}
          className={`dash-tab ${tab === "lessons" ? "active" : ""}`}
          onClick={() => setTab("lessons")}
        >
          Basic
          <span className="dash-tab-count">{lessons.length}</span>
        </button>
        <button
          role="tab"
          aria-selected={tab === "advanced"}
          className={`dash-tab ${tab === "advanced" ? "active" : ""}`}
          onClick={() => setTab("advanced")}
        >
          Advanced
          <span className="dash-tab-count">{advancedLessons.length}</span>
        </button>
      </div>

      {tab === "lessons" ? (
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
                {lesson.recommended && (
                  <span className="card-recommended">★ Recommended</span>
                )}

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
      ) : (
        <>
          <p className="dash-tab-intro">
            Past the basics? Topics marked{" "}
            <span className="inline-lab">🧪 Hands-on lab</span> drop you straight
            into doing the work — ordering a real prompt, hunting a cache-buster,
            dialing in the savings — with instant feedback. The rest are quick
            concept playbooks while their labs get built.
          </p>
          <div className="lesson-grid">
            {advancedLessons.map((topic) => {
              const result = progress[topic.slug];
              const done = Boolean(result);
              const perfect = result && result.score === result.total;
              const lab = hasLab(topic.slug);
              const exerciseCount = result?.total;
              return (
                <Link
                  key={topic.slug}
                  href={`/advanced/${topic.slug}`}
                  className="lesson-card advanced-card"
                  style={
                    {
                      "--accent-a": topic.accent[0],
                      "--accent-b": topic.accent[1],
                    } as React.CSSProperties
                  }
                >
                  {lab && (
                    <span className="card-lab">🧪 Hands-on lab</span>
                  )}

                  <div className="card-top">
                    <span className="card-icon">{topic.icon}</span>
                    <span className="card-order">{topic.order}</span>
                  </div>

                  <h2 className="card-title">{topic.title}</h2>
                  <p className="card-tagline">{topic.tagline}</p>

                  <div className="card-topics">
                    {topic.topics.map((t) => (
                      <span key={t} className="topic-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <div className="card-meta">
                      <span>{topic.level}</span>
                      <span className="dot">·</span>
                      {lab ? (
                        <span>
                          {exerciseCount ?? 4} exercises
                        </span>
                      ) : (
                        <>
                          <span>{topic.durationMin} min</span>
                          <span className="dot">·</span>
                          <span>{topic.scenarios.length} scenarios</span>
                        </>
                      )}
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
                    {lab
                      ? done
                        ? "Replay lab"
                        : "Start lab"
                      : done
                        ? "Replay playbook"
                        : "Play playbook"}{" "}
                    →
                  </div>
                </Link>
              );
            })}

            <div className="lesson-card coming-soon">
              <div className="card-top">
                <span className="card-icon">✨</span>
              </div>
              <h2 className="card-title">More playbooks coming</h2>
              <p className="card-tagline">
                Evals, sub-agent orchestration, MCP connectors and more land here
                as the studio levels up. Got an advanced topic in mind? Suggest
                it.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
