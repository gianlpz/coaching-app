"use server";

import { db, isDemoMode } from "./db";
import { journalEntries } from "./schema";
import { eq, and, desc } from "drizzle-orm";

export async function saveJournalEntry(
  userId: string,
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string,
  promptText: string,
  responseText: string
) {
  if (isDemoMode || !db) return;
  await db.insert(journalEntries).values({
    userId,
    categorySlug,
    moduleSlug,
    lessonSlug,
    promptText,
    responseText,
  });
}

export async function getJournalEntries(userId: string) {
  if (isDemoMode || !db) return [];
  return db.query.journalEntries.findMany({
    where: eq(journalEntries.userId, userId),
    orderBy: desc(journalEntries.createdAt),
  });
}

export async function getJournalEntriesForCategory(
  userId: string,
  categorySlug: string
) {
  if (isDemoMode || !db) return [];
  return db.query.journalEntries.findMany({
    where: and(
      eq(journalEntries.userId, userId),
      eq(journalEntries.categorySlug, categorySlug)
    ),
    orderBy: desc(journalEntries.createdAt),
  });
}

export async function getJournalEntryForLesson(
  userId: string,
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string
) {
  if (isDemoMode || !db) return [];
  return db.query.journalEntries.findMany({
    where: and(
      eq(journalEntries.userId, userId),
      eq(journalEntries.categorySlug, categorySlug),
      eq(journalEntries.moduleSlug, moduleSlug),
      eq(journalEntries.lessonSlug, lessonSlug)
    ),
    orderBy: desc(journalEntries.createdAt),
  });
}
