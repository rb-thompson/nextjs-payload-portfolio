# AGENT.md — AI Implementation Guide

This file is for AI agents (Claude, Codex, Cursor, etc.) implementing this portfolio template for a user. Read this before touching anything else.

---

## What This Is

A full-stack portfolio + blog built with:
- **Next.js 15** (App Router, ISR, Server Components)
- **Payload CMS v3** (embedded into the Next.js app at `/admin`)
- **Neon Postgres** (serverless Postgres via `@payloadcms/db-postgres`)
- **Vercel Blob** (image storage via `@payloadcms/storage-vercel-blob`)
- **Vercel** (deployment target)

The CMS admin lives at `/admin` — Payload's route group is `src/app/(payload)/`. The public site is `src/app/(frontend)/`.

---

## The One File to Rule Them All

**`src/lib/site.ts`** — every piece of personal content (name, bio, links, OG image path) lives here. Update this first. Everything else pulls from `siteConfig`.

---

## Checklist for Implementing for a New User

Work through these in order:

### Step 1 — Gather user info
Before writing any code, collect:
- [ ] Full name
- [ ] One-line bio (can expand later)
- [ ] Social handles: GitHub username, Twitter/X handle, LinkedIn URL
- [ ] Contact email
- [ ] Their domain (or use `localhost:3000` for now)
- [ ] A hero background image (landscape photo, or generate a placeholder)
- [ ] An OG/profile photo (used for favicon + social cards)
- [ ] Resume PDF (optional)

### Step 2 — Update `src/lib/site.ts`
Replace all placeholder values with the user's actual info. This is the only file that needs personal content — don't scatter it elsewhere.

### Step 3 — Set up environment variables
Required `.env` keys:
```
PAYLOAD_SECRET         # 32+ char random string (use: openssl rand -base64 32)
DATABASE_URI           # Neon Postgres connection string
NEXT_PUBLIC_SITE_URL   # https://theirdomain.com (or http://localhost:3000)
BLOB_READ_WRITE_TOKEN  # Vercel Blob token
```

### Step 4 — Replace images
- `public/hero-bg.jpg` — hero background (1920×1080+, landscape)
- `public/og-photo.jpg` — OG card + favicon source (1200×630+)
- `public/resume.pdf` — resume (optional)

After replacing `og-photo.jpg`, regenerate favicons:
```bash
node -e "
import sharp from 'sharp'
await sharp('public/og-photo.jpg').resize(32, 32, { fit: 'cover', position: 'top' }).png().toFile('src/app/icon.png')
await sharp('public/og-photo.jpg').resize(180, 180, { fit: 'cover', position: 'top' }).png().toFile('src/app/apple-icon.png')
console.log('done')
"
```

### Step 5 — Update the Skills stream
Edit `src/app/(frontend)/sections/Skills.tsx`. The `skills` array at the top maps to [simple-icons](https://simpleicons.org/) identifiers. Match it to the user's actual tech stack.

To find the right icon key:
```bash
node -e "import('simple-icons').then(m => console.log(Object.keys(m).filter(k => k.toLowerCase().includes('QUERY'))))"
```

### Step 6 — Seed the database
```bash
pnpm seed
```
This creates an admin user and example projects/posts. After seeding, log in at `/admin` and replace the example content with the user's real projects and posts.

### Step 7 — Build check
```bash
pnpm build
```
Must compile with zero errors before deploying. Fix any TypeScript issues.

### Step 8 — Deploy
Push to GitHub, import in Vercel, add environment variables, deploy.

---

## Architecture Notes

### Data flow
1. Payload collections defined in `src/collections/` — Posts, Projects, Media, Users, ContactMessages
2. The frontend queries Payload via `getPayloadClient()` from `src/lib/payload.ts`
3. TypeScript types are auto-generated in `src/payload-types.ts` — run `pnpm generate:types` after changing collections
4. Pages use ISR (`export const revalidate = 3600`) — content revalidates automatically

### CMS admin
- URL: `/admin`
- Collections: Users, Media, Posts, Projects, Contact Messages
- First visit after setting up env creates the initial admin account
- Or use `pnpm seed` which creates `admin@example.com / changeme123`

### Image storage
Images uploaded through the Payload admin go to Vercel Blob. The `BLOB_READ_WRITE_TOKEN` env var is required. Without it, image uploads will fail silently in development.

### Payload config
`src/payload.config.ts` — database adapter, collections, plugins. If you add a collection, also add it to the nav in the config's `admin.components` if you want it in the sidebar.

---

## Common Gotchas

**`DATABASE_URI` must be a Postgres connection string.**
The `.env.example` shows `postgresql://...` format. Do not use a SQLite file path — the project uses `@payloadcms/db-postgres`, not SQLite.

**`PAYLOAD_SECRET` must be at least 32 characters.**
Use `openssl rand -base64 32` to generate one. Short secrets cause Payload to throw at startup.

**Images won't upload locally without `BLOB_READ_WRITE_TOKEN`.**
For local dev, either add a real Blob token or upload images directly in the Payload admin when connected to the production database.

**Run `pnpm generate:types` after any collection change.**
The types in `src/payload-types.ts` are static. They won't update automatically. If you add a field, run the generate command or TypeScript will complain.

**The `(frontend)` and `(payload)` folders are Next.js route groups.**
They don't affect URL paths — they just separate the public site layout from the CMS admin layout. Don't move files between them without updating the layouts.

**`not-found.tsx` in `(frontend)` handles 404s for all frontend routes.**
Explicitly calling `notFound()` from a page, or navigating to an unknown URL, will show the custom terminal-style 404 page.

**ISR revalidation window is 1 hour for listing pages, 2 hours for detail pages.**
If the user updates content in Payload and doesn't see it immediately, tell them to wait up to an hour or trigger a manual Vercel redeploy.

---

## Personalisation Beyond `site.ts`

| What to change | Where |
|---|---|
| Hero copy | `src/app/(frontend)/sections/Hero.tsx` |
| About bio | `src/lib/site.ts` → `bio` field |
| Skills/tools | `src/app/(frontend)/sections/Skills.tsx` → `skills` array |
| Nav links | `src/components/Navbar.tsx` → `links` array |
| Footer links | Pulls from `siteConfig.links` automatically |
| SEO keywords | `src/app/layout.tsx` → `keywords` array |
| Contact availability | `src/app/(frontend)/contact/page.tsx` → sidebar section |
| 404 page messages | `src/app/(frontend)/not-found.tsx` → `lines` array |

---

## File You Should NOT Touch

- `src/payload-types.ts` — auto-generated, gets overwritten by `pnpm generate:types`
- `src/app/(payload)/` — Payload admin internals
- `src/payload.config.ts` — only touch this to add new collections or change DB settings

---

Good luck. Ship it. ⚡
