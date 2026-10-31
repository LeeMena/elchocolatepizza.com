import { Phone, MapPin } from 'lucide-react'
import { useT } from '@/i18n/useT'
import { primaryLocation, primaryOrder, telHref, mapsDirections } from '@/data/site'

// Thumb-zone actions on phones: the three things people come to do.
export default function MobileBar() {
  const { t } = useT()
  const btn = 'flex items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl px-2 py-3.5 text-[0.9rem] font-bold no-underline'
  return (
    <div
      role="region"
      aria-label={t('mbar.label')}
      className="fixed inset-x-0 bottom-0 z-[70] grid grid-cols-[1fr_1fr_1.25fr] gap-2 border-t border-white/10 bg-choc-950/95 px-3 pt-2.5 backdrop-blur-lg md:hidden no-print"
      style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
    >
      <a href={telHref(primaryLocation.phone)} className={`${btn} bg-white/10 text-cream`}><Phone size={16} /> {t('cta.call')}</a>
      <a href={mapsDirections(primaryLocation)} target="_blank" rel="noopener" className={`${btn} bg-white/10 text-cream`}><MapPin size={16} /> {t('mbar.dir')}</a>
      <a href={primaryOrder.url} target="_blank" rel="noopener" className={`${btn} bg-tomato text-white`}>{t('nav.orderNow')}</a>
    </div>
  )
}
