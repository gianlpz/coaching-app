interface StreakCounterProps {
  count: number;
  className?: string;
}

export function StreakCounter({ count, className = "" }: StreakCounterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl" role="img" aria-label="streak">
        {count > 0 ? "🔥" : "💤"}
      </span>
      <div>
        <p className="text-lg font-bold text-gray-900">{count}</p>
        <p className="text-xs text-gray-500">
          {count === 1 ? "day streak" : "day streak"}
        </p>
      </div>
    </div>
  );
}
