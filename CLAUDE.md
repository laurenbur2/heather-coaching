## Project Identity Check

This is **heather-coaching** — Heather's integration coach website with custom scheduling and package purchasing.

# Heather Coaching — Project Directives

> **On-demand docs — load when the task matches:**
> - `docs/CREDENTIALS.md` — **load for:** SQL queries, deploying functions, API calls (gitignored)
> - `docs/SCHEMA.md` — **load for:** writing queries, modifying tables, debugging data
> - `docs/PATTERNS.md` — **load for:** writing UI code, Tailwind styling, code review
> - `docs/DEPLOY.md` — **load for:** pushing, deploying, version questions
> - `docs/INTEGRATIONS.md` — **load for:** Stripe, Resend configs
> - `docs/SETUP-TODO.md` — **load for:** pending setup steps (Supabase, Stripe, Resend credentials)

> **IMPORTANT: Setup not yet complete!**
> See `docs/SETUP-TODO.md` for credentials and services still to configure.

## Mandatory Behaviors

1. After code changes: end response with `vYYMMDD.NN H:MMa [model]` + affected URLs (read `version.json`)
2. Push immediately — GitHub Pages deploys on push to main. See `docs/DEPLOY.md`
3. CI bumps version — never bump locally
4. Run SQL migrations directly — never ask the user to run SQL manually

## Code Guards

- Filter archived items: `.filter(s => !s.is_archived)` client-side
- No personal info in consumer/public views
- `showToast()` not `alert()` in admin
- `openLightbox(url)` for images
- Tailwind: use design tokens from `@theme` block (see `docs/PATTERNS.md`). Run `npm run css:build` after new classes.

## Quick Refs

- **Product:** Integration coach site for Heather — scheduling + package purchasing
- **Tech:** Vanilla HTML/JS + Tailwind v4 | Supabase | GitHub Pages
- **Live:** https://laurenbur2.github.io/heather-coaching/ (once Pages is enabled)
- **Architecture:** Browser → GitHub Pages → Supabase (no server-side code)
- **Enabled features:** core, email (Resend), payments (Stripe), custom scheduling
- **Template source:** https://github.com/rsonnad/alpacapps-infra
