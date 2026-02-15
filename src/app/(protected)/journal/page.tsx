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
  career: "bg-[#F5F0E8] text-[#6F5B3E]",
  relationships: "bg-[#F8F0EB] text-[#8B6F5A]",
  "personal-growth": "bg-[#F0F4ED] text-[#5A6F52]",
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
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900">Journal</h1>
        <p className="text-stone-500 mt-0.5">
          Your reflections and insights from lessons
        </p>
      </div>

      {entries.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-stone-600 font-medium">No journal entries yet</p>
          <p className="text-stone-400 text-sm mt-1">
            Complete lessons to add reflections here
          </p>
        </Card>
      ) : (
        Object.entries(grouped).map(([date, dateEntries]) => (
          <div key={date}>
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
              {date}
            </h2>
            <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
              {dateEntries.map((entry) => (
                <Card key={entry.id} padding="sm">
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
                        categoryColors[entry.categorySlug] ||
                        "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {categoryLabels[entry.categorySlug] || entry.categorySlug}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-stone-700 mt-2">
                    {entry.promptText}
                  </p>
                  <p className="text-stone-600 mt-1 text-sm leading-relaxed">
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
