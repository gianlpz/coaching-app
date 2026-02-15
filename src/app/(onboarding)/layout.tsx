export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="max-w-lg md:max-w-xl mx-auto px-4 md:px-8 py-8 md:py-12">{children}</main>
    </div>
  );
}
