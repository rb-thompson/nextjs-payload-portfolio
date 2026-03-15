/**
 * ─────────────────────────────────────────────
 *  SITE CONFIGURATION — edit this file first!
 * ─────────────────────────────────────────────
 * All personal content lives here. Update every
 * field before deploying your portfolio.
 */
export const siteConfig = {
  name: 'Your Name',
  handle: '@yourhandle',
  title: 'Your Name — Developer',
  description:
    'Full-stack developer building digital products and shipping things that matter.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-photo.jpg',
  links: {
    github:   'https://github.com/yourusername',
    twitter:  'https://x.com/yourhandle',
    linkedin: 'https://www.linkedin.com/in/yourprofile',
    email:    'hello@yourdomain.com',
  },
  bio: `Add your bio here. Tell visitors who you are, what you build,
and what makes you different. Keep it human — this shows up on
the homepage and the contact page.`,
} as const
