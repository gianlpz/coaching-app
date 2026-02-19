"use client";

import { useState, useEffect, useCallback } from "react";
import {
  loadDemoData,
  saveDemoData,
  type DemoData,
  type DemoLessonProgress,
} from "@/lib/demo-storage";

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

function yesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function useDemoData(enabled: boolean) {
  const [data, setData] = useState<DemoData | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (!enabled) return;
    setData(loadDemoData());
    setIsHydrated(true);
  }, [enabled]);

  // Persist whenever data changes (after hydration)
  useEffect(() => {
    if (!enabled || !isHydrated || !data) return;
    saveDemoData(data);
  }, [data, enabled, isHydrated]);

  const setLessonStep = useCallback(
    (categorySlug: string, moduleSlug: string, lessonSlug: string, step: number) => {
      setData((prev) => {
        if (!prev) return prev;
        const progress = [...prev.lessonProgress];
        const idx = progress.findIndex(
          (p) =>
            p.categorySlug === categorySlug &&
            p.moduleSlug === moduleSlug &&
            p.lessonSlug === lessonSlug
        );
        const entry: DemoLessonProgress = {
          categorySlug,
          moduleSlug,
          lessonSlug,
          currentStep: step,
          completed: false,
          completedAt: null,
        };
        if (idx >= 0) {
          progress[idx] = { ...progress[idx], currentStep: step };
        } else {
          progress.push(entry);
        }
        return { ...prev, lessonProgress: progress };
      });
    },
    []
  );

  const completeLessonDemo = useCallback(
    (categorySlug: string, moduleSlug: string, lessonSlug: string) => {
      setData((prev) => {
        if (!prev) return prev;
        const progress = [...prev.lessonProgress];
        const idx = progress.findIndex(
          (p) =>
            p.categorySlug === categorySlug &&
            p.moduleSlug === moduleSlug &&
            p.lessonSlug === lessonSlug
        );
        const entry: DemoLessonProgress = {
          categorySlug,
          moduleSlug,
          lessonSlug,
          currentStep: 4,
          completed: true,
          completedAt: new Date().toISOString(),
        };
        if (idx >= 0) {
          progress[idx] = entry;
        } else {
          progress.push(entry);
        }
        return { ...prev, lessonProgress: progress };
      });
    },
    []
  );

  const updateStreakDemo = useCallback(() => {
    setData((prev) => {
      if (!prev) return prev;
      const today = todayString();
      const yesterday = yesterdayString();
      const { streak } = prev;

      if (streak.lastActivityDate === today) return prev;

      let newStreak: number;
      if (streak.lastActivityDate === yesterday) {
        newStreak = streak.currentStreak + 1;
      } else {
        newStreak = 1;
      }
      const newLongest = Math.max(newStreak, streak.longestStreak);

      return {
        ...prev,
        streak: {
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastActivityDate: today,
        },
      };
    });
  }, []);

  const awardBadgeDemo = useCallback((badgeType: string, badgeLabel: string) => {
    setData((prev) => {
      if (!prev) return prev;
      if (prev.badges.some((b) => b.badgeType === badgeType)) return prev;
      return {
        ...prev,
        badges: [
          ...prev.badges,
          {
            id: crypto.randomUUID(),
            badgeType,
            badgeLabel,
            earnedAt: new Date().toISOString(),
          },
        ],
      };
    });
  }, []);

  const saveJournalEntryDemo = useCallback(
    (
      categorySlug: string,
      moduleSlug: string,
      lessonSlug: string,
      promptText: string,
      responseText: string
    ) => {
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          journalEntries: [
            {
              id: crypto.randomUUID(),
              categorySlug,
              moduleSlug,
              lessonSlug,
              promptText,
              responseText,
              createdAt: new Date().toISOString(),
            },
            ...prev.journalEntries,
          ],
        };
      });
    },
    []
  );

  const getLessonStep = useCallback(
    (categorySlug: string, moduleSlug: string, lessonSlug: string): number => {
      if (!data) return 0;
      const record = data.lessonProgress.find(
        (p) =>
          p.categorySlug === categorySlug &&
          p.moduleSlug === moduleSlug &&
          p.lessonSlug === lessonSlug
      );
      if (!record) return 0;
      return record.completed ? 0 : record.currentStep;
    },
    [data]
  );

  if (!enabled) return null;

  return {
    data,
    isHydrated,
    setLessonStep,
    completeLesson: completeLessonDemo,
    updateStreak: updateStreakDemo,
    awardBadge: awardBadgeDemo,
    saveJournalEntry: saveJournalEntryDemo,
    getLessonStep,
  };
}
