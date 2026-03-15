'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  siTypescript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siRust,
  siTailwindcss,
  siPostgresql,
  siSupabase,
  siVercel,
  siGit,
  siGithub,
  siDocker,
  siLinux,
  siFramer,
  siRailway,
  siMongodb,
  siRedis,
  siPnpm,
  siPayloadcms,
  siZod,
  siPrisma,
} from 'simple-icons'

type SimpleIcon = { title: string; hex: string; path: string }

const skills: { icon: SimpleIcon; label: string }[] = [
  { icon: siTypescript,  label: 'TypeScript'     },
  { icon: siReact,       label: 'React'           },
  { icon: siNextdotjs,   label: 'Next.js'         },
  { icon: siNodedotjs,   label: 'Node.js'         },
  { icon: siPython,      label: 'Python'          },
  { icon: siRust,        label: 'Rust'            },
  { icon: siTailwindcss, label: 'Tailwind CSS'    },
  { icon: siPostgresql,  label: 'PostgreSQL'      },
  { icon: siSupabase,    label: 'Supabase'        },
  { icon: siVercel,      label: 'Vercel'          },
  { icon: siGit,         label: 'Git'             },
  { icon: siGithub,      label: 'GitHub'          },
  { icon: siDocker,      label: 'Docker'          },
  { icon: siLinux,       label: 'Linux'           },
  { icon: siFramer,      label: 'Framer Motion'   },
  { icon: siRailway,     label: 'Railway'         },
  { icon: siMongodb,     label: 'MongoDB'         },
  { icon: siRedis,       label: 'Redis'           },
  { icon: siPnpm,        label: 'pnpm'            },
  { icon: siPayloadcms,  label: 'Payload CMS'     },
  { icon: siZod,         label: 'Zod'             },
  { icon: siPrisma,      label: 'Prisma'          },
]

/**
 * In dark mode, near-black brand icons get swapped to terminal green
 * so they're visible. In light mode brand colors are used as-is.
 */
function getBrandColor(hex: string, isDark: boolean): string {
  if (!isDark) return `#${hex}`
  const rgb = parseInt(hex, 16)
  const r   = (rgb >> 16) & 0xff
  const g   = (rgb >> 8)  & 0xff
  const b   =  rgb        & 0xff
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum < 40 ? '#39ff14' : `#${hex}`
}

function BrandIcon({ icon, size = 52 }: { icon: SimpleIcon; size?: number }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  // Default to dark before mount to avoid layout shift on dark-mode sites
  const isDark = !mounted || resolvedTheme === 'dark'
  const color = getBrandColor(icon.hex, isDark)
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
}

// Duplicate items so the CSS marquee loops seamlessly
const stream = [...skills, ...skills]

export function SkillsSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#080808] border-y border-slate-200 dark:border-[#1c1c1c] overflow-hidden">

      {/* ── Section heading ── */}
      <div className="container mb-14 text-center">
        <h2 className="inline-flex items-center gap-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white select-none">
          <span>Skills &amp; Tools</span>
          <span className="animate-blink ml-1 text-gray-900 dark:text-white">█</span>
        </h2>
        <p className="mt-3 font-mono text-xs tracking-widest text-slate-500 dark:text-sky-mist opacity-70 uppercase">
          // the stack that ships product
        </p>
      </div>

      {/* ── Scrolling stream ── */}
      <div className="relative overflow-hidden">

        {/* Soft fade on both edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-slate-50 dark:from-[#080808] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-slate-50 dark:from-[#080808] to-transparent" />

        {/* The stream itself — pauses on hover */}
        <div
          className="flex gap-14 animate-marquee hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
          aria-label="Skills and tools carousel"
        >
          {stream.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 px-1 group cursor-default"
            >
              {/* Icon — dim at rest, full opacity + slight scale on hover */}
              <div className="opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <BrandIcon icon={item.icon} size={52} />
              </div>

              {/* Label */}
              <span className="font-mono text-[10px] tracking-widest uppercase whitespace-nowrap text-amber-600 dark:text-[#ffb000] opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
