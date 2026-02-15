"use server";

import { auth } from "@/lib/auth";
import { db, isDemoMode } from "@/lib/db";
import { userProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { saveAssessmentResponse } from "@/lib/assessments";

async function getAuthUserId(): Promise<string> {
  if (isDemoMode) return "demo-user";
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return session.user.id;
}

export async function saveSelectedCategories(categories: string[]) {
  if (isDemoMode || !db) return;
  const userId = await getAuthUserId();

  const existing = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, userId),
  });

  if (existing) {
    await db
      .update(userProfiles)
      .set({ selectedCategories: categories, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId));
  } else {
    await db.insert(userProfiles).values({
      userId,
      selectedCategories: categories,
    });
  }
}

export async function saveLifeSatisfactionAssessment(
  scores: Record<string, number>
) {
  if (isDemoMode || !db) return;
  const userId = await getAuthUserId();
  await saveAssessmentResponse(
    userId,
    "life-satisfaction-wheel",
    scores,
    scores
  );
}

export async function completeOnboarding() {
  if (isDemoMode || !db) return;
  const userId = await getAuthUserId();

  const existing = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, userId),
  });

  if (existing) {
    await db
      .update(userProfiles)
      .set({ onboardingCompleted: true, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId));
  } else {
    await db.insert(userProfiles).values({
      userId,
      onboardingCompleted: true,
    });
  }
}
