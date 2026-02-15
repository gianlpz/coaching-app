# Coaching App

A mobile-first coaching web app for Career, Relationships, and Personal Growth. Built with structured 5-step lessons, interactive exercises, progress tracking, and streak-based accountability.

**Live demo:** [coaching-app-mauve.vercel.app](https://coaching-app-mauve.vercel.app)

## What's Inside

- **3 categories** — Career, Relationships, Personal Growth
- **6 modules** — 2 per category, each with 4 lessons
- **24 interactive lessons** — every lesson has 5 steps: Hook, Learn, Do, Reflect, Commit
- **6 exercise types** — ranking, multiple-choice, checklist, scale, card-sort, freeform
- **Onboarding flow** — category selection, life satisfaction wheel assessment, quick win
- **Progress tracking** — streaks, badges, per-category progress bars
- **Journal** — reflections from lessons saved and browsable by date

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Drizzle ORM + Neon Postgres
- **Auth:** NextAuth v5 (magic link via Resend)
- **Deployment:** Vercel

## Getting Started

### Demo Mode (no database needed)

```bash
npm install
npm run dev
```

The app runs in demo mode without any environment variables. All content and UI is fully functional — data just won't persist.

### Full Mode (with database + auth)

1. Create a free database at [neon.tech](https://neon.tech)
2. Create a free account at [resend.com](https://resend.com) for email
3. Copy `.env.local` and fill in the values:

```
DATABASE_URL=your-neon-connection-string
AUTH_SECRET=your-secret (run: npx auth secret)
AUTH_RESEND_KEY=your-resend-api-key
AUTH_EMAIL_FROM=onboarding@resend.dev
```

4. Push the database schema:

```bash
npx drizzle-kit push
```

5. Start the dev server:

```bash
npm run dev
```

## Project Structure

```
coaching-app/
├── content/                    # Lesson JSON files (not in DB)
│   ├── career/
│   ├── relationships/
│   ├── personal-growth/
│   └── assessments/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Login + verify pages
│   │   ├── (onboarding)/       # Onboarding flow
│   │   ├── (protected)/        # Dashboard, journey, progress, journal
│   │   └── api/auth/           # NextAuth route handler
│   ├── components/
│   │   ├── journey/            # Category, module, lesson cards
│   │   ├── lesson/             # Step views + exercise components
│   │   ├── onboarding/         # Category selector, life wheel
│   │   └── ui/                 # Button, Card, ProgressBar, etc.
│   ├── lib/                    # DB, auth, content reader, progress, streaks
│   └── types/                  # TypeScript interfaces for content
└── drizzle.config.ts
```

## Coaching Frameworks

The lesson content draws from evidence-based approaches:

- **ACT** (Acceptance and Commitment Therapy) — values clarification, psychological flexibility
- **CBT** (Cognitive Behavioral Therapy) — thought records, cognitive distortions
- **Positive Psychology** — VIA character strengths, gratitude practices
- **GROW Model** — goal setting and reality assessment
- **Motivational Interviewing** — decisional balance, exception-finding
- **Gottman Method** — communication styles, active listening
- **Attachment Theory** — relationship patterns and styles
- **Mindfulness** — body scans, emotion naming, present-moment awareness
