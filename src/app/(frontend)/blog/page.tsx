export const revalidate = 3600 // revalidate at most once per hour

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPayloadClient } from '@/lib/payload'
import { BlogCard } from '@/components/BlogCard'
import { SkeletonCard } from '@/components/SkeletonCard'
import { PageTransition } from '@/components/PageTransition'
import type { Post } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on development, tooling, and building software.',
  openGraph: {
    title: 'Blog',
    description: 'Thoughts on development, TypeScript, Next.js, and building software.',
    type: 'website',
  },
}

async function PostGrid() {
  let posts: Post[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 50,
      sort: '-publishedAt',
    })
    posts = result.docs
  } catch { /* tables may not exist yet */ }

  if (posts.length === 0) {
    return <p className="text-center text-muted-foreground py-12">No posts yet. Check back soon!</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <BlogCard
          key={p.id}
          title={p.title}
          slug={p.slug}
          excerpt={p.excerpt}
          coverImage={typeof p.coverImage === 'object' ? p.coverImage : null}
          publishedAt={p.publishedAt}
          readTime={p.readTime}
          tags={p.tags}
        />
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <PageTransition>
      <section className="container py-20">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground mb-10">Thoughts on indie dev, tech, and building from rural Virginia.</p>
        <Suspense fallback={<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div>}>
          <PostGrid />
        </Suspense>
      </section>
    </PageTransition>
  )
}
