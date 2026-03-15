import type { Metadata } from 'next'
import { Mail, MapPin, Github, Download } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import { ContactForm } from '@/components/ContactForm'
import { PageTransition } from '@/components/PageTransition'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Open to project collaborations, freelance work, and conversations about building software.',
  openGraph: {
    title: 'Contact',
    description: 'Open to project collaborations, freelance work, and conversations about building software.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="container max-w-4xl py-20">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Have a project idea, question, or just want to say hello? I&apos;d love to hear from you.
        </p>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">

            {/* Availability */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Availability</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Available for new work</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Open to freelance projects, contract work, and long-term collaborations. I typically respond within 24–48 hours.
              </p>
            </div>

            <Separator />

            {/* What I'm looking for */}
            <div>
              <h2 className="text-xl font-semibold mb-3">What I&apos;m Looking For</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Full-stack web apps (Next.js, TypeScript, Node.js)</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Greenfield projects and MVPs</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Long-term product partnerships</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Open source collaboration</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Interesting problems worth solving</li>
              </ul>
            </div>

            <Separator />

            {/* Contact links */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Southwest Virginia, USA</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <Link href={`mailto:${siteConfig.links.email}`} className="hover:text-primary transition-colors break-all">
                  {siteConfig.links.email}
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Github className="h-4 w-4 text-muted-foreground shrink-0" />
                <Link href={siteConfig.links.github} target="_blank" className="hover:text-primary transition-colors">
                  {siteConfig.handle}
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="h-4 w-4 text-muted-foreground flex items-center justify-center text-sm font-bold shrink-0">𝕏</span>
                <Link href={siteConfig.links.twitter} target="_blank" className="hover:text-primary transition-colors">
                  {siteConfig.handle}
                </Link>
              </div>
            </div>

            <Separator />

            {/* Resume */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Resume</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Want the full picture? Grab my resume.
              </p>
              <a
                href="/resume.pdf"
                download="Resume.pdf"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
