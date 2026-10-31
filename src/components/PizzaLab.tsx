import { AnimatePresence, motion } from 'framer-motion'
import Pie from './Pie'
import { fmtPrice, type MenuItem } from '@/data/menu'
import { primaryOrder } from '@/data/site'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'

// Desktop: sticky card that draws whichever pizza is selected on the menu.
export default function PizzaLab({ item }: { item: MenuItem }) {
  const { t, lang } = useT()
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-choc-800 p-7 text-cream shadow-[var(--shadow-lg)]">
      <div aria-hidden="true" className="tile-pattern absolute inset-0 text-cream opacity-[0.05]" />
      <div className="relative">
        <p className="flex items-center justify-between text-[0.72rem] font-bold uppercase tracking-[0.2em] text-mango">
          <span>{t('menu.lab')}</span>
          <span className="font-mono text-cream-2/50">/{item.id}</span>
        </p>
        <div className="mx-auto my-5 aspect-square w-full max-w-[320px] rounded-full bg-[radial-gradient(circle,#f6efe3_60%,#e3d3bd_61%_64%,#f6efe3_65%)] p-[7%] shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)]">
          <Pie pie={item.pie ?? 'queso'} className="h-full w-full drop-shadow-[0_8px_10px_rgba(80,30,10,.35)]" label={pick(item.name, lang)} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={item.id + lang} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[2rem] text-cream">{pick(item.name, lang)}</h3>
              <span className="font-display text-[1.6rem] font-extrabold text-mango">{item.price != null ? fmtPrice(item.price) : t('menu.ask')}</span>
            </div>
            {item.note && <p className="mt-1 text-cream-2/80">{pick(item.note, lang)}</p>}
          </motion.div>
        </AnimatePresence>
        <a href={primaryOrder.url} target="_blank" rel="noopener" className="btn btn-hot mt-6 w-full">{t('cta.orderOnline')} →</a>
      </div>
    </div>
  )
}
