import { BottomNav } from "@/components/ui/BottomNav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-20">
      <main className="max-w-lg mx-auto px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}
