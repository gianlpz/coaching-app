// ─── Content Types ──────────────────────────────────────────────

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  modules: Module[];
}

export interface Module {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  order: number;
  lessons: LessonMeta[];
}

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  steps: LessonStep[];
}

export type StepType = "hook" | "learn" | "do" | "reflect" | "commit";

export interface LessonStep {
  type: StepType;
  title: string;
  content: string;
  // Only for "do" steps
  exerciseType?: ExerciseType;
  exerciseItems?: ExerciseItem[];
  exercisePrompt?: string;
  exerciseOptions?: string[];
  exerciseBuckets?: string[];
  // Only for "reflect" steps
  reflectPrompts?: ReflectPrompt[];
  // Only for "commit" steps
  commitPrompt?: string;
  commitOptions?: string[];
  // Optional key takeaway for "learn" steps
  keyTakeaway?: string;
}

export type ExerciseType =
  | "ranking"
  | "multiple-choice"
  | "checklist"
  | "scale"
  | "card-sort"
  | "freeform";

export interface ExerciseItem {
  id: string;
  label: string;
  description?: string;
  bucket?: string;
}

export interface ReflectPrompt {
  id: string;
  prompt: string;
  type: "text" | "scale";
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
}

// ─── Assessment Types ───────────────────────────────────────────

export interface Assessment {
  slug: string;
  title: string;
  description: string;
  dimensions: AssessmentDimension[];
}

export interface AssessmentDimension {
  id: string;
  label: string;
  description: string;
}
