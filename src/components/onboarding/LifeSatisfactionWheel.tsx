"use client";

import { useState } from "react";
import { SliderInput } from "@/components/ui/SliderInput";
import { RadarChart } from "@/components/ui/RadarChart";

const dimensions = [
  { id: "career", label: "Career & Work" },
  { id: "finances", label: "Finances" },
  { id: "health", label: "Health" },
  { id: "relationships", label: "Relationships" },
  { id: "fun", label: "Fun & Recreation" },
  { id: "environment", label: "Environment" },
  { id: "growth", label: "Personal Growth" },
  { id: "contribution", label: "Contribution" },
];

interface LifeSatisfactionWheelProps {
  onComplete: (scores: Record<string, number>) => void;
}

export function LifeSatisfactionWheel({
  onComplete,
}: LifeSatisfactionWheelProps) {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(dimensions.map((d) => [d.id, 5]))
  );

  const labels = dimensions.map((d) => d.label);
  const values = dimensions.map((d) => scores[d.id]);

  return (
    <div className="space-y-6">
      <p className="text-stone-600 text-center">
        Rate your satisfaction in each area from 1 (low) to 10 (high)
      </p>

      <div className="flex justify-center">
        <RadarChart labels={labels} values={values} />
      </div>

      <div className="space-y-4">
        {dimensions.map((dim) => (
          <SliderInput
            key={dim.id}
            label={dim.label}
            value={scores[dim.id]}
            onChange={(value) =>
              setScores((prev) => ({ ...prev, [dim.id]: value }))
            }
          />
        ))}
      </div>

      <button
        onClick={() => onComplete(scores)}
        className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
      >
        See my results
      </button>
    </div>
  );
}
