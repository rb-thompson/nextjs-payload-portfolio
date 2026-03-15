import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Built from the mountains.
        </p>
        <div className="flex items-center gap-4">
          <Link href={siteConfig.links.github} target="_blank" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href={siteConfig.links.twitter} target="_blank" aria-label="X (Twitter)" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-lg font-bold leading-none">𝕏</span>
          </Link>
          <Link href={siteConfig.links.linkedin} target="_blank" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href={`mailto:${siteConfig.links.email}`} aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
