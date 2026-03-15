'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

const lines = [
  { text: '$ cd /this-page',                  delay: 0.2,  color: 'text-[#39ff14]' },
  { text: 'bash: cd: No such file or directory', delay: 0.5, color: 'text-red-400'   },
  { text: '',                                   delay: 0.7,  color: ''               },
  { text: '$ traceroute yoursite.dev/lost',    delay: 0.8,  color: 'text-[#39ff14]' },
  { text: 'Tracing route... 404 hops... trail goes cold.', delay: 1.1, color: 'text-[#ffb000]' },
  { text: '',                                   delay: 1.3,  color: ''               },
  { text: '# You\'ve hiked off the map.',       delay: 1.4,  color: 'text-slate-400' },
  { text: '# This page doesn\'t exist in these mountains.', delay: 1.7, color: 'text-slate-400' },
  { text: '# The good news: one click gets you back to the trail.', delay: 2.0, color: 'text-slate-400' },
]

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-20">

      {/* Big glitchy 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative mb-10 select-none"
      >
        {/* Ghost layer for glitch effect */}
        <span
          className="absolute inset-0 font-mono text-[10rem] font-black leading-none text-[#39ff14] opacity-20 blur-[2px] translate-x-[3px] -translate-y-[2px] sm:text-[14rem]"
          aria-hidden
        >
          404
        </span>
        <span
          className="absolute inset-0 font-mono text-[10rem] font-black leading-none text-red-500 opacity-15 blur-[1px] -translate-x-[3px] translate-y-[2px] sm:text-[14rem]"
          aria-hidden
        >
          404
        </span>
        <motion.span
          animate={{ textShadow: ['0 0 20px #39ff1480', '0 0 40px #39ff1440', '0 0 20px #39ff1480'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative font-mono text-[10rem] font-black leading-none text-[#39ff14] sm:text-[14rem]"
        >
          404
        </motion.span>
      </motion.div>

      {/* Terminal block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-xl rounded-lg border border-[#1c1c1c] bg-[#080808] p-6 font-mono text-sm shadow-xl"
      >
        {/* Terminal chrome */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80"   />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80"  />
          <span className="ml-3 text-xs text-slate-600">yoursite.dev — bash</span>
        </div>

        {/* Animated terminal lines */}
        <div className="space-y-1">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.3 }}
              className={`leading-relaxed ${line.color}`}
            >
              {line.text || '\u00A0'}
            </motion.p>
          ))}

          {/* Blinking cursor at the end */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            className="text-[#39ff14]"
          >
            {'$ '}<span className="animate-blink">█</span>
          </motion.p>
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Button size="lg" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" /> View My Work
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
