import { Link } from 'react-router-dom'
import { useT } from '@/i18n/useT'
import { site, primaryLocation, telHref, mapsDirections } from '@/data/site'
import { NAV_LINKS } from '@/data/nav'
import BrandMark from './BrandMark'
import LiveStatus from './LiveStatus'

export default function Footer() {
  const { t } = useT()
  const l = primaryLocation
  return (
    <footer className="relative overflow-hidden bg-choc-950 pb-28 pt-16 text-cream-2 md:pb-10">
      <div aria-hidden="true" className="tile-pattern pointer-events-none absolute inset-0 text-cream opacity-[0.03]" />
      <div className="container relative">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark size={48} />
              <p className="font-display text-[1.9rem] font-semibold italic leading-none text-cream">
                Pizzeria <strong className="font-extrabold text-mango">El Chocolate</strong>
              </p>
            </div>
            <p className="mt-4 max-w-xs text-cream-2/70">{t('foot.tag')}</p>
            <LiveStatus className="mt-5 text-sm font-semibold text-cream" />
          </div>
          <div>
            <h4 className="mb-4 font-sans text-[0.74rem] font-bold uppercase tracking-[0.2em] text-mango">{t('foot.explore')}</h4>
            <ul className="grid gap-2.5">
              {[{ href: '/', key: 'nav.home' }, ...NAV_LINKS].map((n) => (
                <li key={n.href}><Link to={n.href} className="no-underline hover:text-mango">{t(n.key)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-sans text-[0.74rem] font-bold uppercase tracking-[0.2em] text-mango">{t('foot.order')}</h4>
            <ul className="grid gap-2.5">
              {site.order.map((o) => (
                <li key={o.id}><a href={o.url} target="_blank" rel="noopener" className="no-underline hover:text-mango">{o.label} ↗</a></li>
              ))}
              <li><a href={telHref(l.phone)} className="no-underline hover:text-mango">{l.phone}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-sans text-[0.74rem] font-bold uppercase tracking-[0.2em] text-mango">{t('foot.find')}</h4>
            <address className="not-italic">
              <a href={mapsDirections(l)} target="_blank" rel="noopener" className="no-underline hover:text-mango">
                {l.street}<br />{l.city}, {l.state} {l.zip}
              </a>
            </address>
            <a href={site.instagram.url} target="_blank" rel="noopener" className="mt-3 inline-block no-underline hover:text-mango">{site.instagram.handle}</a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-sm text-cream-2/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Pizzeria El Chocolate. {t('foot.rights')}</span>
          <span className="flex gap-5">
            <Link to="/privacy" className="no-underline hover:text-mango">{t('foot.privacy')}</Link>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="no-underline hover:text-mango">{t('foot.top')} ↑</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
