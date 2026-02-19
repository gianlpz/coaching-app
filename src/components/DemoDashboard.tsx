"use client";

import Link from "next/link";
import { useDemoContext } from "@/components/DemoDataProvider";
import { StreakCounter } from "@/components/ui/StreakCounter";
import { CategoryCard } from "@/components/journey/CategoryCard";
import { Card } from "@/components/ui/Card";

interface CategoryInfo {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
  modules: {
    slug: string;
    lessons: { slug: string; title: string }[];
  }[];
}

export function DemoDashboard({ categories }: { categories: CategoryInfo[] }) {
  const demoData = useDemoContext();
  const progress = demoData?.data?.lessonProgress ?? [];
  const streak = demoData?.data?.streak ?? { currentStreak: 0 };

  // Find next incomplete lesson
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
        const done = progress.find(
          (p) =>
            p.categorySlug === category.slug &&
            p.moduleSlug === mod.slug &&
            p.lessonSlug === lesson.slug
        );
        if (!done?.completed) {
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

  const categoryProgress = categories.map((cat) => {
    const completedLessons = progress.filter(
      (p) => p.categorySlug === cat.slug && p.completed
    ).length;
    return { ...cat, completedLessons };
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
