// Lightweight client-side progress tracking via localStorage.
// Stores the best score per lesson so the dashboard can show badges.

const KEY = "drawinghub-training-progress";

export type LessonResult = { score: number; total: number };
export type ProgressMap = Record<string, LessonResult>;

export function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function saveProgress(slug: string, score: number, total: number): void {
  if (typeof window === "undefined") return;
  try {
    const map = loadProgress();
    const prev = map[slug];
    // Keep the best score the learner has achieved.
    if (!prev || score > prev.score) {
      map[slug] = { score, total };
      window.localStorage.setItem(KEY, JSON.stringify(map));
    }
  } catch {
    // Ignore storage failures (private mode, etc.) — progress is non-critical.
  }
}
