"use server";

import { db, isDemoMode } from "./db";
import { streaks, badges } from "./schema";
import { eq } from "drizzle-orm";

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

function yesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export async function getStreak(userId: string) {
  if (isDemoMode || !db) return { currentStreak: 0, longestStreak: 0, lastActivityDate: null };
  const streak = await db.query.streaks.findFirst({
    where: eq(streaks.userId, userId),
  });
  return streak || { currentStreak: 0, longestStreak: 0, lastActivityDate: null };
}

export async function updateStreak(userId: string) {
  if (isDemoMode || !db) return { currentStreak: 0, longestStreak: 0 };
  const today = todayString();
  const yesterday = yesterdayString();

  const existing = await db.query.streaks.findFirst({
    where: eq(streaks.userId, userId),
  });

  if (!existing) {
    await db.insert(streaks).values({
      userId,
      currentStreak: 1,
      longestStreak: 1,
      lastActivityDate: today,
    });
    return { currentStreak: 1, longestStreak: 1 };
  }

  if (existing.lastActivityDate === today) {
    return {
      currentStreak: existing.currentStreak,
      longestStreak: existing.longestStreak,
    };
  }

  let newStreak: number;
  if (existing.lastActivityDate === yesterday) {
    newStreak = existing.currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const newLongest = Math.max(newStreak, existing.longestStreak);

  await db
    .update(streaks)
    .set({
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActivityDate: today,
    })
    .where(eq(streaks.userId, userId));

  await checkAndAwardBadges(userId, newStreak);

  return { currentStreak: newStreak, longestStreak: newLongest };
}

export async function checkAndAwardBadges(userId: string, currentStreak?: number) {
  if (isDemoMode || !db) return;
  const userBadges = await db.query.badges.findMany({
    where: eq(badges.userId, userId),
  });

  const earnedTypes = new Set(userBadges.map((b) => b.badgeType));

  const streakBadges = [
    { streak: 7, type: "streak-7", label: "7-Day Streak" },
    { streak: 14, type: "streak-14", label: "14-Day Streak" },
    { streak: 30, type: "streak-30", label: "30-Day Streak" },
  ];

  if (currentStreak) {
    for (const badge of streakBadges) {
      if (currentStreak >= badge.streak && !earnedTypes.has(badge.type)) {
        await db.insert(badges).values({
          userId,
          badgeType: badge.type,
          badgeLabel: badge.label,
        });
      }
    }
  }
}

export async function awardBadge(
  userId: string,
  badgeType: string,
  badgeLabel: string
) {
  if (isDemoMode || !db) return;
  const existing = await db.query.badges.findMany({
    where: eq(badges.userId, userId),
  });

  if (existing.some((b) => b.badgeType === badgeType)) return;
  await db.insert(badges).values({ userId, badgeType, badgeLabel });
}

export async function getUserBadges(userId: string) {
  if (isDemoMode || !db) return [];
  return db.query.badges.findMany({
    where: eq(badges.userId, userId),
  });
}
