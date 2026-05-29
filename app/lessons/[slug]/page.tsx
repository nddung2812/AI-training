import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Game from "@/components/Game";
import { getLesson, lessons } from "@/lib/lessons";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson not found · DrawingHub Training" };
  return {
    title: `${lesson.title} · DrawingHub AI Training`,
    description: lesson.tagline,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Game lesson={lesson} />
    </main>
  );
}
