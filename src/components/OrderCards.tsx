import { ShoppingBag, Phone, Store } from 'lucide-react'
import { useT } from '@/i18n/useT'
import { site, primaryLocation, telHref, mapsDirections } from '@/data/site'
import ScrollReveal from './ScrollReveal'

export default function OrderCards() {
  const { t } = useT()
  const l = primaryLocation
  const card = 'group relative flex h-full flex-col rounded-[28px] border border-border bg-[var(--color-card)] p-7 shadow-[var(--shadow-md)]'
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <ScrollReveal className="h-full">
        <div className={card}>
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-tomato text-white"><ShoppingBag size={22} /></span>
          <h3 className="text-[1.7rem]">{t('order.pickup.t')}</h3>
          <p className="mt-2 flex-1 text-muted">{t('order.pickup.d')}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.order.map((o) => (
              <a key={o.id} href={o.url} target="_blank" rel="noopener" className={`btn btn-sm ${o.primary ? 'btn-hot' : 'btn-ghost'}`}>{o.label} ↗</a>
            ))}
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal className="h-full" delay={90}>
        <div className={card}>
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-mango text-choc-800"><Phone size={22} /></span>
          <h3 className="text-[1.7rem]">{t('order.call.t')}</h3>
          <p className="mt-2 flex-1 text-muted">{t('order.call.d')}</p>
          <a href={telHref(l.phone)} className="mt-6 font-display text-[1.7rem] font-extrabold text-primary no-underline">{l.phone}</a>
        </div>
      </ScrollReveal>
      <ScrollReveal className="h-full" delay={180}>
        <div className={card}>
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-palm text-cream"><Store size={22} /></span>
          <h3 className="text-[1.7rem]">{t('order.walk.t')}</h3>
          <p className="mt-2 flex-1 text-muted">{t('order.walk.d')}</p>
          <a href={mapsDirections(l)} target="_blank" rel="noopener" className="mt-6 font-semibold text-text no-underline hover:text-primary">
            {l.street}, {l.city} →
          </a>
        </div>
      </ScrollReveal>
    </div>
  )
}
