import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { ProjectCard } from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import type { Project } from '@/payload-types'

export async function FeaturedProjects() {
  let projects: Project[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      limit: 3,
      sort: '-createdAt',
    })
    projects = result.docs
  } catch { /* DB may not exist yet */ }

  if (projects.length === 0) return null

  return (
    <section className="container py-20">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <Button variant="ghost" asChild>
          <Link href="/portfolio">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
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
    </section>
  )
}
