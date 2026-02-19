import { BottomNav } from "@/components/ui/BottomNav";
import { DemoDataProvider } from "@/components/DemoDataProvider";
import { isDemoMode } from "@/lib/db";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoDataProvider isDemoMode={isDemoMode}>
      <div className="min-h-screen pb-20 lg:pb-0 lg:pl-64">
        <main className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-8 py-6">{children}</main>
        <BottomNav />
      </div>
    </DemoDataProvider>
  );
}
