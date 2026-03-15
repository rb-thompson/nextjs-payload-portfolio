export const revalidate = 3600 // revalidate at most once per hour

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPayloadClient } from '@/lib/payload'
import { ProjectCard } from '@/components/ProjectCard'
import { SkeletonCard } from '@/components/SkeletonCard'
import { PageTransition } from '@/components/PageTransition'
import { PortfolioFilter } from './PortfolioFilter'
import type { Project } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Projects and work — full-stack web apps, indie tools, and open-source work.',
  openGraph: {
    title: 'Portfolio',
    description: 'Projects and open-source work.',
    type: 'website',
  },
}

async function ProjectGrid({ category }: { category?: string }) {
  let projects: Project[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      ...(category && category !== 'all' ? { where: { category: { equals: category } } } : {}),
      limit: 50,
      sort: 'order',
    })
    projects = result.docs
  } catch { /* tables may not exist yet */ }

  if (projects.length === 0) {
    return <p className="text-center text-muted-foreground py-12">No projects yet. Check back soon!</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          title={p.title}
          slug={p.slug}
          description={p.description}
          coverImage={typeof p.coverImage === 'object' ? p.coverImage : null}
          techStack={p.techStack}
          githubUrl={p.githubUrl}
          liveUrl={p.liveUrl}
        />
      ))}
    </div>
  )
}

export default async function PortfolioPage(props: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await props.searchParams
  return (
    <PageTransition>
      <section className="container py-20">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Portfolio</h1>
        <p className="text-lg text-muted-foreground mb-10">Things I&apos;ve built, shipped, and tinkered with.</p>
        <PortfolioFilter active={category || 'all'} />
        <Suspense fallback={<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div>}>
          <ProjectGrid category={category} />
        </Suspense>
      </section>
    </PageTransition>
  )
}
