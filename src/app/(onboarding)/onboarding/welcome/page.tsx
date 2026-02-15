import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center text-center min-h-[80vh] justify-center space-y-8">
      <div className="space-y-4">
        <div className="text-6xl">🌱</div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Your Coaching Journey
        </h1>
        <p className="text-gray-600 text-lg max-w-sm mx-auto">
          A guided path to help you grow in career, relationships, and personal
          development. Let&apos;s start by understanding where you are today.
        </p>
      </div>

      <div className="space-y-3 w-full max-w-xs">
        <Link href="/onboarding/categories">
          <Button size="lg">Get started</Button>
        </Link>
        <p className="text-sm text-gray-400">Takes about 3 minutes</p>
      </div>
    </div>
  );
}
