import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

const iconMap: Record<string, string> = {
  briefcase: "💼",
  heart: "❤️",
  sparkles: "✨",
};

const colorMap: Record<string, string> = {
  "bg-blue-500": "bg-blue-500",
  "bg-rose-500": "bg-rose-500",
  "bg-emerald-500": "bg-emerald-500",
};

const progressColorMap: Record<string, string> = {
  "bg-blue-500": "bg-blue-500",
  "bg-rose-500": "bg-rose-500",
  "bg-emerald-500": "bg-emerald-500",
};

interface CategoryCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  completedLessons: number;
  totalLessons: number;
}

export function CategoryCard({
  slug,
  title,
  description,
  icon,
  color,
  completedLessons,
  totalLessons,
}: CategoryCardProps) {
  const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Link href={`/journey/${slug}`}>
      <Card className="hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl ${colorMap[color] || "bg-gray-500"} flex items-center justify-center text-2xl shrink-0`}
          >
            {iconMap[icon] || "📚"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
              {description}
            </p>
            <div className="mt-3">
              <ProgressBar
                value={percentage}
                color={progressColorMap[color] || "bg-indigo-600"}
                size="sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                {completedLessons}/{totalLessons} lessons
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
