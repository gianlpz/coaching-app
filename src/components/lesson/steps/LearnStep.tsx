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
        <h2 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h2>
        <p className="text-stone-700 leading-relaxed">{step.content}</p>
      </div>
      {step.keyTakeaway && (
        <Card className="bg-[#F5F0E8] border-[#E5D9C8]">
          <div className="flex gap-3">
            <span className="text-xl shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-[#6F5B3E] mb-1">
                Key Takeaway
              </p>
              <p className="text-[#4A3D2E]">{step.keyTakeaway}</p>
            </div>
          </div>
        </Card>
      )}
      <button
        onClick={onContinue}
        className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
      >
        Got it, let&apos;s practice
      </button>
    </div>
  );
}
