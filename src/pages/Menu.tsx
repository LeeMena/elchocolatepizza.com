import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Printer, Search, X } from 'lucide-react'
import SEO from '@/components/SEO'
import Pie from '@/components/Pie'
import PizzaLab from '@/components/PizzaLab'
import ScrollReveal from '@/components/ScrollReveal'
import { menu, findItem, fmtPrice, type MenuItem } from '@/data/menu'
import { primaryOrder } from '@/data/site'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'
import { menuSchema } from '@/lib/schema'

const SCHEMA = menuSchema()
const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

function Row({ item, selected, onSelect }: { item: MenuItem; selected: boolean; onSelect: () => void }) {
  const { t, lang } = useT()
  const name = pick(item.name, lang)
  const alt = lang === 'en' ? item.name.es : item.name.en
  const interactive = !!item.pie
  const Tag = interactive ? 'button' : 'div'
  return (
    <li className="border-b border-dashed border-border">
      <Tag
        {...(interactive ? { type: 'button' as const, onClick: onSelect, 'aria-pressed': selected } : {})}
        className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 py-4 text-left ${interactive ? 'group cursor-pointer' : ''}`}
      >
        {item.pie ? (
          <span className={`h-14 w-14 flex-none rounded-full p-[3px] transition ${selected ? 'bg-mango' : 'bg-transparent group-hover:bg-border'}`}>
            <Pie pie={item.pie} animate={false} className="h-full w-full" />
          </span>
        ) : <span className="w-0" />}
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2 font-display text-[1.3rem] font-bold leading-tight text-text">
            {name}
            {item.tag && (
              <span className={`rounded-full px-2 py-0.5 font-sans text-[0.62rem] font-bold uppercase tracking-wider ${item.tag === 'star' ? 'bg-tomato text-white' : 'bg-mango text-choc-800'}`}>
                {t(`badge.${item.tag}`)}
              </span>
            )}
          </span>
          {alt !== name && <span className="block text-[0.88rem] text-faint">{alt}</span>}
          {item.note && <span className="mt-0.5 block text-[0.9rem] italic text-muted">{pick(item.note, lang)}</span>}
        </span>
        <span className="self-start pt-1 text-right">
          {item.price != null ? (
            <span className="font-display text-[1.25rem] font-extrabold text-primary">
              {fmtPrice(item.price)}{item.unit && <small className="ml-1 font-sans text-xs font-medium text-muted">{pick(item.unit, lang)}</small>}
            </span>
          ) : (
            <span className="rounded-full bg-[color-mix(in_srgb,var(--color-text)_8%,transparent)] px-2.5 py-1 text-xs font-semibold text-muted">{t('menu.ask')}</span>
          )}
        </span>
      </Tag>
      {/* Mobile: the selected pie expands inline (desktop uses the sticky Lab) */}
      {selected && item.pie && (
        <div className="pb-5 lg:hidden no-print">
          <div className="mx-auto aspect-square w-[min(300px,80vw)] rounded-full bg-[radial-gradient(circle,#f6efe3_60%,#e3d3bd_61%_64%,#f6efe3_65%)] p-[7%] shadow-[var(--shadow-lg)]">
            <Pie pie={item.pie} className="h-full w-full" label={name} />
          </div>
        </div>
      )}
    </li>
  )
}

export default function Menu() {
  const { t, lang } = useT()
  const [params] = useSearchParams()
  const [q, setQ] = useState('')
  const [selId, setSelId] = useState(() => {
    const p = params.get('item')
    return p && findItem(p) ? p : 'queso'
  })
  const [active, setActive] = useState(menu[0].id)
  const selected = findItem(selId) ?? findItem('queso')!

  useEffect(() => {
    const p = params.get('item')
    if (p && findItem(p)) setSelId(p)
  }, [params])

  const filtered = useMemo(() => {
    const n = norm(q.trim())
    if (!n) return menu
    return menu
      .map((c) => ({ ...c, items: c.items.filter((i) => norm(`${i.name.en} ${i.name.es} ${i.note?.en ?? ''} ${i.note?.es ?? ''} ${c.title.en} ${c.title.es}`).includes(n)) }))
      .filter((c) => c.items.length)
  }, [q])

  // Scroll-spy for the category chips
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    menu.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [filtered])

  return (
    <>
      <SEO
        title="Menu | Pizzeria El Chocolate — Cuban Pizza, Croquetas & Shakes"
        description="The full Pizzeria El Chocolate menu: Cuban pizza from $10.99, lobster and alligator specialty pies, homemade croquetas, Cuban-style spaghetti, tropical shakes and chocolate pizza."
        path="/menu"
        titleEs="Menú | Pizzeria El Chocolate — Pizza Cubana, Croquetas y Batidos"
        descriptionEs="El menú completo de Pizzeria El Chocolate: pizza cubana desde $10.99, especialidades de langosta y cocodrilo, croquetas caseras, spaghetti, batidos tropicales y pizza de chocolate."
        schema={SCHEMA}
      />

      <section className="relative overflow-hidden bg-choc-800 pb-14 pt-14 text-cream md:pt-20">
        <div aria-hidden="true" className="tile-pattern absolute inset-0 text-cream opacity-[0.05]" />
        <div className="container relative">
          <p className="kicker kicker--light mb-3">{t('menu.kicker')}</p>
          <h1 className="text-[clamp(2.8rem,8vw,5.6rem)] text-cream">{t('menu.title')}</h1>
          <p className="mt-4 max-w-xl text-[1.1rem] text-cream-2/85">{t('menu.sub')}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 no-print">
            <label className="relative flex min-w-[min(100%,320px)] flex-1 items-center sm:max-w-md">
              <Search size={18} className="pointer-events-none absolute left-4 text-cream-2/60" />
              <span className="sr-only">{t('menu.search')}</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('menu.search')}
                className="h-12 w-full rounded-full border border-white/20 bg-white/10 pl-11 pr-10 text-cream outline-none placeholder:text-cream-2/50 focus:border-mango"
              />
              {q && <button onClick={() => setQ('')} aria-label="Clear" className="absolute right-3 p-1 text-cream-2/70"><X size={16} /></button>}
            </label>
            <a href={primaryOrder.url} target="_blank" rel="noopener" className="btn btn-hot">{t('cta.orderPickup')}</a>
            <button onClick={() => window.print()} className="btn btn-on-dark"><Printer size={16} /> {t('cta.print')}</button>
          </div>
        </div>
      </section>

      <nav aria-label={t('menu.kicker')} className="sticky top-16 z-30 border-b border-border bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] backdrop-blur-xl no-print">
        <div className="container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {menu.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`flex-none rounded-full border-2 px-4 py-2 text-[0.88rem] font-bold no-underline transition ${
                active === c.id ? 'border-text bg-text text-bg' : 'border-border text-muted hover:border-text hover:text-text'
              }`}
            >
              {pick(c.title, lang)}
            </a>
          ))}
        </div>
      </nav>

      <section className="container grid gap-10 py-12 lg:grid-cols-[360px_1fr] lg:gap-14">
        <aside className="hidden lg:block no-print">
          <div className="sticky top-36"><PizzaLab item={selected} /></div>
        </aside>

        <div>
          {filtered.length === 0 && <p className="py-16 text-center text-lg text-muted">{t('menu.noResults')}</p>}
          {filtered.map((c) => (
            <section key={c.id} id={c.id} className="mb-14 scroll-mt-36">
              <ScrollReveal>
                <div className="mb-2 flex items-end justify-between gap-4 border-b-[3px] border-text pb-3">
                  <h2 className="text-[clamp(1.9rem,4vw,2.6rem)]">{pick(c.title, lang)}</h2>
                  <span className="pb-1 text-xs font-semibold uppercase tracking-widest text-faint">{c.items.length} {t('menu.items')}</span>
                </div>
                <p className="mb-2 italic text-muted">{pick(c.blurb, lang)}</p>
                <ul className="grid gap-x-10 md:grid-cols-2">
                  {c.items.map((i) => <Row key={i.id} item={i} selected={i.id === selId} onSelect={() => setSelId(i.id)} />)}
                </ul>
              </ScrollReveal>
            </section>
          ))}
          <p className="text-sm text-faint">{t('menu.fine')}</p>
        </div>
      </section>
    </>
  )
}
