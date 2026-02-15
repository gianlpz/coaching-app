"use client";

import { useRouter } from "next/navigation";
import { LifeSatisfactionWheel } from "@/components/onboarding/LifeSatisfactionWheel";
import { saveLifeSatisfactionAssessment } from "../actions";

export default function AssessmentPage() {
  const router = useRouter();

  async function handleComplete(scores: Record<string, number>) {
    await saveLifeSatisfactionAssessment(scores);
    router.push("/onboarding/first-win");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Life Satisfaction Check-in
        </h1>
        <p className="text-gray-500 mt-1">
          This helps us personalize your journey
        </p>
      </div>
      <LifeSatisfactionWheel onComplete={handleComplete} />
    </div>
  );
}
