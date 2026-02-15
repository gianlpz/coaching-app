import fs from "fs";
import path from "path";
import type {
  Category,
  Module,
  Lesson,
  LessonMeta,
  Assessment,
} from "@/types/content";

const contentDirectory = path.join(process.cwd(), "content");

// ─── Categories ─────────────────────────────────────────────────

export function getCategories(): Category[] {
  const categoryDirs = fs.readdirSync(contentDirectory).filter((dir) => {
    const fullPath = path.join(contentDirectory, dir);
    return fs.statSync(fullPath).isDirectory() && dir !== "assessments";
  });

  return categoryDirs
    .map((slug) => {
      const metaPath = path.join(contentDirectory, slug, "_meta.json");
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const modules = getModulesForCategory(slug);
      return { slug, ...meta, modules };
    })
    .sort((a, b) => a.order - b.order);
}

export function getCategory(slug: string): Category | null {
  const categories = getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

// ─── Modules ────────────────────────────────────────────────────

function getModulesForCategory(categorySlug: string): Module[] {
  const categoryDir = path.join(contentDirectory, categorySlug);
  const entries = fs.readdirSync(categoryDir);

  return entries
    .filter((entry) => {
      const fullPath = path.join(categoryDir, entry);
      return fs.statSync(fullPath).isDirectory();
    })
    .map((slug) => {
      const metaPath = path.join(categoryDir, slug, "_meta.json");
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const lessons = getLessonMetasForModule(categorySlug, slug);
      return { slug, categorySlug, ...meta, lessons };
    })
    .sort((a, b) => a.order - b.order);
}

export function getModule(
  categorySlug: string,
  moduleSlug: string
): Module | null {
  const category = getCategory(categorySlug);
  if (!category) return null;
  return category.modules.find((m) => m.slug === moduleSlug) || null;
}

// ─── Lessons ────────────────────────────────────────────────────

function getLessonMetasForModule(
  categorySlug: string,
  moduleSlug: string
): LessonMeta[] {
  const moduleDir = path.join(contentDirectory, categorySlug, moduleSlug);

  if (!fs.existsSync(moduleDir)) return [];

  const files = fs.readdirSync(moduleDir).filter(
    (f) => f.endsWith(".json") && f !== "_meta.json"
  );

  return files
    .map((file) => {
      const filePath = path.join(moduleDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return {
        slug: file.replace(".json", ""),
        title: data.title,
        description: data.description,
        order: data.order,
        estimatedMinutes: data.estimatedMinutes || 5,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getLesson(
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string
): Lesson | null {
  const filePath = path.join(
    contentDirectory,
    categorySlug,
    moduleSlug,
    `${lessonSlug}.json`
  );

  if (!fs.existsSync(filePath)) return null;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return { slug: lessonSlug, ...data };
}

export function getNextLesson(
  categorySlug: string,
  moduleSlug: string,
  lessonSlug: string
): { category: string; module: string; lesson: string } | null {
  const category = getCategory(categorySlug);
  if (!category) return null;

  const currentModule = category.modules.find((m) => m.slug === moduleSlug);
  if (!currentModule) return null;

  const currentLessonIndex = currentModule.lessons.findIndex(
    (l) => l.slug === lessonSlug
  );

  // Next lesson in same module
  if (currentLessonIndex < currentModule.lessons.length - 1) {
    return {
      category: categorySlug,
      module: moduleSlug,
      lesson: currentModule.lessons[currentLessonIndex + 1].slug,
    };
  }

  // First lesson of next module in same category
  const currentModuleIndex = category.modules.findIndex(
    (m) => m.slug === moduleSlug
  );
  if (currentModuleIndex < category.modules.length - 1) {
    const nextModule = category.modules[currentModuleIndex + 1];
    if (nextModule.lessons.length > 0) {
      return {
        category: categorySlug,
        module: nextModule.slug,
        lesson: nextModule.lessons[0].slug,
      };
    }
  }

  // First lesson of next category
  const categories = getCategories();
  const currentCategoryIndex = categories.findIndex(
    (c) => c.slug === categorySlug
  );
  if (currentCategoryIndex < categories.length - 1) {
    const nextCategory = categories[currentCategoryIndex + 1];
    if (nextCategory.modules.length > 0 && nextCategory.modules[0].lessons.length > 0) {
      return {
        category: nextCategory.slug,
        module: nextCategory.modules[0].slug,
        lesson: nextCategory.modules[0].lessons[0].slug,
      };
    }
  }

  return null;
}

// ─── Assessments ────────────────────────────────────────────────

export function getAssessment(slug: string): Assessment | null {
  const filePath = path.join(contentDirectory, "assessments", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
