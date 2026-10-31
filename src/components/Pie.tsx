import { useId, useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { PieKey } from '@/data/menu'
import { pieSvg } from '@/lib/pie'

interface Props {
  pie: PieKey
  className?: string
  label?: string
  animate?: boolean
}

// Remounts its <svg> on every pie change (key) so toppings replay their drop-in.
export default function Pie({ pie, className = '', label, animate = true }: Props) {
  const rid = useId().replace(/:/g, '')
  const reduce = useReducedMotion()
  const html = useMemo(() => pieSvg(pie, `p${rid}${pie}`, animate && !reduce), [pie, rid, animate, reduce])
  return (
    <svg
      key={pie}
      viewBox="0 0 400 400"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
