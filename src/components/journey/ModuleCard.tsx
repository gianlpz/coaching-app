import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface ModuleCardProps {
  categorySlug: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  totalLessons: number;
  completedLessons: number;
  color?: string;
}

export function ModuleCard({
  categorySlug,
  slug,
  title,
  description,
  order,
  totalLessons,
  completedLessons,
  color = "bg-indigo-600",
}: ModuleCardProps) {
  const percentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Link href={`/journey/${categorySlug}/${slug}`}>
      <Card className="hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
            {order}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            <div className="mt-3">
              <ProgressBar value={percentage} color={color} size="sm" />
              <p className="text-xs text-gray-400 mt-1">
                {completedLessons}/{totalLessons} lessons complete
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
