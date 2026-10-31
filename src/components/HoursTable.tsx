import { primaryLocation, type Location } from '@/data/site'
import { fmtTime } from '@/lib/hours'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'
import { useStatusText } from '@/lib/useStatusText'

export default function HoursTable({ loc = primaryLocation, tone = 'theme' }: { loc?: Location; tone?: 'theme' | 'dark' }) {
  const { t, lang } = useT()
  const { dayIndex } = useStatusText()
  const line = tone === 'dark' ? 'border-white/10' : 'border-border'
  return (
    <table className="w-full border-collapse text-[0.98rem]">
      <caption className="sr-only">{t('visit.hours')}</caption>
      <tbody>
        {loc.hours.map((h, i) => (
          <tr key={i} className={`border-b ${line} ${i === dayIndex ? 'font-bold text-mango' : ''}`}>
            <td className="py-2.5">{pick(h.day, lang)}{i === dayIndex && <span className="ml-2 text-xs uppercase tracking-widest">· {t('status.today')}</span>}</td>
            <td className="py-2.5 text-right tabular-nums">{fmtTime(h.open, lang)} – {fmtTime(h.close, lang)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
