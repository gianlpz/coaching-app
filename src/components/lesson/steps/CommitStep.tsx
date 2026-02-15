"use client";

import { useState } from "react";
import type { LessonStep } from "@/types/content";

interface CommitStepProps {
  step: LessonStep;
  onContinue: (commitment: string) => void;
}

export function CommitStep({ step, onContinue }: CommitStepProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState("");

  const options = step.commitOptions || [];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h2>
        <p className="text-gray-700">{step.content}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900 mb-3">{step.commitPrompt}</p>
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setCustom("");
              }}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[44px] ${
                selected === option
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <span className="text-gray-900">{option}</span>
            </button>
          ))}
          <div>
            <button
              onClick={() => setSelected("custom")}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[44px] ${
                selected === "custom"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <span className="text-gray-600">Write my own...</span>
            </button>
            {selected === "custom" && (
              <textarea
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="What will you commit to?"
                rows={3}
                className="w-full mt-2 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-base"
              />
            )}
          </div>
        </div>
      </div>

      {(selected && selected !== "custom") ||
      (selected === "custom" && custom.trim().length > 0) ? (
        <button
          onClick={() =>
            onContinue(selected === "custom" ? custom : selected!)
          }
          className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          I commit to this
        </button>
      ) : null}
    </div>
  );
}
