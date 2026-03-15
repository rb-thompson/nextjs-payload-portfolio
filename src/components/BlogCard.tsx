'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  title: string
  slug: string
  excerpt: string
  coverImage?: { url?: string | null; alt?: string | null } | null
  publishedAt?: string | null
  readTime?: number | null
  tags?: { tag?: string | null; id?: string | null }[] | null
}

export function BlogCard({ title, slug, excerpt, coverImage, publishedAt, readTime, tags }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        <Link href={`/blog/${slug}`}>
          <div className="relative aspect-video overflow-hidden bg-muted">
            {coverImage?.url ? (
              <Image
                src={coverImage.url}
                alt={coverImage.alt || title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">No image</div>
            )}
          </div>
        </Link>
        <CardHeader>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
            {publishedAt && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(publishedAt)}</span>}
            {readTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{readTime} min read</span>}
          </div>
          <CardTitle className="text-lg">
            <Link href={`/blog/${slug}`} className="hover:text-primary transition-colors">{title}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t, i) => t.tag && <Badge key={i} variant="outline" className="text-xs">{t.tag}</Badge>)}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
