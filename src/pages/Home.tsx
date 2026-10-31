import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import SEO from '@/components/SEO'
import HeroPie from '@/components/HeroPie'
import Marquee from '@/components/Marquee'
import Pie from '@/components/Pie'
import ScrollReveal from '@/components/ScrollReveal'
import SectionHead from '@/components/SectionHead'
import OrderCards from '@/components/OrderCards'
import InstaGrid from '@/components/InstaGrid'
import HoursTable from '@/components/HoursTable'
import MapEmbed from '@/components/MapEmbed'
import CTABanner from '@/components/CTABanner'
import { useStatusText } from '@/lib/useStatusText'
import { site, primaryLocation, primaryOrder, telHref, mapsDirections } from '@/data/site'
import { findItem, fmtPrice } from '@/data/menu'
import { useImage } from '@/lib/useImage'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'

const ease = [0.16, 1, 0.3, 1] as const

function Hero() {
  const { t } = useT()
  const status = useStatusText()
  const words = [t('hero.t1'), t('hero.t2'), t('hero.t3')]
  return (
    <section className="relative overflow-hidden bg-choc-800 text-cream">
      <div aria-hidden="true" className="tile-pattern pointer-events-none absolute inset-0 text-cream opacity-[0.06] [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(242,179,61,.28),transparent_60%)] blur-2xl" />
      <div className="container relative grid items-center gap-10 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.05fr_.95fr] lg:pb-24">
        <div>
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.88rem] font-semibold text-cream-2">
            <span className={`live-dot ${status.open ? '' : 'is-closed'}`} aria-hidden="true" />
            {status.state} · {status.detail}
            <span className="hidden opacity-60 sm:inline">· North Fort Myers, FL</span>
          </p>
          <h1 className="text-[clamp(3.6rem,11vw,8rem)] font-extrabold leading-[0.86] tracking-[-0.035em] text-cream">
            {words.map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: 40, fontWeight: 300 }}
                animate={{ opacity: 1, y: 0, fontWeight: i === 2 ? 600 : 850 }}
                transition={{ duration: 0.9, delay: 0.08 + i * 0.12, ease }}
                className={`block ${i === 1 ? 'italic text-mango' : ''} ${i === 2 ? 'mt-2 text-[0.48em] italic text-cream-2' : ''}`}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-7 max-w-[34em] text-[clamp(1.02rem,1.5vw,1.18rem)] text-cream-2">
            {t('hero.lede')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }} className="mt-8 flex flex-wrap gap-3.5">
            <a href={primaryOrder.url} target="_blank" rel="noopener" className="btn btn-hot btn-lg">{t('cta.orderOnline')} <ArrowRight size={18} /></a>
            <Link to="/menu" className="btn btn-on-dark btn-lg">{t('cta.seeMenu')}</Link>
          </motion.div>
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <li><strong className="block font-display text-[1.9rem] font-extrabold text-cream">{site.rating.score}<span className="ml-1 text-mango">★</span></strong><span className="text-sm text-cream-2/75">{site.rating.count} {t('hero.reviews')}</span></li>
            <li><strong className="block font-display text-[1.9rem] font-extrabold text-cream">11–9</strong><span className="text-sm text-cream-2/75">{t('hero.daily')}</span></li>
            <li><strong className="block font-display text-[1.9rem] font-extrabold text-cream">$10.99</strong><span className="text-sm text-cream-2/75">{t('hero.from')}</span></li>
          </ul>
        </div>
        <div><HeroPie /></div>
      </div>
      <Marquee />
    </section>
  )
}

function PhotoBg({ src }: { src: string }) {
  const ok = useImage(src)
  if (!ok) return null
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg,rgba(20,10,6,.1) 15%,rgba(20,10,6,.88) 85%),url("${ok}")` }} />
  )
}

function Bento() {
  const { t } = useT()
  const status = useStatusText()
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tile = (e.target as HTMLElement).closest<HTMLElement>('.glow-tile')
    if (!tile) return
    const r = tile.getBoundingClientRect()
    tile.style.setProperty('--mx', `${e.clientX - r.left}px`)
    tile.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const tile = 'glow-tile overflow-hidden rounded-[28px] p-7 md:p-8'
  return (
    <section id="story" className="section">
      <div className="container">
        <div onMouseMove={onMove} className="grid auto-rows-[minmax(190px,auto)] gap-4 md:grid-cols-4">
          <ScrollReveal className="md:col-span-2 md:row-span-2">
            <article className={`${tile} relative flex h-full flex-col justify-between border border-border bg-[var(--color-card)] shadow-[var(--shadow-md)]`}>
              <PhotoBg src={site.photos.story} />
              <div>
                <p className="kicker mb-4">{t('story.kicker')}</p>
                <h2 className="text-[clamp(2rem,4.2vw,3.3rem)] [&_em]:italic [&_em]:text-tomato [[data-theme=dark]_&_em]:text-mango" dangerouslySetInnerHTML={{ __html: t('story.title') }} />
              </div>
              <ol className="mt-8 grid gap-4">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-4">
                    <span className="font-display text-[1.1rem] font-extrabold italic text-tomato">0{n}</span>
                    <span><b className="font-display text-[1.2rem] text-text">{t(`story.p${n}t`)}</b><span className="mt-1 block text-muted">{t(`story.p${n}`)}</span></span>
                  </li>
                ))}
              </ol>
              <Link to="/our-pizza" className="mt-6 inline-flex items-center gap-2 font-bold text-primary no-underline">{t('nav.ourPizza')} <ArrowRight size={16} /></Link>
            </article>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-2" delay={80}>
            <Link to="/menu?item=cocodrilo#specialty" className={`${tile} relative flex h-full min-h-[240px] items-end bg-gradient-to-br from-palm to-palm-dark text-cream no-underline`}>
              <PhotoBg src={site.photos.cocodrilo} />
              <span aria-hidden="true" className="absolute -right-10 -top-10 h-[230px] w-[230px] opacity-90 transition-transform duration-700 hover:rotate-45"><Pie pie="cocodrilo" animate={false} className="h-full w-full drop-shadow-2xl" /></span>
              <span className="relative max-w-[60%]">
                <span className="mb-4 inline-block rounded-xl bg-mango px-3 py-1.5 font-display text-lg font-extrabold text-choc-800">{fmtPrice(findItem('cocodrilo')!.price!)}</span>
                <span className="kicker kicker--light mb-2 block">{t('gator.k')}</span>
                <span className="block font-display text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-none">{t('gator.t')}</span>
                <span className="mt-2 block text-cream/85">{t('gator.d')}</span>
              </span>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <article className={`${tile} flex h-full flex-col justify-between border border-border bg-[var(--color-card)]`}>
              <p className="kicker">{t('live.k')}</p>
              <p className="flex items-center gap-2.5 font-display text-[1.6rem] font-extrabold text-text">
                <span className={`live-dot ${status.open ? '' : 'is-closed'}`} aria-hidden="true" />{status.state}
              </p>
              <p className="text-muted">{status.detail}</p>
              <a href={mapsDirections(primaryLocation)} target="_blank" rel="noopener" className="mt-3 font-bold text-primary no-underline">{t('cta.directions')} →</a>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <article className={`${tile} flex h-full flex-col justify-center bg-mango text-choc-800`}>
              <p className="font-display text-[3.6rem] font-extrabold leading-none">{site.rating.score}</p>
              <p className="mt-1 flex gap-0.5 text-tomato" aria-label={`${site.rating.score} / 5`}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}</p>
              <p className="mt-2 text-sm font-semibold">{site.rating.count} {t('rating.reviews')} · {site.rating.source}</p>
            </article>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-2" delay={80}>
            <Link to="/menu?item=pizza-chocolate#dessert" className={`${tile} relative flex h-full min-h-[240px] items-end bg-gradient-to-br from-choc-500 to-choc-900 text-cream no-underline`}>
              <PhotoBg src={site.photos.chocolate} />
              <span aria-hidden="true" className="absolute -right-10 -top-10 h-[230px] w-[230px] opacity-95 transition-transform duration-700 hover:rotate-45"><Pie pie="chocolate" animate={false} className="h-full w-full drop-shadow-2xl" /></span>
              <span className="relative max-w-[60%]">
                <span className="mb-4 inline-block rounded-xl bg-mango px-3 py-1.5 font-display text-lg font-extrabold text-choc-800">{fmtPrice(findItem('pizza-chocolate')!.price!)}</span>
                <span className="kicker kicker--light mb-2 block">{t('choc.k')}</span>
                <span className="block font-display text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-none">{t('choc.t')}</span>
                <span className="mt-2 block text-cream/85">{t('choc.d')}</span>
              </span>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <Link to="/menu?item=croquetas#starters" className={`${tile} flex h-full flex-col justify-between border border-border bg-[var(--color-card)] no-underline`}>
              <p className="kicker">{t('croq.k')}</p>
              <p className="font-display text-[1.8rem] font-extrabold text-text">Croquetas</p>
              <p className="text-sm text-muted">{t('croq.d')}</p>
              <p className="mt-2 font-display text-[1.5rem] font-extrabold text-primary">$1.75 <small className="font-sans text-xs font-medium text-muted">{t('croq.each')}</small></p>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <Link to="/menu#shakes" className={`${tile} flex h-full flex-col justify-between bg-sky text-choc-800 no-underline`}>
              <p className="text-[0.74rem] font-bold uppercase tracking-[0.2em]">{t('shake.k')}</p>
              <p className="font-display text-[1.5rem] font-extrabold leading-tight">{t('shake.t')}</p>
              <p className="font-display text-[1.4rem] font-extrabold"><small className="font-sans text-xs font-semibold">{t('shake.from')}</small> $4.99</p>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Favorites() {
  const { t, lang } = useT()
  const ids = ['queso', 'chorizo', 'langosta', 'cocodrilo']
  return (
    <section className="section relative bg-surface [--scallop:var(--color-bg)] scallop-top">
      <div className="container">
        <SectionHead
          kicker={t('fav.kicker')}
          title={t('fav.title')}
          sub={t('fav.sub')}
          action={<Link to="/menu" className="btn btn-ghost">{t('cta.fullMenu')} <ArrowRight size={16} /></Link>}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ids.map((id, i) => {
            const it = findItem(id)!
            return (
              <ScrollReveal key={id} delay={i * 70}>
                <Link to={`/menu?item=${id}#${it.category.id}`} className="group block rounded-[28px] border border-border bg-[var(--color-card)] p-5 no-underline shadow-[var(--shadow-md)] transition hover:-translate-y-1">
                  <div className="aspect-square rounded-full bg-[radial-gradient(circle,#f6efe3_60%,#e3d3bd_61%_64%,#f6efe3_65%)] p-[8%] transition-transform duration-700 group-hover:rotate-[24deg]">
                    <Pie pie={it.pie!} animate={false} className="h-full w-full" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-display text-[1.35rem] font-extrabold text-text">{pick(it.name, lang)}</span>
                    <span className="font-display text-[1.15rem] font-extrabold text-primary">{fmtPrice(it.price!)}</span>
                  </div>
                  <span className="text-sm text-faint">{pick(it.category.title, lang)}</span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const { t } = useT()
  const l = primaryLocation
  return (
    <section id="visit" className="section bg-choc-800 text-cream-2">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <ScrollReveal>
          <p className="kicker kicker--light mb-3">{t('visit.kicker')}</p>
          <h2 className="h-display text-cream">{l.name}</h2>
          <p className="mt-4 text-[1.15rem]">{l.street}<br />{l.city}, {l.state} {l.zip}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telHref(l.phone)} className="btn btn-hot">☎ {l.phone}</a>
            <a href={mapsDirections(l)} target="_blank" rel="noopener" className="btn btn-on-dark">{t('cta.directions')} →</a>
          </div>
          <div className="mt-8"><HoursTable tone="dark" /></div>
        </ScrollReveal>
        <ScrollReveal delay={100}><MapEmbed className="h-full" /></ScrollReveal>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useT()
  return (
    <>
      <SEO
        title="Pizzeria El Chocolate | Authentic Cuban Pizza in North Fort Myers, FL"
        description="Authentic Cuban pizza in North Fort Myers, FL: thick sweet crust, golden edge-to-edge cheese, lobster and alligator pies, croquetas, tropical shakes and chocolate pizza."
        path="/"
        titleEs="Pizzeria El Chocolate | Auténtica Pizza Cubana en North Fort Myers, FL"
        descriptionEs="Auténtica pizza cubana en North Fort Myers, FL: masa gruesa y dulce, queso dorado hasta el borde, pizzas de langosta y cocodrilo, croquetas, batidos y pizza de chocolate."
      />
      <Hero />
      <Bento />
      <Favorites />
      <section className="section">
        <div className="container">
          <SectionHead kicker={t('order.kicker')} title={t('order.title')} />
          <OrderCards />
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container">
          <SectionHead
            kicker={t('ig.kicker')}
            title={`<a href="${site.instagram.url}" target="_blank" rel="noopener" class="no-underline bg-gradient-to-r from-tomato to-mango bg-clip-text text-transparent">${site.instagram.handle}</a>`}
            action={<a href={site.instagram.url} target="_blank" rel="noopener" className="btn btn-ghost">{t('cta.viewIg')} ↗</a>}
          />
          <ScrollReveal><InstaGrid /></ScrollReveal>
        </div>
      </section>
      <Visit />
      <section className="bg-mango py-16 text-choc-800 md:py-20">
        <div className="container">
          <ScrollReveal>
            <p className="max-w-4xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold italic leading-tight">{t('rev.line')}</p>
            <p className="mt-4 font-semibold">{site.rating.score}★ · {site.rating.count} {t('rating.reviews')} · {site.rating.source}</p>
          </ScrollReveal>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
