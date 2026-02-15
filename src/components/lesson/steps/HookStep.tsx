import type { LessonStep } from "@/types/content";

interface HookStepProps {
  step: LessonStep;
  onContinue: () => void;
}

export function HookStep({ step, onContinue }: HookStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#F5F0E8] to-[#EDE6D8] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h2>
        <p className="text-stone-700 leading-relaxed text-lg">{step.content}</p>
      </div>
      <button
        onClick={onContinue}
        className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
      >
        Let&apos;s dive in
      </button>
    </div>
  );
}
