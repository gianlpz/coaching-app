"use server";

import { db, isDemoMode } from "./db";
import { lessonProgress } from "./schema";
import { eq, and } from "drizzle-orm";

export async function getUserLessonProgress(userId: string) {
  if (isDemoMode || !db) return [];
  return db.query.lessonProgress.findMany({
    where: eq(lessonProgress.userId, userId),
  });
}

export async function getLessonProgressRecord(
  userId: string,
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string
) {
  if (isDemoMode || !db) return null;
  return db.query.lessonProgress.findFirst({
    where: and(
      eq(lessonProgress.userId, userId),
      eq(lessonProgress.categorySlug, categorySlug),
      eq(lessonProgress.moduleSlug, moduleSlug),
      eq(lessonProgress.lessonSlug, lessonSlug)
    ),
  });
}

export async function getCategoryProgress(
  userId: string,
  categorySlug: string
) {
  if (isDemoMode || !db) return { completed: 0, total: 0 };
  const records = await db.query.lessonProgress.findMany({
    where: and(
      eq(lessonProgress.userId, userId),
      eq(lessonProgress.categorySlug, categorySlug)
    ),
  });
  const completed = records.filter((r) => r.completed).length;
  const total = records.length;
  return { completed, total };
}

export async function getModuleProgress(
  userId: string,
  categorySlug: string,
  moduleSlug: string
) {
  if (isDemoMode || !db) return { completed: 0, total: 0 };
  const records = await db.query.lessonProgress.findMany({
    where: and(
      eq(lessonProgress.userId, userId),
      eq(lessonProgress.categorySlug, categorySlug),
      eq(lessonProgress.moduleSlug, moduleSlug)
    ),
  });
  const completed = records.filter((r) => r.completed).length;
  const total = records.length;
  return { completed, total };
}

export async function setLessonStepProgress(
  userId: string,
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string,
  step: number
) {
  if (isDemoMode || !db) return;
  const existing = await getLessonProgressRecord(
    userId,
    categorySlug,
    moduleSlug,
    lessonSlug
  );

  if (existing) {
    await db
      .update(lessonProgress)
      .set({ currentStep: step, updatedAt: new Date() })
      .where(
        and(
          eq(lessonProgress.userId, userId),
          eq(lessonProgress.categorySlug, categorySlug),
          eq(lessonProgress.moduleSlug, moduleSlug),
          eq(lessonProgress.lessonSlug, lessonSlug)
        )
      );
  } else {
    await db.insert(lessonProgress).values({
      userId,
      categorySlug,
      moduleSlug,
      lessonSlug,
      currentStep: step,
    });
  }
}

export async function completeLessonProgress(
  userId: string,
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string
) {
  if (isDemoMode || !db) return;
  const existing = await getLessonProgressRecord(
    userId,
    categorySlug,
    moduleSlug,
    lessonSlug
  );

  if (existing) {
    await db
      .update(lessonProgress)
      .set({
        completed: true,
        completedAt: new Date(),
        currentStep: 4,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(lessonProgress.userId, userId),
          eq(lessonProgress.categorySlug, categorySlug),
          eq(lessonProgress.moduleSlug, moduleSlug),
          eq(lessonProgress.lessonSlug, lessonSlug)
        )
      );
  } else {
    await db.insert(lessonProgress).values({
      userId,
      categorySlug,
      moduleSlug,
      lessonSlug,
      currentStep: 4,
      completed: true,
      completedAt: new Date(),
    });
  }
}
