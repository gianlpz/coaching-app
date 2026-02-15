"use client";

import { useState } from "react";

const categories = [
  {
    slug: "career",
    title: "Career",
    description: "Find clarity in your professional life",
    icon: "💼",
    color: "border-blue-500 bg-blue-50",
    selectedColor: "border-blue-500 bg-blue-100 ring-2 ring-blue-500",
  },
  {
    slug: "relationships",
    title: "Relationships",
    description: "Build stronger, healthier connections",
    icon: "❤️",
    color: "border-rose-500 bg-rose-50",
    selectedColor: "border-rose-500 bg-rose-100 ring-2 ring-rose-500",
  },
  {
    slug: "personal-growth",
    title: "Personal Growth",
    description: "Discover your values and build self-awareness",
    icon: "✨",
    color: "border-emerald-500 bg-emerald-50",
    selectedColor: "border-emerald-500 bg-emerald-100 ring-2 ring-emerald-500",
  },
];

interface CategorySelectorProps {
  onSelect: (selected: string[]) => void;
}

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-center">
        Choose 1-3 areas to focus on. You can always change this later.
      </p>
      <div className="space-y-3">
        {categories.map((cat) => {
          const isSelected = selected.has(cat.slug);
          return (
            <button
              key={cat.slug}
              onClick={() => toggle(cat.slug)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all min-h-[44px] ${
                isSelected ? cat.selectedColor : `${cat.color} border-transparent`
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                  <p className="text-sm text-gray-600">{cat.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {selected.size > 0 && (
        <button
          onClick={() => onSelect(Array.from(selected))}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Continue with {selected.size} {selected.size === 1 ? "category" : "categories"}
        </button>
      )}
    </div>
  );
}
