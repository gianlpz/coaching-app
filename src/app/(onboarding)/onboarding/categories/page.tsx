"use client";

import { useRouter } from "next/navigation";
import { CategorySelector } from "@/components/onboarding/CategorySelector";
import { saveSelectedCategories } from "../actions";

export default function CategoriesPage() {
  const router = useRouter();

  async function handleSelect(categories: string[]) {
    await saveSelectedCategories(categories);
    router.push("/onboarding/assessment");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-900">
          What do you want to work on?
        </h1>
      </div>
      <CategorySelector onSelect={handleSelect} />
    </div>
  );
}
