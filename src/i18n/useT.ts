import { useLanguage } from '@/context/LanguageProvider'
import { getT } from './copy'

export function useT() {
  const { lang } = useLanguage()
  return { t: getT(lang), lang }
}
