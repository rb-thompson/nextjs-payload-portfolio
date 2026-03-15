'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'CLI', value: 'cli' },
  { label: 'Open Source', value: 'oss' },
]

export function PortfolioFilter({ active }: { active: string }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={active === f.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            const params = f.value === 'all' ? '' : `?category=${f.value}`
            router.push(`${pathname}${params}`)
          }}
        >
          {f.label}
        </Button>
      ))}
    </div>
  )
}
