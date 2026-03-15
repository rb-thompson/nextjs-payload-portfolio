import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { siteConfig } from '@/lib/site'
import type { Project, Post } from '@/payload-types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url

  // Static routes
  const static_routes: MetadataRoute.Sitemap = [
    { url: base,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/blog`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Dynamic project pages
  let projectRoutes: MetadataRoute.Sitemap = []
  let postRoutes: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayloadClient()

    const projects = await payload.find({ collection: 'projects', limit: 100, depth: 0 })
    projectRoutes = projects.docs.map((p: Project) => ({
      url: `${base}/portfolio/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    const posts = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 0,
    })
    postRoutes = posts.docs.map((p: Post) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch { /* DB unavailable — only serve static routes */ }

  return [...static_routes, ...projectRoutes, ...postRoutes]
}
