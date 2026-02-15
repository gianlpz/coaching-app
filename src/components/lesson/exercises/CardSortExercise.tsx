"use client";

import { useState } from "react";
import type { ExerciseItem } from "@/types/content";

interface CardSortExerciseProps {
  prompt: string;
  items: ExerciseItem[];
  buckets: string[];
  onComplete: (result: Record<string, string>) => void;
}

export function CardSortExercise({
  prompt,
  items,
  buckets,
  onComplete,
}: CardSortExerciseProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  function assign(itemId: string, bucket: string) {
    setAssignments((prev) => ({ ...prev, [itemId]: bucket }));
  }

  const allAssigned = items.every((item) => assignments[item.id]);

  return (
    <div className="space-y-6">
      <p className="text-gray-700">{prompt}</p>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-xl border border-gray-100 bg-white space-y-3"
        >
          <div>
            <p className="font-medium text-gray-900">{item.label}</p>
            {item.description && (
              <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {buckets.map((bucket) => (
              <button
                key={bucket}
                onClick={() => assign(item.id, bucket)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                  assignments[item.id] === bucket
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {bucket}
              </button>
            ))}
          </div>
        </div>
      ))}
      {allAssigned && (
        <button
          onClick={() => onComplete(assignments)}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  );
}
