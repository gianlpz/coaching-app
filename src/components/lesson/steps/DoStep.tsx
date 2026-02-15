"use client";

import type { LessonStep } from "@/types/content";
import { RankingExercise } from "@/components/lesson/exercises/RankingExercise";
import { MultipleChoiceExercise } from "@/components/lesson/exercises/MultipleChoiceExercise";
import { ChecklistExercise } from "@/components/lesson/exercises/ChecklistExercise";
import { ScaleExercise } from "@/components/lesson/exercises/ScaleExercise";
import { CardSortExercise } from "@/components/lesson/exercises/CardSortExercise";
import { FreeformExercise } from "@/components/lesson/exercises/FreeformExercise";

interface DoStepProps {
  step: LessonStep;
  onContinue: (result: unknown) => void;
}

export function DoStep({ step, onContinue }: DoStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-900">{step.title}</h2>
      <p className="text-stone-600">{step.content}</p>

      {step.exerciseType === "ranking" && step.exerciseItems && (
        <RankingExercise
          prompt={step.exercisePrompt || ""}
          items={step.exerciseItems}
          onComplete={onContinue}
        />
      )}

      {step.exerciseType === "multiple-choice" && step.exerciseOptions && (
        <MultipleChoiceExercise
          prompt={step.exercisePrompt || ""}
          options={step.exerciseOptions}
          onComplete={onContinue}
        />
      )}

      {step.exerciseType === "checklist" && step.exerciseItems && (
        <ChecklistExercise
          prompt={step.exercisePrompt || ""}
          items={step.exerciseItems}
          onComplete={onContinue}
        />
      )}

      {step.exerciseType === "scale" && step.exerciseItems && (
        <ScaleExercise
          prompt={step.exercisePrompt || ""}
          items={step.exerciseItems}
          onComplete={onContinue}
        />
      )}

      {step.exerciseType === "card-sort" &&
        step.exerciseItems &&
        step.exerciseBuckets && (
          <CardSortExercise
            prompt={step.exercisePrompt || ""}
            items={step.exerciseItems}
            buckets={step.exerciseBuckets}
            onComplete={onContinue}
          />
        )}

      {step.exerciseType === "freeform" && (
        <FreeformExercise
          prompt={step.exercisePrompt || ""}
          onComplete={onContinue}
        />
      )}
    </div>
  );
}
