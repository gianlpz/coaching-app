import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/db";
import { getCategories } from "@/lib/content";
import { getUserLessonProgress } from "@/lib/progress";
import { getStreak, getUserBadges } from "@/lib/streaks";
import { getLatestAssessment } from "@/lib/assessments";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { RadarChart } from "@/components/ui/RadarChart";

const allBadgeTypes = [
  { type: "first-lesson", label: "First Lesson" },
  { type: "streak-7", label: "7-Day Streak" },
  { type: "streak-14", label: "14-Day Streak" },
  { type: "streak-30", label: "30-Day Streak" },
  { type: "module-complete", label: "Module Complete" },
];

const categoryColors: Record<string, string> = {
  career: "bg-blue-500",
  relationships: "bg-rose-500",
  "personal-growth": "bg-emerald-500",
};

export default async function ProgressPage() {
  const session = isDemoMode ? { user: { id: "demo-user" } } : await auth();
  const userId = session?.user?.id || "demo-user";

  const [categories, allProgress, streak, badges, assessment] =
    await Promise.all([
      getCategories(),
      getUserLessonProgress(userId),
      getStreak(userId),
      getUserBadges(userId),
      getLatestAssessment(userId, "life-satisfaction-wheel"),
    ]);

  const earnedBadgeTypes = new Set(badges.map((b) => b.badgeType));

  const totalLessons = categories.reduce(
    (sum, cat) =>
      sum + cat.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );
  const completedLessons = allProgress.filter((p) => p.completed).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-500 mt-0.5">Track your growth over time</p>
      </div>

      {/* Streak */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current streak</p>
            <p className="text-3xl font-bold text-gray-900">
              {streak.currentStreak}{" "}
              <span className="text-lg font-normal text-gray-500">days</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Longest streak</p>
            <p className="text-xl font-bold text-gray-900">
              {streak.longestStreak} days
            </p>
          </div>
          <span className="text-4xl">{streak.currentStreak > 0 ? "🔥" : "💤"}</span>
        </div>
      </Card>

      {/* Overall progress */}
      <Card>
        <h2 className="font-semibold text-gray-900 mb-3">Overall Progress</h2>
        <ProgressBar
          value={completedLessons}
          max={totalLessons}
          size="lg"
          showLabel
        />
        <p className="text-sm text-gray-500 mt-2">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </Card>

      {/* Category progress */}
      <Card>
        <h2 className="font-semibold text-gray-900 mb-4">By Category</h2>
        <div className="space-y-4">
          {categories.map((cat) => {
            const total = cat.modules.reduce(
              (s, m) => s + m.lessons.length,
              0
            );
            const completed = allProgress.filter(
              (p) => p.categorySlug === cat.slug && p.completed
            ).length;
            return (
              <div key={cat.slug}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {cat.title}
                  </span>
                  <span className="text-gray-500">
                    {completed}/{total}
                  </span>
                </div>
                <ProgressBar
                  value={completed}
                  max={total}
                  size="sm"
                  color={categoryColors[cat.slug] || "bg-indigo-600"}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <h2 className="font-semibold text-gray-900 mb-4">Badges</h2>
        <div className="grid grid-cols-3 gap-2">
          {allBadgeTypes.map((bt) => {
            const earned = earnedBadgeTypes.has(bt.type);
            const badge = badges.find((b) => b.badgeType === bt.type);
            return (
              <Badge
                key={bt.type}
                badgeType={bt.type}
                badgeLabel={bt.label}
                earned={earned}
                earnedAt={badge?.earnedAt}
              />
            );
          })}
        </div>
      </Card>

      {/* Life Satisfaction Chart */}
      {assessment && (
        <Card>
          <h2 className="font-semibold text-gray-900 mb-4">
            Life Satisfaction
          </h2>
          <div className="flex justify-center">
            <RadarChart
              labels={Object.keys(assessment.scores)}
              values={Object.values(assessment.scores)}
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            From your onboarding assessment
          </p>
        </Card>
      )}
    </div>
  );
}
