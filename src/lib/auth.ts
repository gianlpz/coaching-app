import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Resend from "next-auth/providers/resend";
import { db, isDemoMode } from "./db";
import * as schema from "./schema";

// In demo mode, provide stub auth functions
if (isDemoMode) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stub = (() => null) as any;
  module.exports = {
    handlers: { GET: stub, POST: stub },
    signIn: stub,
    signOut: stub,
    auth: async () => ({
      user: { id: "demo-user", email: "demo@example.com", name: "Demo User" },
    }),
  };
}

const nextAuth = !isDemoMode
  ? NextAuth({
      adapter: DrizzleAdapter(db!, {
        usersTable: schema.users,
        accountsTable: schema.accounts,
        sessionsTable: schema.sessions,
        verificationTokensTable: schema.verificationTokens,
      }),
      providers: [
        Resend({
          from: process.env.AUTH_EMAIL_FROM || "onboarding@resend.dev",
        }),
      ],
      pages: {
        signIn: "/login",
        verifyRequest: "/verify",
      },
      callbacks: {
        session({ session, user }) {
          session.user.id = user.id;
          return session;
        },
      },
    })
  : null;

export const handlers = nextAuth?.handlers ?? { GET: () => new Response(), POST: () => new Response() };
export const signIn = nextAuth?.signIn ?? (() => Promise.resolve());
export const signOut = nextAuth?.signOut ?? (() => Promise.resolve());
export const auth = nextAuth?.auth ?? (async () => ({
  user: { id: "demo-user", email: "demo@example.com", name: "Demo User" },
  expires: new Date(Date.now() + 86400000).toISOString(),
}));
