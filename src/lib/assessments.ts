"use server";

import { db, isDemoMode } from "./db";
import { assessmentResponses } from "./schema";
import { eq, and, desc } from "drizzle-orm";

export async function saveAssessmentResponse(
  userId: string,
  assessmentSlug: string,
  responses: Record<string, number>,
  scores: Record<string, number>
) {
  if (isDemoMode || !db) return;
  await db.insert(assessmentResponses).values({
    userId,
    assessmentSlug,
    responses,
    scores,
  });
}

export async function getAssessmentHistory(
  userId: string,
  assessmentSlug: string
) {
  if (isDemoMode || !db) return [];
  return db.query.assessmentResponses.findMany({
    where: and(
      eq(assessmentResponses.userId, userId),
      eq(assessmentResponses.assessmentSlug, assessmentSlug)
    ),
    orderBy: desc(assessmentResponses.createdAt),
  });
}

export async function getLatestAssessment(
  userId: string,
  assessmentSlug: string
) {
  if (isDemoMode || !db) return null;
  return db.query.assessmentResponses.findFirst({
    where: and(
      eq(assessmentResponses.userId, userId),
      eq(assessmentResponses.assessmentSlug, assessmentSlug)
    ),
    orderBy: desc(assessmentResponses.createdAt),
  });
}
