const badgeIcons: Record<string, string> = {
  "first-lesson": "🌟",
  "streak-7": "🔥",
  "streak-14": "💪",
  "streak-30": "🏆",
  "module-complete": "🎓",
};

interface BadgeProps {
  badgeType: string;
  badgeLabel: string;
  earned: boolean;
  earnedAt?: Date | null;
}

export function Badge({ badgeType, badgeLabel, earned, earnedAt }: BadgeProps) {
  return (
    <div
      className={`flex flex-col items-center text-center p-3 rounded-xl ${
        earned ? "bg-white" : "bg-gray-50 opacity-50"
      }`}
    >
      <span className={`text-3xl ${earned ? "" : "grayscale"}`}>
        {badgeIcons[badgeType] || "🏅"}
      </span>
      <p
        className={`text-xs font-medium mt-1 ${
          earned ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {badgeLabel}
      </p>
      {earned && earnedAt && (
        <p className="text-xs text-gray-400 mt-0.5">
          {new Date(earnedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
