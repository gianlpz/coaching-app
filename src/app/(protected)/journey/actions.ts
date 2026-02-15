"use server";

import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/db";
import {
  setLessonStepProgress,
  completeLessonProgress,
} from "@/lib/progress";
import { updateStreak, awardBadge } from "@/lib/streaks";
import { saveJournalEntry } from "@/lib/journal";
import { revalidatePath } from "next/cache";

async function getAuthUserId(): Promise<string> {
  if (isDemoMode) return "demo-user";
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return session.user.id;
}

export async function advanceLessonStep(
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string,
  step: number
) {
  const userId = await getAuthUserId();
  await setLessonStepProgress(userId, categorySlug, moduleSlug, lessonSlug, step);
}

export async function completeLesson(
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string
) {
  const userId = await getAuthUserId();
  await completeLessonProgress(userId, categorySlug, moduleSlug, lessonSlug);
  await updateStreak(userId);

  // Award first-lesson badge
  await awardBadge(userId, "first-lesson", "First Lesson");

  revalidatePath("/dashboard");
  revalidatePath("/journey");
  revalidatePath("/progress");
}

export async function saveReflection(
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string,
  promptText: string,
  responseText: string
) {
  const userId = await getAuthUserId();
  await saveJournalEntry(
    userId,
    categorySlug,
    moduleSlug,
    lessonSlug,
    promptText,
    responseText
  );
}

export async function saveCommitment(
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string,
  commitment: string
) {
  const userId = await getAuthUserId();
  await saveJournalEntry(
    userId,
    categorySlug,
    moduleSlug,
    lessonSlug,
    "My commitment",
    commitment
  );
}

export async function saveExerciseResult(
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string,
  exerciseType: string,
  result: string
) {
  const userId = await getAuthUserId();
  await saveJournalEntry(
    userId,
    categorySlug,
    moduleSlug,
    lessonSlug,
    `Exercise result (${exerciseType})`,
    result
  );
}
