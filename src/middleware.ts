import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  // In demo mode (no DATABASE_URL), allow all routes
  if (!process.env.DATABASE_URL) {
    return NextResponse.next();
  }

  // With auth configured, we'd use the auth middleware here
  // For now, allow all routes through
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/journey/:path*",
    "/progress/:path*",
    "/journal/:path*",
    "/onboarding/:path*",
    "/login",
  ],
};
