/**
 * ─────────────────────────────────────────────
 *  DATABASE SEED — example content
 * ─────────────────────────────────────────────
 * Run once after setting up your database:
 *   pnpm seed
 *
 * This creates:
 *  - 1 admin user (change the password after first login!)
 *  - 3 example projects
 *  - 2 example blog posts
 *
 * Replace this content with your own projects and posts,
 * or add them directly through the Payload admin at /admin.
 */

import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding database...')

  // ── Admin user ──────────────────────────────────────────────────────────────
  // IMPORTANT: Change this password after your first login at /admin
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'changeme123',
        name: 'Admin',
      },
    })
    console.log('✅ Admin user created → admin@example.com / changeme123')
    console.log('   ⚠️  Change this password at /admin after first login!')
  } catch {
    console.log('ℹ️  Admin user already exists')
  }

  // ── Example projects ────────────────────────────────────────────────────────
  const projects = [
    {
      title: 'SaaS Starter Kit',
      slug: 'saas-starter-kit',
      description:
        'A production-ready SaaS boilerplate with authentication, billing, and a dashboard — so you can skip the plumbing and ship the product.',
      techStack: [
        { tech: 'Next.js' },
        { tech: 'TypeScript' },
        { tech: 'Tailwind CSS' },
        { tech: 'Stripe' },
        { tech: 'Supabase' },
      ],
      githubUrl: 'https://github.com/yourusername/saas-starter',
      liveUrl:   'https://saas-starter.vercel.app',
      featured:  true,
      status:    'active' as const,
      category:  'web'   as const,
      order:     1,
    },
    {
      title: 'Open Source Component Library',
      slug: 'component-library',
      description:
        'A collection of accessible, composable React components built on Radix UI primitives with a clean design system.',
      techStack: [
        { tech: 'React' },
        { tech: 'TypeScript' },
        { tech: 'Radix UI' },
        { tech: 'Storybook' },
      ],
      githubUrl: 'https://github.com/yourusername/components',
      liveUrl:   'https://components.yourdomain.com',
      featured:  true,
      status:    'active' as const,
      category:  'oss'   as const,
      order:     2,
    },
    {
      title: 'CLI Dev Toolkit',
      slug: 'cli-dev-toolkit',
      description:
        'A command-line tool that automates repetitive project scaffolding tasks — new routes, components, API handlers — in seconds.',
      techStack: [
        { tech: 'Node.js' },
        { tech: 'TypeScript' },
        { tech: 'Commander.js' },
      ],
      githubUrl: 'https://github.com/yourusername/cli-toolkit',
      featured:  true,
      status:    'active' as const,
      category:  'cli'   as const,
      order:     3,
    },
  ]

  for (const project of projects) {
    try {
      await payload.create({ collection: 'projects', data: project })
      console.log(`✅ Project: ${project.title}`)
    } catch {
      console.log(`ℹ️  Project already exists: ${project.title}`)
    }
  }

  // ── Example blog posts ──────────────────────────────────────────────────────
  const posts = [
    {
      title: 'Why I Built My Portfolio with Next.js and Payload CMS',
      slug: 'why-nextjs-payload-cms',
      excerpt:
        'I tried WordPress, Ghost, and a dozen static site generators. Here\'s why I landed on Next.js + Payload CMS — and why it\'s the best setup I\'ve used.',
      status:      'published' as const,
      publishedAt: '2025-11-01T10:00:00.000Z',
      readTime:    5,
      tags:        [{ tag: 'Next.js' }, { tag: 'Payload CMS' }, { tag: 'Portfolio' }],
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'After years of fighting CMS platforms that wanted to own my content and lock me into their ecosystem, I finally built something I actually enjoy working with. The combination of Next.js 15 and Payload CMS v3 is, frankly, a superpower.' }],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'The Problem with Most Portfolio Setups' }],
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'WordPress is a monolith. Ghost is beautiful but opinionated. Static site generators are fast but editing markdown files to update your portfolio is a pain in production. I wanted a setup where I could write in a proper admin UI, have full type safety, and deploy to the edge.' }],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Enter Payload v3' }],
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Payload CMS v3 embeds directly into your Next.js app as a route group. You get a full admin dashboard at /admin, a type-safe ORM, REST and GraphQL APIs, and rich text editing — all without spinning up a separate service. Your CMS is just your app.' }],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'The Result' }],
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'One git push deploys everything to Vercel. Content lives in Neon Postgres. Images go to Vercel Blob. The whole stack is serverless, fast, and I own every byte of my data. That\'s the setup described in this template — fork it and make it yours.' }],
            },
          ],
          direction: 'ltr',
          format:    '',
          indent:    0,
          version:   1,
        },
      },
    },
    {
      title: 'Shipping Fast as a Solo Developer',
      slug: 'shipping-fast-solo-dev',
      excerpt:
        'The frameworks, habits, and shortcuts I use to go from idea to deployed product in days instead of months.',
      status:      'published' as const,
      publishedAt: '2025-12-10T10:00:00.000Z',
      readTime:    6,
      tags:        [{ tag: 'Productivity' }, { tag: 'Indie Dev' }, { tag: 'Tooling' }],
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'The biggest lesson I\'ve learned as a solo developer: speed isn\'t about working harder, it\'s about eliminating the decisions that don\'t matter.' }],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Lock in Your Stack' }],
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'I use the same core stack for almost every project: Next.js, TypeScript, Tailwind CSS, Postgres. When you stop evaluating tools for every project, you go faster. The familiarity compounds.' }],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Start with the Data Model' }],
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Before writing a component, I sketch the data. What does this thing actually store? What are the relationships? Getting this right early prevents painful refactors later. With Payload CMS, your collections ARE your data model — define them once and the admin, API, and types all follow.' }],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Ship the Ugly Version First' }],
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Version one\'s job is to exist. Get it deployed, share it with two people, and get feedback. The polish comes after you know people want it. I\'ve abandoned too many perfect-but-never-shipped projects to count.' }],
            },
          ],
          direction: 'ltr',
          format:    '',
          indent:    0,
          version:   1,
        },
      },
    },
  ]

  for (const post of posts) {
    try {
      await payload.create({ collection: 'posts', data: post as any })
      console.log(`✅ Post: ${post.title}`)
    } catch {
      console.log(`ℹ️  Post already exists: ${post.title}`)
    }
  }

  console.log('\n🎉 Seeding complete! Visit /admin to manage your content.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
