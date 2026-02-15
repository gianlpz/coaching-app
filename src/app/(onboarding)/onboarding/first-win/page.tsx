"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { completeOnboarding } from "../actions";

const quickWins = [
  {
    id: "gratitude",
    title: "Name 3 things you're grateful for right now",
    icon: "🙏",
  },
  {
    id: "intention",
    title: "Set one intention for today",
    icon: "🎯",
  },
  {
    id: "breath",
    title: "Take 3 deep breaths and notice how you feel",
    icon: "🌬️",
  },
];

export default function FirstWinPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFinish() {
    setLoading(true);
    await completeOnboarding();
    router.push("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900">
          Your First Quick Win
        </h1>
        <p className="text-gray-500 mt-1">
          Let&apos;s start with something small but powerful
        </p>
      </div>

      {!selected ? (
        <div className="space-y-3">
          {quickWins.map((win) => (
            <button
              key={win.id}
              onClick={() => setSelected(win.id)}
              className="w-full text-left"
            >
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{win.icon}</span>
                  <p className="font-medium text-gray-900">{win.title}</p>
                </div>
              </Card>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="bg-indigo-50 border-indigo-200">
            <p className="font-medium text-indigo-900">
              {quickWins.find((w) => w.id === selected)?.title}
            </p>
          </Card>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write your response here..."
            rows={5}
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-base"
          />
          <button
            onClick={handleFinish}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Setting up your journey..." : "Start my journey"}
          </button>
        </div>
      )}
    </div>
  );
}
