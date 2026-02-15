import type { LessonStep } from "@/types/content";

interface HookStepProps {
  step: LessonStep;
  onContinue: () => void;
}

export function HookStep({ step, onContinue }: HookStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{step.content}</p>
      </div>
      <button
        onClick={onContinue}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
      >
        Let&apos;s dive in
      </button>
    </div>
  );
}
