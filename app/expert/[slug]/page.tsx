import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LabView from "@/components/Lab";
import { getLab, labs } from "@/lib/labs";
import { getAdvancedLesson } from "@/lib/advanced";

export function generateStaticParams() {
  return labs.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) return { title: "Lab not found · DrawingHub Training" };
  const meta = getAdvancedLesson(slug);
  return {
    title: `${lab.title} (Lab) · DrawingHub AI Training`,
    description: meta?.tagline ?? lab.whatYouDo,
  };
}

export default async function ExpertPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <LabView lab={lab} />
    </main>
  );
}
