import type { ReactNode } from 'react'
import ScrollReveal from './ScrollReveal'

interface Props { kicker: string; title: string; sub?: string; action?: ReactNode; as?: 'h1' | 'h2'; center?: boolean }

// Title accepts a trusted <em> from copy.ts for the italic accent word.
export default function SectionHead({ kicker, title, sub, action, as = 'h2', center }: Props) {
  const H = as
  return (
    <ScrollReveal className={`mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14 ${center ? 'justify-center text-center' : ''}`}>
      <div className={center ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
        <p className="kicker mb-3">{kicker}</p>
        <H
          className={`${as === 'h1' ? 'text-[clamp(2.6rem,7vw,5.2rem)]' : 'h-display'} [&_em]:italic [&_em]:text-tomato [[data-theme=dark]_&_em]:text-mango`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {sub && <p className={`lede mt-4 ${center ? 'mx-auto' : ''}`}>{sub}</p>}
      </div>
      {action}
    </ScrollReveal>
  )
}
