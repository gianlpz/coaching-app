import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/db";
import { notFound } from "next/navigation";
import { getCategory, getModule } from "@/lib/content";
import { getUserLessonProgress } from "@/lib/progress";
import { LessonCard } from "@/components/journey/LessonCard";
import Link from "next/link";

interface PageProps {
  params: Promise<{ category: string; module: string }>;
}

export default async function ModulePage({ params }: PageProps) {
  const { category: categorySlug, module: moduleSlug } = await params;
  const session = isDemoMode ? { user: { id: "demo-user" } } : await auth();
  const userId = session?.user?.id || "demo-user";

  const category = getCategory(categorySlug);
  if (!category) notFound();

  const mod = getModule(categorySlug, moduleSlug);
  if (!mod) notFound();

  const allProgress = await getUserLessonProgress(userId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/journey/${categorySlug}`}
          className="text-gray-500 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{mod.title}</h1>
          <p className="text-gray-500 text-sm">{mod.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        {mod.lessons.map((lesson) => {
          const progress = allProgress.find(
            (p) =>
              p.categorySlug === categorySlug &&
              p.moduleSlug === moduleSlug &&
              p.lessonSlug === lesson.slug
          );

          return (
            <LessonCard
              key={lesson.slug}
              categorySlug={categorySlug}
              moduleSlug={moduleSlug}
              slug={lesson.slug}
              title={lesson.title}
              description={lesson.description}
              estimatedMinutes={lesson.estimatedMinutes}
              completed={progress?.completed || false}
              currentStep={progress?.currentStep || 0}
            />
          );
        })}
      </div>
    </div>
  );
}
