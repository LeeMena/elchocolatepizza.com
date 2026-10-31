import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '@/components/SEO'
import Pie from '@/components/Pie'
import ScrollReveal from '@/components/ScrollReveal'
import SectionHead from '@/components/SectionHead'
import CTABanner from '@/components/CTABanner'
import { findItem, fmtPrice, type PieKey } from '@/data/menu'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'

const STEPS: { n: number; pie: PieKey }[] = [
  { n: 1, pie: 'queso' },
  { n: 2, pie: 'jamon' },
  { n: 3, pie: 'chorizo' },
]
const SPECIALS = ['camarones', 'langostino', 'langosta', 'cocodrilo']

export default function OurPizza() {
  const { t, lang } = useT()
  const [spec, setSpec] = useState('langosta')
  const s = findItem(spec)!
  return (
    <>
      <SEO
        title="What Is Cuban Pizza? | Pizzeria El Chocolate, North Fort Myers"
        description="Cuban pizza is its own style: thick, soft, slightly sweet pan-baked dough, Cuban-style sauce with sofrito, and cheese all the way to the caramelized edge. Here's what makes ours different."
        path="/our-pizza"
        titleEs="¿Qué es la pizza cubana? | Pizzeria El Chocolate, North Fort Myers"
        descriptionEs="La pizza cubana es un estilo propio: masa gruesa, suave y dulce horneada en molde, salsa criolla con sofrito y queso hasta el borde."
      />

      <section className="section pb-10">
        <div className="container">
          <SectionHead as="h1" kicker={t('op.kicker')} title={t('op.title')} sub={t('op.lede')} />
        </div>
      </section>

      <section className="container pb-8">
        <div className="grid gap-6">
          {STEPS.map(({ n, pie }, i) => (
            <ScrollReveal key={n}>
              <article className={`grid items-center gap-8 overflow-hidden rounded-[32px] border border-border bg-[var(--color-card)] p-7 shadow-[var(--shadow-md)] md:grid-cols-2 md:p-12 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <div className="mx-auto aspect-square w-[min(340px,70vw)] rounded-full bg-[radial-gradient(circle,#f6efe3_60%,#e3d3bd_61%_64%,#f6efe3_65%)] p-[7%] shadow-[var(--shadow-lg)]">
                  <Pie pie={pie} className="h-full w-full animate-spin-slow" />
                </div>
                <div>
                  <span className="font-display text-[4.5rem] font-extrabold italic leading-none text-tomato">0{n}</span>
                  <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)]">{t(`op.s${n}.t`)}</h2>
                  <p className="lede mt-4">{t(`op.s${n}.d`)}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker={t('op.spec.k')} title={t('op.spec.t')} sub={t('op.spec.d')} />
          <ScrollReveal>
            <div className="grid items-center gap-10 rounded-[36px] bg-gradient-to-br from-palm to-palm-dark p-7 text-cream md:grid-cols-[1fr_1.1fr] md:p-12">
              <div className="mx-auto aspect-square w-[min(380px,74vw)] rounded-full bg-[radial-gradient(circle,#f6efe3_60%,#e3d3bd_61%_64%,#f6efe3_65%)] p-[7%] shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]">
                <Pie pie={s.pie!} className="h-full w-full" label={pick(s.name, lang)} />
              </div>
              <div>
                <div className="flex flex-wrap gap-2" role="group" aria-label={t('op.spec.k')}>
                  {SPECIALS.map((id) => {
                    const it = findItem(id)!
                    return (
                      <button
                        key={id}
                        onClick={() => setSpec(id)}
                        aria-pressed={spec === id}
                        className={`rounded-full border-2 px-4 py-2 text-[0.92rem] font-bold transition ${spec === id ? 'border-mango bg-mango text-choc-800' : 'border-white/25 text-cream hover:border-cream'}`}
                      >
                        {pick(it.name, lang)}
                      </button>
                    )
                  })}
                </div>
                <h3 className="mt-8 text-[clamp(2.4rem,5vw,3.6rem)] text-cream">{pick(s.name, lang)}</h3>
                <p className="mt-2 font-display text-[2rem] font-extrabold text-mango">{fmtPrice(s.price!)}</p>
                {s.note && <p className="mt-2 text-cream/85">{pick(s.note, lang)}</p>}
                <Link to={`/menu?item=${s.id}#specialty`} className="btn btn-mango mt-8">{t('op.lab.cta')} <ArrowRight size={16} /></Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="container pb-4">
        <ScrollReveal>
          <div className="rounded-[32px] border border-border p-8 text-center md:p-14">
            <h2 className="h-display">{t('op.lab.t')}</h2>
            <p className="lede mx-auto mt-4">{t('op.lab.d')}</p>
            <Link to="/menu" className="btn btn-hot btn-lg mt-8">{t('op.lab.cta')} <ArrowRight size={18} /></Link>
          </div>
        </ScrollReveal>
      </section>
      <CTABanner />
    </>
  )
}
