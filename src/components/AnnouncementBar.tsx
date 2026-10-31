import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useT } from '@/i18n/useT'

const KEY = 'pec-announce-dismissed'

export default function AnnouncementBar() {
  const { t } = useT()
  const [visible, setVisible] = useState(() => { try { return !sessionStorage.getItem(KEY) } catch { return true } })
  if (!visible) return null
  const dismiss = () => { setVisible(false); try { sessionStorage.setItem(KEY, '1') } catch { /* ignore */ } }

  return (
    <div className="relative z-[60] flex min-h-[40px] items-center justify-center bg-mango px-10 py-2 text-choc-800 no-print">
      <p className="text-center text-[0.78rem] font-semibold tracking-wide">
        <span aria-hidden="true">🐊 </span>
        <span className="hidden sm:inline">{t('announce.text')} </span>
        <Link to="/menu#specialty" className="font-bold underline underline-offset-4">{t('announce.cta')} →</Link>
      </p>
      <button onClick={dismiss} aria-label={t('announce.dismiss')} className="absolute right-3 rounded-full p-1.5 text-choc-800/70 hover:bg-choc-800/10">
        <X size={14} />
      </button>
    </div>
  )
}
