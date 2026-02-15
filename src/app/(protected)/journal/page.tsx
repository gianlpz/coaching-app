import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/db";
import { getJournalEntries } from "@/lib/journal";
import { Card } from "@/components/ui/Card";

const categoryLabels: Record<string, string> = {
  career: "Career",
  relationships: "Relationships",
  "personal-growth": "Personal Growth",
};

const categoryColors: Record<string, string> = {
  career: "bg-blue-100 text-blue-700",
  relationships: "bg-rose-100 text-rose-700",
  "personal-growth": "bg-emerald-100 text-emerald-700",
};

export default async function JournalPage() {
  const session = isDemoMode ? { user: { id: "demo-user" } } : await auth();
  const userId = session?.user?.id || "demo-user";

  const entries = await getJournalEntries(userId);

  // Group by date
  const grouped = entries.reduce(
    (acc, entry) => {
      const date = entry.createdAt
        ? new Date(entry.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })
        : "Unknown date";
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    },
    {} as Record<string, typeof entries>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Journal</h1>
        <p className="text-gray-500 mt-0.5">
          Your reflections and insights from lessons
        </p>
      </div>

      {entries.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-600 font-medium">No journal entries yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Complete lessons to add reflections here
          </p>
        </Card>
      ) : (
        Object.entries(grouped).map(([date, dateEntries]) => (
          <div key={date}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {date}
            </h2>
            <div className="space-y-3">
              {dateEntries.map((entry) => (
                <Card key={entry.id} padding="sm">
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
                        categoryColors[entry.categorySlug] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {categoryLabels[entry.categorySlug] || entry.categorySlug}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-2">
                    {entry.promptText}
                  </p>
                  <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                    {entry.responseText}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
