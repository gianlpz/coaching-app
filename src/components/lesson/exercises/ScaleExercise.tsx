"use client";

import { useState } from "react";
import type { ExerciseItem } from "@/types/content";

interface ScaleExerciseProps {
  prompt: string;
  items: ExerciseItem[];
  onComplete: (result: Record<string, number>) => void;
}

export function ScaleExercise({
  prompt,
  items,
  onComplete,
}: ScaleExerciseProps) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((item) => [item.id, 5]))
  );

  function setValue(id: string, value: number) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="space-y-6">
      <p className="text-stone-700">{prompt}</p>
      {items.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="font-medium text-stone-900">{item.label}</label>
            <span className="text-lg font-bold text-[#8B7355]">
              {values[item.id]}
            </span>
          </div>
          {item.description && (
            <p className="text-sm text-stone-500">{item.description}</p>
          )}
          <input
            type="range"
            min={1}
            max={10}
            value={values[item.id]}
            onChange={(e) => setValue(item.id, parseInt(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#8B7355]"
          />
          <div className="flex justify-between text-xs text-stone-400">
            <span>Not at all</span>
            <span>Completely</span>
          </div>
        </div>
      ))}
      <button
        onClick={() => onComplete(values)}
        className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
