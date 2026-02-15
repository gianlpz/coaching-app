"use client";

import { useState } from "react";
import type { ExerciseItem } from "@/types/content";

interface RankingExerciseProps {
  prompt: string;
  items: ExerciseItem[];
  onComplete: (result: string[]) => void;
}

export function RankingExercise({
  prompt,
  items,
  onComplete,
}: RankingExerciseProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleItem(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      }
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-stone-700">{prompt}</p>
      <p className="text-sm text-stone-500">
        Tap to select your top 5 in order of importance ({selected.length}/5)
      </p>
      <div className="space-y-2">
        {items.map((item) => {
          const rank = selected.indexOf(item.id);
          const isSelected = rank !== -1;
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[44px] ${
                isSelected
                  ? "border-[#8B7355] bg-[#F5F0E8]"
                  : "border-stone-100 bg-white hover:border-stone-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {isSelected && (
                  <span className="w-7 h-7 rounded-full bg-[#8B7355] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {rank + 1}
                  </span>
                )}
                <div>
                  <p className="font-medium text-stone-900">{item.label}</p>
                  {item.description && (
                    <p className="text-sm text-stone-500 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {selected.length >= 3 && (
        <button
          onClick={() => onComplete(selected)}
          className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
        >
          Continue with my top {selected.length}
        </button>
      )}
    </div>
  );
}
