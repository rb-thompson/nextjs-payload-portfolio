export const revalidate = 7200 // revalidate at most once every 2 hours

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Linkedin, Link2 } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PageTransition } from '@/components/PageTransition'
import { BlogCard } from '@/components/BlogCard'
import { formatDate } from '@/lib/utils'
import { siteConfig } from '@/lib/site'
import { RichTextRenderer } from './RichTextRenderer'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
  const post = docs[0]
  if (!post) return {}
  const cover = typeof post.coverImage === 'object' ? post.coverImage : null
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      authors: [siteConfig.name],
      ...(cover?.url && { images: [{ url: cover.url, alt: cover.alt || post.title }] }),
    },
    twitter: { card: 'summary_large_image' },
  }
  } catch { return {} }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug }, status: { equals: 'published' } }, limit: 1 })
  const post = docs[0]
  if (!post) notFound()

  const cover = typeof post.coverImage === 'object' ? post.coverImage : null
  const tags = post.tags as { tag?: string | null }[] | undefined
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`
  const shareText = encodeURIComponent(post.title)

  // Related posts
  const { docs: related } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' }, id: { not_equals: post.id } },
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <PageTransition>
      <article className="container max-w-3xl py-20">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          {post.publishedAt && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.publishedAt)}</span>}
          {post.readTime && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime} min read</span>}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((t, i) => t.tag && <Badge key={i} variant="outline">{t.tag}</Badge>)}
          </div>
        )}

        {cover?.url && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
            <Image
              src={cover.url}
              alt={cover.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Share buttons */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm font-medium">Share:</span>
          <Button variant="outline" size="icon" asChild>
            <Link href={`https://x.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`} target="_blank" aria-label="Share on X">
              <span className="text-sm font-bold">𝕏</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" aria-label="Share on LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={shareUrl} aria-label="Copy link">
              <Link2 className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Separator className="mb-10" />

        {/* Content */}
        <div className="rich-text prose prose-neutral dark:prose-invert max-w-none">
          <RichTextRenderer content={post.content} />
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <>
            <Separator className="my-16" />
            <h2 className="text-2xl font-bold mb-8">More Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
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
          </>
        )}
      </article>
    </PageTransition>
  )
}
