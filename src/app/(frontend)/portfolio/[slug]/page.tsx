export const revalidate = 7200 // revalidate at most once every 2 hours

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageTransition } from '@/components/PageTransition'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1 })
    const project = docs[0]
    if (!project) return {}
    const cover = typeof project.coverImage === 'object' ? project.coverImage : null
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        type: 'website',
        ...(cover?.url && { images: [{ url: cover.url, alt: cover.alt || project.title }] }),
      },
      twitter: { card: 'summary_large_image' },
    }
  } catch { return {} }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1 })
  const project = docs[0]
  if (!project) notFound()

  const cover = typeof project.coverImage === 'object' ? project.coverImage : null
  const techStack = project.techStack

  return (
    <PageTransition>
      <article className="container max-w-4xl py-20">
        <Link href="/portfolio" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Portfolio
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {techStack?.map((t, i) => t.tech && <Badge key={i} variant="secondary">{t.tech}</Badge>)}
        </div>

        <div className="flex gap-3 mb-10">
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank"><Github className="mr-2 h-4 w-4" />Source Code</Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild>
              <Link href={project.liveUrl} target="_blank"><ExternalLink className="mr-2 h-4 w-4" />Live Demo</Link>
            </Button>
          )}
        </div>

        {cover?.url && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
            <Image src={cover.url} alt={cover.alt || project.title} fill className="object-cover" />
          </div>
        )}

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Screenshots</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((ss, i) => {
                const img = typeof ss.image === 'object' ? ss.image : null
                return img?.url ? (
                  <figure key={i} className="overflow-hidden rounded-lg border">
                    <div className="relative aspect-video">
                      <Image src={img.url} alt={img.alt || ''} fill className="object-cover" />
                    </div>
                    {ss.caption && <figcaption className="p-3 text-sm text-muted-foreground">{ss.caption}</figcaption>}
                  </figure>
                ) : null
              })}
            </div>
          </div>
        )}
      </article>
    </PageTransition>
  )
}
