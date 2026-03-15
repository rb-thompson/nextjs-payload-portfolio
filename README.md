# Payload Portfolio Starter

A production-ready portfolio and blog template built with **Next.js 15**, **Payload CMS v3**, and **Vercel**. Full admin dashboard, type-safe queries, ISR caching, dark/light mode, and an SEO-ready foundation — ready to fork and make yours.

**[Live Demo →](https://rbthompson.dev)** &nbsp;|&nbsp; **[Deploy to Vercel](#deploy-to-vercel)**

---

## What's Included

- **Homepage** — hero, about, animated skills stream, featured projects, latest posts
- **Portfolio** — filterable project grid with individual project pages
- **Blog** — post grid with full rich-text post pages, read time, tags, share buttons
- **Contact** — contact form with Payload backend, availability sidebar, resume download
- **Admin** — full Payload CMS dashboard at `/admin` for managing all content
- **SEO** — sitemap, robots.txt, per-page Open Graph metadata, Twitter cards, favicon
- **Dark/light mode** — system-default with manual toggle
- **ISR caching** — pages pre-built and revalidated; no cold starts for visitors

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS v3 (embedded) |
| Database | Neon Postgres (serverless) |
| Image Storage | Vercel Blob |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Brand Icons | simple-icons |
| Deployment | Vercel |

---

## Prerequisites

- **Node.js** 20+
- **pnpm** (`npm install -g pnpm`)
- A **[Neon](https://neon.tech)** account (free tier works)
- A **[Vercel](https://vercel.com)** account (free tier works)

---

## Setup Guide

### 1. Clone and install

```bash
git clone https://github.com/rb-thompson/nextjs-payload-portfolio.git
cd payload-portfolio-starter
pnpm install
```

### 2. Configure your environment

Copy the example env file:

```bash
cp .env.example .env
```

Open `.env` and fill in the values:

```env
# Generate a random 32+ character string — used to sign Payload sessions
PAYLOAD_SECRET=your-secret-key-at-least-32-characters-long

# Your Neon Postgres connection string (see step 3)
DATABASE_URI=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# The public URL of your site (use http://localhost:3000 for local dev)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Your Vercel Blob read/write token (see step 4)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

### 3. Create a Neon database

1. Go to [console.neon.tech](https://console.neon.tech) and create a new project
2. Copy the **connection string** from the Connection Details panel
3. Paste it as `DATABASE_URI` in your `.env`

### 4. Create a Vercel Blob store

1. Go to your [Vercel dashboard](https://vercel.com/dashboard) → Storage → Create → Blob
2. Give it a name (e.g. `portfolio-media`)
3. Copy the **Read/Write Token** from the store's settings
4. Paste it as `BLOB_READ_WRITE_TOKEN` in your `.env`

### 5. Personalise `site.ts`

Open `src/lib/site.ts` — this is the single file that controls your personal info:

```ts
export const siteConfig = {
  name: 'Your Name',
  handle: '@yourhandle',
  title: 'Your Name — Developer',
  description: 'Your one-liner description.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-photo.jpg',
  links: {
    github:   'https://github.com/yourusername',
    twitter:  'https://x.com/yourhandle',
    linkedin: 'https://www.linkedin.com/in/yourprofile',
    email:    'hello@yourdomain.com',
  },
  bio: `Your bio here.`,
}
```

### 6. Replace the images

Drop your own files into `/public`:

| File | Purpose | Recommended size |
|---|---|---|
| `hero-bg.jpg` | Hero section background | 1920×1080 or wider |
| `og-photo.jpg` | Social share preview image | 1200×630+ |
| `resume.pdf` | Downloadable resume | — |

After replacing `og-photo.jpg`, regenerate the favicon and Apple touch icon:

```bash
node -e "
import sharp from 'sharp'
await sharp('public/og-photo.jpg').resize(32, 32, { fit: 'cover', position: 'top' }).png().toFile('src/app/icon.png')
await sharp('public/og-photo.jpg').resize(180, 180, { fit: 'cover', position: 'top' }).png().toFile('src/app/apple-icon.png')
console.log('done')
"
```

### 7. Start the dev server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) — the site is running.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) — first visit creates your admin account.

### 8. Seed example content (optional)

The seed script creates 3 example projects and 2 blog posts so the homepage looks populated immediately:

```bash
pnpm seed
```

Default admin credentials created by the seed: `admin@example.com` / `changeme123`
**Change the password after your first login.**

---

## Deploy to Vercel

### Option A — One-click (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rb-thompson/nextjs-payload-portfolio)

Add your environment variables in the Vercel UI during setup.

### Option B — Manual

1. Push your repo to GitHub
2. Import it in [Vercel](https://vercel.com/new)
3. Add environment variables (same as your `.env`, but set `NEXT_PUBLIC_SITE_URL` to your production domain)
4. Deploy

### Post-deploy

After deploying, run the seed against your production database by temporarily setting `DATABASE_URI` in your local `.env` to the production Neon connection string and running `pnpm seed`.

---

## Customisation Guide

### Adding a project

Go to `/admin` → Projects → Add New. Fill in title, slug, description, tech stack, GitHub/live URLs, and a cover image. Check "Featured" to show it on the homepage.

### Writing a blog post

Go to `/admin` → Posts → Add New. Write in the rich text editor. Set status to "Published" and add a published date for it to appear on the site.

### Changing the skills stream

Edit `src/app/(frontend)/sections/Skills.tsx`. The `skills` array at the top uses [simple-icons](https://simpleicons.org/) — add or remove entries to match your actual stack.

### Changing navigation links

Edit the `links` array in `src/components/Navbar.tsx`.

### Updating metadata keywords

Edit the `keywords` array in `src/app/layout.tsx`.

---

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing site
│   │   ├── sections/        # Homepage sections (Hero, About, Skills, etc.)
│   │   ├── portfolio/       # Portfolio pages
│   │   ├── blog/            # Blog pages
│   │   ├── contact/         # Contact page
│   │   └── not-found.tsx    # Custom 404
│   ├── (payload)/           # Payload CMS admin routes
│   ├── sitemap.ts           # Auto-generated sitemap
│   ├── robots.ts            # robots.txt
│   └── layout.tsx           # Root layout + metadata
├── collections/             # Payload CMS collections (Posts, Projects, etc.)
├── components/              # Shared UI components
├── lib/
│   ├── site.ts              # ← Your personal config lives here
│   └── payload.ts           # Payload client helper
├── payload-types.ts         # Auto-generated types (run: pnpm generate:types)
└── seed.ts                  # Database seed script
```

---

## Regenerating types

If you modify a Payload collection, regenerate the TypeScript types:

```bash
pnpm generate:types
```

---

## License

MIT — use it, fork it, ship it. Attribution appreciated but not required.

---

Built with ❤️ from the mountains. Original by [R. Brandon Thompson](https://rbthompson.dev).
