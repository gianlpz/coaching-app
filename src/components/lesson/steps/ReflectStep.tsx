"use client";

import { useState } from "react";
import type { LessonStep } from "@/types/content";

interface ReflectStepProps {
  step: LessonStep;
  onContinue: (responses: Record<string, string | number>) => void;
}

export function ReflectStep({ step, onContinue }: ReflectStepProps) {
  const [responses, setResponses] = useState<Record<string, string | number>>(
    {}
  );

  const prompts = step.reflectPrompts || [];
  const allAnswered = prompts.every((p) => {
    const val = responses[p.id];
    if (p.type === "scale") return val !== undefined;
    return typeof val === "string" && val.trim().length > 0;
  });

  function updateResponse(id: string, value: string | number) {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h2>
        <p className="text-gray-600">{step.content}</p>
      </div>

      {prompts.map((prompt) => (
        <div key={prompt.id} className="space-y-2">
          <label className="block font-medium text-gray-900">
            {prompt.prompt}
          </label>
          {prompt.type === "text" ? (
            <textarea
              value={(responses[prompt.id] as string) || ""}
              onChange={(e) => updateResponse(prompt.id, e.target.value)}
              placeholder="Your reflection..."
              rows={4}
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-base"
            />
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {prompt.scaleMinLabel || "Low"}
                </span>
                <span className="text-lg font-bold text-indigo-600">
                  {responses[prompt.id] ?? 5}
                </span>
                <span className="text-sm text-gray-500">
                  {prompt.scaleMaxLabel || "High"}
                </span>
              </div>
              <input
                type="range"
                min={prompt.scaleMin || 1}
                max={prompt.scaleMax || 10}
                value={(responses[prompt.id] as number) ?? 5}
                onChange={(e) =>
                  updateResponse(prompt.id, parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          )}
        </div>
      ))}

      {allAnswered && (
        <button
          onClick={() => onContinue(responses)}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  );
}
