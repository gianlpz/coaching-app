"use client";

interface RadarChartProps {
  labels: string[];
  values: number[];
  maxValue?: number;
  size?: number;
  color?: string;
  className?: string;
}

export function RadarChart({
  labels,
  values,
  maxValue = 10,
  size = 280,
  color = "#6366f1",
  className = "",
}: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const n = labels.length;
  const angleStep = (2 * Math.PI) / n;

  function getPoint(index: number, value: number): [number, number] {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / maxValue) * radius;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1];

  // Data polygon
  const dataPoints = values.map((v, i) => getPoint(i, v));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} width={size} height={size}>
      {/* Grid rings */}
      {rings.map((scale) => {
        const ringPoints = Array.from({ length: n }, (_, i) =>
          getPoint(i, maxValue * scale)
        );
        const ringPath =
          ringPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
        return (
          <path
            key={scale}
            d={ringPath}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        );
      })}

      {/* Axis lines */}
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = getPoint(i, maxValue);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        );
      })}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2}
      />

      {/* Data points */}
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill={color} />
      ))}

      {/* Labels */}
      {labels.map((label, i) => {
        const [x, y] = getPoint(i, maxValue * 1.2);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="#6b7280"
            fontWeight={500}
          >
            {label.length > 12 ? label.slice(0, 11) + "..." : label}
          </text>
        );
      })}
    </svg>
  );
}
