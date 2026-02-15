"use client";

const STEP_LABELS = ["Hook", "Learn", "Do", "Reflect", "Commit"];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
}

export function StepIndicator({
  currentStep,
  totalSteps = 5,
  className = "",
}: StepIndicatorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentStep
                ? "bg-indigo-600"
                : i === currentStep
                ? "bg-indigo-400 ring-2 ring-indigo-200"
                : "bg-gray-200"
            }`}
            title={STEP_LABELS[i]}
          />
          {i < totalSteps - 1 && (
            <div
              className={`w-6 h-0.5 ${
                i < currentStep ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
