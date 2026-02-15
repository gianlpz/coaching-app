"use client";

import { useState } from "react";

interface MultipleChoiceExerciseProps {
  prompt: string;
  options: string[];
  onComplete: (result: string) => void;
}

export function MultipleChoiceExercise({
  prompt,
  options,
  onComplete,
}: MultipleChoiceExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-stone-700">{prompt}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[44px] ${
              selected === option
                ? "border-[#8B7355] bg-[#F5F0E8]"
                : "border-stone-100 bg-white hover:border-stone-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  selected === option
                    ? "border-[#8B7355] bg-[#8B7355]"
                    : "border-stone-300"
                }`}
              >
                {selected === option && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-stone-900">{option}</span>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <button
          onClick={() => onComplete(selected)}
          className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  );
}
