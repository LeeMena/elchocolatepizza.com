import SEO from '@/components/SEO'
import SectionHead from '@/components/SectionHead'
import ScrollReveal from '@/components/ScrollReveal'
import HoursTable from '@/components/HoursTable'
import MapEmbed from '@/components/MapEmbed'
import LiveStatus from '@/components/LiveStatus'
import FAQ from '@/components/FAQ'
import { primaryLocation, telHref, mapsDirections, site } from '@/data/site'
import { useImage } from '@/lib/useImage'
import { useT } from '@/i18n/useT'
import { faqSchema } from '@/lib/schema'

const SCHEMA = faqSchema()

export default function Visit() {
  const { t } = useT()
  const l = primaryLocation
  const storefront = useImage(site.photos.storefront)
  return (
    <>
      <SEO
        title="Visit Us | Pizzeria El Chocolate — 899 Pondella Rd, North Fort Myers"
        description="Pizzeria El Chocolate is at 899 Pondella Rd, North Fort Myers, FL 33903. Open daily 11 AM–9 PM. Call (239) 946-9006. Directions, hours and FAQs."
        path="/visit"
        titleEs="Visítanos | Pizzeria El Chocolate — 899 Pondella Rd, North Fort Myers"
        descriptionEs="Pizzeria El Chocolate está en 899 Pondella Rd, North Fort Myers, FL 33903. Abierto todos los días de 11 AM a 9 PM. Llama al (239) 946-9006."
        schema={SCHEMA}
      />
      <section className="section">
        <div className="container">
          <SectionHead as="h1" kicker={t('vp.kicker')} title={t('vp.title')} sub={t('vp.lede')} />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <ScrollReveal>
              <div className="h-full rounded-[32px] border border-border bg-[var(--color-card)] p-7 shadow-[var(--shadow-md)] md:p-9">
                {storefront && <img src={storefront} alt="Pizzeria El Chocolate storefront" className="mb-6 aspect-video w-full rounded-2xl object-cover" />}
                <LiveStatus className="chip mb-6 text-text" />
                <dl className="grid gap-5">
                  <div>
                    <dt className="kicker mb-1">{t('visit.address')}</dt>
                    <dd className="m-0 text-[1.15rem] text-text">{l.street}<br />{l.city}, {l.state} {l.zip}</dd>
                  </div>
                  <div>
                    <dt className="kicker mb-1">{t('visit.phone')}</dt>
                    <dd className="m-0"><a href={telHref(l.phone)} className="font-display text-[1.6rem] font-extrabold text-text no-underline">{l.phone}</a></dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={mapsDirections(l)} target="_blank" rel="noopener" className="btn btn-hot">{t('cta.directions')} →</a>
                  <a href={telHref(l.phone)} className="btn btn-ghost">☎ {t('cta.call')}</a>
                </div>
                <h2 className="kicker mb-2 mt-9">{t('visit.hours')}</h2>
                <HoursTable />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}><MapEmbed className="h-full min-h-[420px]" /></ScrollReveal>
          </div>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container max-w-4xl">
          <SectionHead kicker={t('faq.kicker')} title={t('faq.title')} />
          <FAQ />
        </div>
      </section>
    </>
  )
}
