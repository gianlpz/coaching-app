// localStorage persistence for demo mode
// Stores all demo data under a single key, SSR-safe

const STORAGE_KEY = "coaching-app-demo";

export interface DemoLessonProgress {
  categorySlug: string;
  moduleSlug: string;
  lessonSlug: string;
  currentStep: number;
  completed: boolean;
  completedAt: string | null;
}

export interface DemoJournalEntry {
  id: string;
  categorySlug: string;
  moduleSlug: string;
  lessonSlug: string;
  promptText: string;
  responseText: string;
  createdAt: string;
}

export interface DemoStreak {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
}

export interface DemoBadge {
  id: string;
  badgeType: string;
  badgeLabel: string;
  earnedAt: string;
}

export interface DemoData {
  lessonProgress: DemoLessonProgress[];
  journalEntries: DemoJournalEntry[];
  streak: DemoStreak;
  badges: DemoBadge[];
}

const DEFAULT_DATA: DemoData = {
  lessonProgress: [],
  journalEntries: [],
  streak: { currentStreak: 0, longestStreak: 0, lastActivityDate: null },
  badges: [],
};

export function loadDemoData(): DemoData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveDemoData(data: DemoData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function clearDemoData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
