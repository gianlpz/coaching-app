import { redirect } from "next/navigation";
import { isDemoMode, db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { userProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function HomePage() {
  // Demo mode: skip auth and onboarding, go straight to dashboard
  if (isDemoMode) {
    redirect("/dashboard");
  }

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile = await db!.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, session.user.id),
  });

  if (!profile?.onboardingCompleted) {
    redirect("/onboarding/welcome");
  }

  redirect("/dashboard");
}
