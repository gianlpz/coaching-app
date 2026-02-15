import Link from "next/link";

interface LessonCardProps {
  categorySlug: string;
  moduleSlug: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
  currentStep: number;
  isLocked?: boolean;
}

export function LessonCard({
  categorySlug,
  moduleSlug,
  slug,
  title,
  description,
  estimatedMinutes,
  completed,
  currentStep,
  isLocked = false,
}: LessonCardProps) {
  const statusIcon = completed
    ? "✅"
    : currentStep > 0
    ? "🔵"
    : isLocked
    ? "🔒"
    : "⚪";

  const statusText = completed
    ? "Completed"
    : currentStep > 0
    ? `Step ${currentStep + 1}/5`
    : isLocked
    ? "Locked"
    : "Not started";

  if (isLocked) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 opacity-60">
        <span className="text-xl">{statusIcon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-stone-600">{title}</h4>
          <p className="text-sm text-stone-400 mt-0.5">{statusText}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/journey/${categorySlug}/${moduleSlug}/${slug}`}
      className="flex items-center gap-4 p-4 rounded-xl bg-white border border-stone-100 hover:shadow-sm transition-shadow min-h-[44px]"
    >
      <span className="text-xl">{statusIcon}</span>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-stone-900">{title}</h4>
        <p className="text-sm text-stone-500 mt-0.5 line-clamp-1">
          {description}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-stone-400">{estimatedMinutes} min</p>
        <p className="text-xs text-[#8B7355] font-medium mt-0.5">
          {statusText}
        </p>
      </div>
    </Link>
  );
}
