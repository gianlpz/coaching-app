"use client";

import { useState } from "react";

interface FreeformExerciseProps {
  prompt: string;
  onComplete: (result: string) => void;
}

export function FreeformExercise({
  prompt,
  onComplete,
}: FreeformExerciseProps) {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <p className="text-stone-700">{prompt}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts here..."
        rows={6}
        className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#A68B6B] focus:border-transparent resize-none text-base"
      />
      <p className="text-xs text-stone-400">
        {text.length > 0 ? `${text.split(/\s+/).filter(Boolean).length} words` : "Start writing..."}
      </p>
      {text.trim().length > 10 && (
        <button
          onClick={() => onComplete(text)}
          className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  );
}
