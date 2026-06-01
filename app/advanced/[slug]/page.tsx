import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Game from "@/components/Game";
import { getAdvancedLesson, advancedLessons } from "@/lib/advanced";

export function generateStaticParams() {
  return advancedLessons.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getAdvancedLesson(slug);
  if (!topic) return { title: "Topic not found · DrawingHub Training" };
  return {
    title: `${topic.title} · DrawingHub AI Training`,
    description: topic.tagline,
  };
}

export default async function AdvancedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getAdvancedLesson(slug);
  if (!topic) notFound();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Game
        lesson={topic}
        backHref="/?tab=advanced"
        backLabel="Advanced track"
        kicker="Playbook"
      />
    </main>
  );
}
