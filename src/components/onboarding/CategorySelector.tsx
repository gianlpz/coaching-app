"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  {
    slug: "career",
    title: "Career",
    description: "Find clarity in your professional life",
    image: "/images/categories/career.jpg",
    color: "border-[#9B8F7E] bg-[#F5F0E8]",
    selectedColor: "border-[#9B8F7E] bg-[#EDE6D8] ring-2 ring-[#9B8F7E]",
  },
  {
    slug: "relationships",
    title: "Relationships",
    description: "Build stronger, healthier connections",
    image: "/images/categories/relationships.jpg",
    color: "border-[#B89E8A] bg-[#F8F0EB]",
    selectedColor: "border-[#B89E8A] bg-[#F5EBE4] ring-2 ring-[#B89E8A]",
  },
  {
    slug: "personal-growth",
    title: "Personal Growth",
    description: "Discover your values and build self-awareness",
    image: "/images/categories/personal-growth.jpg",
    color: "border-[#8A9E82] bg-[#F0F4ED]",
    selectedColor: "border-[#8A9E82] bg-[#E6EDE2] ring-2 ring-[#8A9E82]",
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
      <p className="text-stone-600 text-center">
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
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">{cat.title}</h3>
                  <p className="text-sm text-stone-600">{cat.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {selected.size > 0 && (
        <button
          onClick={() => onSelect(Array.from(selected))}
          className="w-full py-3 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#6F5B3E] transition-colors"
        >
          Continue with {selected.size} {selected.size === 1 ? "category" : "categories"}
        </button>
      )}
    </div>
  );
}
