import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { BlogCard } from '@/components/BlogCard'
import { Button } from '@/components/ui/button'
import type { Post } from '@/payload-types'

export async function LatestPosts() {
  let posts: Post[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 3,
      sort: '-publishedAt',
    })
    posts = result.docs
  } catch { /* DB may not exist yet */ }

  if (posts.length === 0) return null

  return (
    <section className="border-t bg-muted/50 py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
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
      </div>
    </section>
  )
}
