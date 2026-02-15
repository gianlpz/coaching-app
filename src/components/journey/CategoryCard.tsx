import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

const imageMap: Record<string, string> = {
  career: "/images/categories/career.jpg",
  relationships: "/images/categories/relationships.jpg",
  "personal-growth": "/images/categories/personal-growth.jpg",
};

const progressColorMap: Record<string, string> = {
  "bg-[#9B8F7E]": "bg-[#9B8F7E]",
  "bg-[#B89E8A]": "bg-[#B89E8A]",
  "bg-[#8A9E82]": "bg-[#8A9E82]",
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
  color,
  completedLessons,
  totalLessons,
}: CategoryCardProps) {
  const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Link href={`/journey/${slug}`}>
      <Card className="hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
            <Image
              src={imageMap[slug] || "/images/categories/career.jpg"}
              alt={title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-stone-900">{title}</h3>
            <p className="text-sm text-stone-500 mt-0.5 line-clamp-2">
              {description}
            </p>
            <div className="mt-3">
              <ProgressBar
                value={percentage}
                color={progressColorMap[color] || "bg-[#8B7355]"}
                size="sm"
              />
              <p className="text-xs text-stone-400 mt-1">
                {completedLessons}/{totalLessons} lessons
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
