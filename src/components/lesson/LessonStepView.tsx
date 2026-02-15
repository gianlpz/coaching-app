"use client";

import { useState, useTransition } from "react";
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

  const step = lesson.steps[currentStep];

  function goToNextStep() {
    const nextStep = currentStep + 1;

    if (nextStep >= lesson.steps.length) {
      // Lesson complete
      startTransition(async () => {
        await completeLesson(categorySlug, moduleSlug, lesson.slug);
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
      setCurrentStep(nextStep);
    });
  }

  function handleReflectContinue(responses: Record<string, string | number>) {
    // Save text responses as journal entries
    startTransition(async () => {
      for (const [promptId, value] of Object.entries(responses)) {
        if (typeof value === "string" && value.trim().length > 0) {
          const prompt = step.reflectPrompts?.find((p) => p.id === promptId);
          await saveReflection(
            categorySlug,
            moduleSlug,
            lesson.slug,
            prompt?.prompt || promptId,
            value
          );
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
          className="text-gray-500 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center"
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
