import { Phone } from 'lucide-react'
import { useT } from '@/i18n/useT'
import { primaryLocation, primaryOrder, telHref } from '@/data/site'
import Pie from './Pie'
import ScrollReveal from './ScrollReveal'

export default function CTABanner() {
  const { t } = useT()
  return (
    <section className="container py-16 md:py-24">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[36px] bg-tomato px-7 py-12 text-white md:px-14 md:py-16">
          <div aria-hidden="true" className="tile-pattern absolute inset-0 text-white opacity-[0.08]" />
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-[420px] w-[420px] animate-spin-slow opacity-90 md:-right-10">
            <Pie pie="pepperoni" animate={false} className="h-full w-full drop-shadow-2xl" />
          </div>
          <div className="relative max-w-xl">
            <h2 className="text-[clamp(2.4rem,6vw,4.2rem)] text-white">{t('cta.banner.t')}</h2>
            <p className="mt-4 text-[1.1rem] text-white/85">{t('cta.banner.d')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={primaryOrder.url} target="_blank" rel="noopener" className="btn btn-mango btn-lg">{t('cta.orderOnline')} →</a>
              <a href={telHref(primaryLocation.phone)} className="btn btn-on-dark btn-lg"><Phone size={18} /> {primaryLocation.phone}</a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
