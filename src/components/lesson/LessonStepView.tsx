"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Lesson } from "@/types/content";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { HookStep } from "./steps/HookStep";
import { LearnStep } from "./steps/LearnStep";
import { DoStep } from "./steps/DoStep";
import { ReflectStep } from "./steps/ReflectStep";
import { CommitStep } from "./steps/CommitStep";
import {
  advanceLessonStep,
  completeLesson,
  saveReflection,
} from "@/app/(protected)/journey/actions";
import { useDemoContext } from "@/components/DemoDataProvider";

interface LessonStepViewProps {
  lesson: Lesson;
  categorySlug: string;
  moduleSlug: string;
  initialStep: number;
  nextLessonUrl: string | null;
}

export function LessonStepView({
  lesson,
  categorySlug,
  moduleSlug,
  initialStep,
  nextLessonUrl,
}: LessonStepViewProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const demoData = useDemoContext();

  // In demo mode, restore step position from localStorage on mount
  useEffect(() => {
    if (!demoData?.isHydrated) return;
    const savedStep = demoData.getLessonStep(categorySlug, moduleSlug, lesson.slug);
    if (savedStep > 0 && savedStep !== currentStep) {
      setCurrentStep(savedStep);
    }
    // Only run on hydration, not on every step change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoData?.isHydrated]);

  const step = lesson.steps[currentStep];

  function goToNextStep() {
    const nextStep = currentStep + 1;

    if (nextStep >= lesson.steps.length) {
      // Lesson complete
      startTransition(async () => {
        await completeLesson(categorySlug, moduleSlug, lesson.slug);
        if (demoData) {
          demoData.completeLesson(categorySlug, moduleSlug, lesson.slug);
          demoData.updateStreak();
          demoData.awardBadge("first-lesson", "First Lesson");
        }
        if (nextLessonUrl) {
          router.push(nextLessonUrl);
        } else {
          router.push(`/journey/${categorySlug}/${moduleSlug}`);
        }
      });
      return;
    }

    startTransition(async () => {
      await advanceLessonStep(
        categorySlug,
        moduleSlug,
        lesson.slug,
        nextStep
      );
      if (demoData) {
        demoData.setLessonStep(categorySlug, moduleSlug, lesson.slug, nextStep);
      }
      setCurrentStep(nextStep);
    });
  }

  function handleReflectContinue(responses: Record<string, string | number>) {
    // Save text responses as journal entries
    startTransition(async () => {
      for (const [promptId, value] of Object.entries(responses)) {
        if (typeof value === "string" && value.trim().length > 0) {
          const prompt = step.reflectPrompts?.find((p) => p.id === promptId);
          const promptText = prompt?.prompt || promptId;
          await saveReflection(
            categorySlug,
            moduleSlug,
            lesson.slug,
            promptText,
            value
          );
          if (demoData) {
            demoData.saveJournalEntry(
              categorySlug,
              moduleSlug,
              lesson.slug,
              promptText,
              value
            );
          }
        }
      }
      goToNextStep();
    });
  }

  if (!step) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-stone-500 hover:text-stone-900 min-h-[44px] min-w-[44px] flex items-center"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="ml-1 text-sm">Back</span>
        </button>
        <StepIndicator currentStep={currentStep} />
      </div>

      <div className={`transition-opacity duration-200 ${isPending ? "opacity-50" : ""}`}>
        {step.type === "hook" && (
          <HookStep step={step} onContinue={goToNextStep} />
        )}
        {step.type === "learn" && (
          <LearnStep step={step} onContinue={goToNextStep} />
        )}
        {step.type === "do" && (
          <DoStep step={step} onContinue={goToNextStep} />
        )}
        {step.type === "reflect" && (
          <ReflectStep step={step} onContinue={handleReflectContinue} />
        )}
        {step.type === "commit" && (
          <CommitStep step={step} onContinue={goToNextStep} />
        )}
      </div>
    </div>
  );
}
