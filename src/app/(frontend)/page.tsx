export const revalidate = 3600 // revalidate at most once per hour

import { Suspense } from 'react'
import { HeroSection } from './sections/Hero'
import { AboutSection } from './sections/About'
import { SkillsSection } from './sections/Skills'
import { FeaturedProjects } from './sections/FeaturedProjects'
import { LatestPosts } from './sections/LatestPosts'
import { SkeletonCard } from '@/components/SkeletonCard'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <Suspense fallback={<section className="container py-20"><div className="grid gap-6 md:grid-cols-3">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div></section>}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<section className="container py-20"><div className="grid gap-6 md:grid-cols-3">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div></section>}>
        <LatestPosts />
      </Suspense>
    </>
  )
}
