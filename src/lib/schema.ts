import {
  pgTable,
  text,
  timestamp,
  boolean,
  primaryKey,
  integer,
  json,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ─── Auth tables (NextAuth standard) ────────────────────────────

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ]
);

// ─── App tables ─────────────────────────────────────────────────

export const userProfiles = pgTable("userProfile", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  selectedCategories: json("selectedCategories").$type<string[]>().default([]),
  onboardingCompleted: boolean("onboardingCompleted").default(false).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const lessonProgress = pgTable(
  "lessonProgress",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categorySlug: text("categorySlug").notNull(),
    moduleSlug: text("moduleSlug").notNull(),
    lessonSlug: text("lessonSlug").notNull(),
    currentStep: integer("currentStep").default(0).notNull(),
    completed: boolean("completed").default(false).notNull(),
    completedAt: timestamp("completedAt", { mode: "date" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  (lp) => [
    primaryKey({
      columns: [lp.userId, lp.categorySlug, lp.moduleSlug, lp.lessonSlug],
    }),
  ]
);

export const journalEntries = pgTable("journalEntry", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categorySlug: text("categorySlug").notNull(),
  moduleSlug: text("moduleSlug").notNull(),
  lessonSlug: text("lessonSlug").notNull(),
  promptText: text("promptText").notNull(),
  responseText: text("responseText").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const streaks = pgTable("streak", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  currentStreak: integer("currentStreak").default(0).notNull(),
  longestStreak: integer("longestStreak").default(0).notNull(),
  lastActivityDate: text("lastActivityDate"),
});

export const badges = pgTable("badge", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  badgeType: text("badgeType").notNull(),
  badgeLabel: text("badgeLabel").notNull(),
  earnedAt: timestamp("earnedAt", { mode: "date" }).defaultNow().notNull(),
});

export const assessmentResponses = pgTable("assessmentResponse", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  assessmentSlug: text("assessmentSlug").notNull(),
  responses: json("responses").$type<Record<string, number>>().notNull(),
  scores: json("scores").$type<Record<string, number>>().notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

// ─── Type exports ───────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;
export type JournalEntry = typeof journalEntries.$inferSelect;
export type Streak = typeof streaks.$inferSelect;
export type Badge = typeof badges.$inferSelect;
export type AssessmentResponse = typeof assessmentResponses.$inferSelect;
