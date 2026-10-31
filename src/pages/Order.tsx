import { ArrowUpRight, Phone } from 'lucide-react'
import SEO from '@/components/SEO'
import SectionHead from '@/components/SectionHead'
import ScrollReveal from '@/components/ScrollReveal'
import Pie from '@/components/Pie'
import LiveStatus from '@/components/LiveStatus'
import { site, primaryLocation, telHref } from '@/data/site'
import { useT } from '@/i18n/useT'

export default function Order() {
  const { t } = useT()
  const l = primaryLocation
  return (
    <>
      <SEO
        title="Order Online | Pizzeria El Chocolate — Pickup & Delivery"
        description="Order Pizzeria El Chocolate's Cuban pizza for pickup or delivery online through Slice or DoorDash, or call (239) 946-9006. 899 Pondella Rd, North Fort Myers, FL."
        path="/order"
        titleEs="Ordenar en línea | Pizzeria El Chocolate — Para recoger y a domicilio"
        descriptionEs="Ordena la pizza cubana de Pizzeria El Chocolate para recoger o a domicilio por Slice o DoorDash, o llama al (239) 946-9006."
      />
      <section className="section">
        <div className="container">
          <SectionHead as="h1" kicker={t('or.kicker')} title={t('or.title')} sub={t('or.lede')} action={<LiveStatus className="chip text-text" />} />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {site.order.map((o, i) => (
              <ScrollReveal key={o.id} delay={i * 80}>
                <a
                  href={o.url}
                  target="_blank"
                  rel="noopener"
                  className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[32px] p-8 no-underline shadow-[var(--shadow-md)] transition hover:-translate-y-1 ${
                    o.primary ? 'bg-tomato text-white' : 'border border-border bg-[var(--color-card)] text-text'
                  }`}
                >
                  <span aria-hidden="true" className="absolute -bottom-16 -right-16 h-56 w-56 opacity-80 transition-transform duration-700 group-hover:rotate-90">
                    <Pie pie={o.primary ? 'pepperoni' : 'jamon'} animate={false} className="h-full w-full" />
                  </span>
                  <span className={`text-[0.74rem] font-bold uppercase tracking-[0.2em] ${o.primary ? 'text-white/80' : 'text-muted'}`}>{t('or.partner')}</span>
                  <span className="relative">
                    <span className="flex items-center gap-2 font-display text-[2.6rem] font-extrabold leading-none">{o.label} <ArrowUpRight size={30} /></span>
                    <span className={`mt-2 block ${o.primary ? 'text-white/85' : 'text-muted'}`}>{t('or.partnerDesc')}</span>
                  </span>
                </a>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={160}>
              <a href={telHref(l.phone)} className="group flex min-h-[260px] flex-col justify-between rounded-[32px] bg-mango p-8 text-choc-800 no-underline shadow-[var(--shadow-md)] transition hover:-translate-y-1">
                <span className="text-[0.74rem] font-bold uppercase tracking-[0.2em]">{t('or.phone')}</span>
                <span>
                  <span className="flex items-center gap-3 font-display text-[2.2rem] font-extrabold leading-none"><Phone size={28} /> {l.phone}</span>
                  <span className="mt-2 block">{t('or.phoneDesc')}</span>
                </span>
              </a>
            </ScrollReveal>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-faint">{t('or.note')}</p>
        </div>
      </section>
    </>
  )
}
