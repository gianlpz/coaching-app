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
      <p className="text-gray-700">{prompt}</p>
      {items.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="font-medium text-gray-900">{item.label}</label>
            <span className="text-lg font-bold text-indigo-600">
              {values[item.id]}
            </span>
          </div>
          {item.description && (
            <p className="text-sm text-gray-500">{item.description}</p>
          )}
          <input
            type="range"
            min={1}
            max={10}
            value={values[item.id]}
            onChange={(e) => setValue(item.id, parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Not at all</span>
            <span>Completely</span>
          </div>
        </div>
      ))}
      <button
        onClick={() => onComplete(values)}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
