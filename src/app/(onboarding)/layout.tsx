export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="max-w-lg mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
