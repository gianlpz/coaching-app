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
                ? "bg-[#8B7355]"
                : i === currentStep
                ? "bg-[#B8A48A] ring-2 ring-[#E5D9C8]"
                : "bg-stone-200"
            }`}
            title={STEP_LABELS[i]}
          />
          {i < totalSteps - 1 && (
            <div
              className={`w-6 h-0.5 ${
                i < currentStep ? "bg-[#8B7355]" : "bg-stone-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
