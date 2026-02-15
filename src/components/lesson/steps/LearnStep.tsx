import type { LessonStep } from "@/types/content";
import { Card } from "@/components/ui/Card";

interface LearnStepProps {
  step: LessonStep;
  onContinue: () => void;
}

export function LearnStep({ step, onContinue }: LearnStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h2>
        <p className="text-gray-700 leading-relaxed">{step.content}</p>
      </div>
      {step.keyTakeaway && (
        <Card className="bg-amber-50 border-amber-200">
          <div className="flex gap-3">
            <span className="text-xl shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">
                Key Takeaway
              </p>
              <p className="text-amber-900">{step.keyTakeaway}</p>
            </div>
          </div>
        </Card>
      )}
      <button
        onClick={onContinue}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
      >
        Got it, let&apos;s practice
      </button>
    </div>
  );
}
