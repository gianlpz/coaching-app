"use client";

interface SliderInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function SliderInput({
  label,
  value,
  min = 1,
  max = 10,
  onChange,
  className = "",
}: SliderInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-stone-700">{label}</label>
        <span className="text-lg font-bold text-[#8B7355]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#8B7355]"
      />
      <div className="flex justify-between text-xs text-stone-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
