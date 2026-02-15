import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/db";
import { notFound } from "next/navigation";
import { getLesson, getNextLesson } from "@/lib/content";
import { getLessonProgressRecord } from "@/lib/progress";
import { LessonStepView } from "@/components/lesson/LessonStepView";

interface PageProps {
  params: Promise<{ category: string; module: string; lesson: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const {
    category: categorySlug,
    module: moduleSlug,
    lesson: lessonSlug,
  } = await params;

  const session = isDemoMode ? { user: { id: "demo-user" } } : await auth();
  const userId = session?.user?.id || "demo-user";

  const lesson = getLesson(categorySlug, moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const progress = await getLessonProgressRecord(
    userId,
    categorySlug,
    moduleSlug,
    lessonSlug
  );

  const next = getNextLesson(categorySlug, moduleSlug, lessonSlug);
  const nextLessonUrl = next
    ? `/journey/${next.category}/${next.module}/${next.lesson}`
    : null;

  const initialStep = progress?.completed ? 0 : (progress?.currentStep || 0);

  return (
    <div className="pb-4">
      <LessonStepView
        lesson={lesson}
        categorySlug={categorySlug}
        moduleSlug={moduleSlug}
        initialStep={initialStep}
        nextLessonUrl={nextLessonUrl}
      />
    </div>
  );
}
