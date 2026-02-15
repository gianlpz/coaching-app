import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/db";
import { getCategories } from "@/lib/content";
import { getUserLessonProgress } from "@/lib/progress";
import { getStreak } from "@/lib/streaks";
import { StreakCounter } from "@/components/ui/StreakCounter";
import { CategoryCard } from "@/components/journey/CategoryCard";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function DashboardPage() {
  const session = isDemoMode ? { user: { id: "demo-user" } } : await auth();
  const userId = session?.user?.id || "demo-user";

  const [categories, allProgress, streak] = await Promise.all([
    getCategories(),
    getUserLessonProgress(userId),
    getStreak(userId),
  ]);

  // Find the next incomplete lesson across all categories
  let nextLesson: {
    category: string;
    module: string;
    lesson: string;
    lessonTitle: string;
    categoryTitle: string;
  } | null = null;

  for (const category of categories) {
    for (const mod of category.modules) {
      for (const lesson of mod.lessons) {
        const progress = allProgress.find(
          (p) =>
            p.categorySlug === category.slug &&
            p.moduleSlug === mod.slug &&
            p.lessonSlug === lesson.slug
        );
        if (!progress?.completed) {
          nextLesson = {
            category: category.slug,
            module: mod.slug,
            lesson: lesson.slug,
            lessonTitle: lesson.title,
            categoryTitle: category.title,
          };
          break;
        }
      }
      if (nextLesson) break;
    }
    if (nextLesson) break;
  }

  // Count completed lessons per category
  const categoryProgress = categories.map((cat) => {
    const totalLessons = cat.modules.reduce(
      (sum, mod) => sum + mod.lessons.length,
      0
    );
    const completedLessons = allProgress.filter(
      (p) => p.categorySlug === cat.slug && p.completed
    ).length;
    return { ...cat, totalLessons, completedLessons };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">Your Journey</h1>
          <p className="text-stone-500 mt-0.5">Keep going, you&apos;re doing great</p>
        </div>
        <StreakCounter count={streak.currentStreak} />
      </div>

      {nextLesson && (
        <Link href={`/journey/${nextLesson.category}/${nextLesson.module}/${nextLesson.lesson}`}>
          <Card className="bg-gradient-to-br from-[#8B7355] to-[#6B5D4A] border-none text-white">
            <p className="text-[#E5D9C8] text-sm font-medium">
              Continue your journey
            </p>
            <h2 className="text-lg font-bold mt-1">{nextLesson.lessonTitle}</h2>
            <p className="text-[#E5D9C8] text-sm mt-1">
              {nextLesson.categoryTitle}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 text-sm font-medium">
              Start lesson
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Card>
        </Link>
      )}

      <div>
        <h2 className="text-lg font-semibold text-stone-900 mb-3">
          Your Categories
        </h2>
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {categoryProgress.map((cat) => (
            <CategoryCard
              key={cat.slug}
              slug={cat.slug}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
              color={cat.color}
              completedLessons={cat.completedLessons}
              totalLessons={cat.totalLessons}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
