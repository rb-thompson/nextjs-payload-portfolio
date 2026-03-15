'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  title: string
  slug: string
  description: string
  coverImage?: { url?: string | null; alt?: string | null } | null
  techStack?: { tech?: string | null; id?: string | null }[] | null
  githubUrl?: string | null
  liveUrl?: string | null
}

export function ProjectCard({ title, slug, description, coverImage, techStack, githubUrl, liveUrl }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        <Link href={`/portfolio/${slug}`}>
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
          <CardTitle className="text-lg">
            <Link href={`/portfolio/${slug}`} className="hover:text-primary transition-colors">
              {title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          {techStack && techStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {techStack.map((t, i) => t.tech && (
                <Badge key={i} variant="secondary" className="text-xs">{t.tech}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="gap-2">
          {githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={githubUrl} target="_blank"><Github className="mr-1 h-4 w-4" />Code</Link>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" asChild>
              <Link href={liveUrl} target="_blank"><ExternalLink className="mr-1 h-4 w-4" />Live</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
