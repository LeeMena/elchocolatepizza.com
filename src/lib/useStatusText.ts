import { primaryLocation } from '@/data/site'
import { useStatus, fmtTime } from './hours'
import { useT } from '@/i18n/useT'

// "Open now · closes at 9 PM" — computed in Florida time, refreshes every minute.
export function useStatusText() {
  const { t, lang } = useT()
  const s = useStatus(primaryLocation)
  const state = s.open ? t('status.open') : t('status.closed')
  const detail = s.open
    ? `${t('status.closes')} ${fmtTime(s.closesAt!, lang)}`
    : `${t('status.opens')} ${fmtTime(s.opensAt!, lang)}${s.opensDay !== s.dayIndex ? ` ${t('status.tomorrow')}` : ''}`
  return { open: s.open, state, detail, dayIndex: s.dayIndex }
}
