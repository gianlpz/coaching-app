"use client";

import { useState } from "react";
import type { ExerciseItem } from "@/types/content";

interface ChecklistExerciseProps {
  prompt: string;
  items: ExerciseItem[];
  onComplete: (result: string[]) => void;
}

export function ChecklistExercise({
  prompt,
  items,
  onComplete,
}: ChecklistExerciseProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700">{prompt}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[44px] ${
              checked.has(item.id)
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center ${
                  checked.has(item.id)
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-gray-300"
                }`}
              >
                {checked.has(item.id) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-gray-900">{item.label}</p>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      {checked.size > 0 && (
        <button
          onClick={() => onComplete(Array.from(checked))}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Continue ({checked.size} selected)
        </button>
      )}
    </div>
  );
}
