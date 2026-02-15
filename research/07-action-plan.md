# Action Plan

## Current Phase: Pre-Build Research & Validation

---

## Step 1: Install Strategy Skill ✅ DONE

```bash
npx skills add https://github.com/lyndonkl/claude --skill strategy-and-competitive-analysis
```

---

## Step 2: Deploy Survey (1-2 days)

- [ ] Copy survey questions into Typeform (preferred — one question at a time format)
  - Alternative: Google Forms (break into 3 sections: "About You", "Your Experience", "What Would Help")
- [ ] Post to Reddit subreddits (stagger: 1-2 subs per day across 5-7 days)
- [ ] Share with personal network
- [ ] Goal: 50-100 responses within 2 weeks

---

## Step 3: Analyze Results (after survey closes)

- [ ] Map responses to the 5 personas
- [ ] Identify top 2 categories to launch with
- [ ] Confirm pricing tier model
- [ ] Extract marketing language from open-ended responses

---

## Step 4: Content Creation (2-3 weeks)

- [ ] Write content for the top 2 coaching categories
- [ ] Create assessment tools (Life Satisfaction Wheel, Values Sort, etc.)
- [ ] Build out first 2 modules per category (4 modules total for MVP)

---

## Step 5: Design & Build MVP (after content is ready)

- [ ] Wireframes for onboarding, daily check-in, progress dashboard
- [ ] Next.js App Router, mobile-first responsive
- [ ] Structured content delivery + progress tracking
- [ ] Streak system + milestone badges

---

## Tech Plan (When Ready to Build)

- **Stack:** Next.js App Router, mobile-first responsive design
- **Content first:** Structured exercises, assessments, journaling prompts, progress tracking
- **AI later:** Add Claude API for personalized coaching conversations once content is validated
- **Key MVP features:**
  - Onboarding assessment
  - Daily check-ins (5-10 min)
  - Progress dashboard
  - Category selection
  - Streak tracking + milestone badges

---

## Decisions Made

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Platform | Web app (Next.js) | Responsive, mobile-first, fastest to build |
| AI strategy | Structured content first, AI later | Validate content before adding AI complexity |
| Launch categories | TBD (pending survey) | Likely Career + Personal Growth |
| Pricing model | Tiered: Free / $20 / $35 | Covers all persona segments |
| Session length | 5-10 min daily | Research-backed optimal for mobile coaching |
| Current phase | Research & validation | Survey first, build second |
