import { useT } from '@/i18n/useT'
import ScrollReveal from './ScrollReveal'

import { FAQ_KEYS } from '@/data/faq'

export default function FAQ() {
  const { t } = useT()
  return (
    <div className="divide-y divide-border rounded-[28px] border border-border bg-[var(--color-card)]">
      {FAQ_KEYS.map((n, i) => (
        <ScrollReveal key={n} delay={i * 50}>
          <details className="group px-6 py-5 md:px-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.25rem] font-bold text-text [&::-webkit-details-marker]:hidden">
              {t(`faq.q${n}`)}
              <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full border border-border text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-muted">{t(`faq.a${n}`)}</p>
          </details>
        </ScrollReveal>
      ))}
    </div>
  )
}
