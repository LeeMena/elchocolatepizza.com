import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { Search, Pizza, Home, MapPin, ShoppingBag, BookOpen, Phone, Languages, SunMoon, Instagram } from 'lucide-react'
import { useLanguage } from '@/context/LanguageProvider'
import { useTheme } from '@/context/ThemeProvider'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'
import { allItems, fmtPrice } from '@/data/menu'
import { primaryLocation, primaryOrder, telHref, mapsDirections, site } from '@/data/site'

import { COMMAND_EVENT as EVENT } from '@/lib/commandMenu'

const itemCls =
  'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] text-text aria-selected:bg-[color-mix(in_srgb,var(--color-primary)_16%,transparent)]'
const groupCls =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-faint'

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { t, lang } = useT()
  const { toggleLang } = useLanguage()
  const { toggleTheme } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o) }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener('keydown', onKey)
    window.addEventListener(EVENT, onOpen)
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener(EVENT, onOpen) }
  }, [])

  const go = useCallback((href: string) => { setOpen(false); navigate(href) }, [navigate])
  const ext = (href: string) => { setOpen(false); window.open(href, href.startsWith('tel:') ? '_self' : '_blank', 'noopener') }

  const pages = [
    { href: '/', label: t('nav.home'), icon: <Home size={16} /> },
    { href: '/menu', label: t('nav.menu'), icon: <BookOpen size={16} /> },
    { href: '/our-pizza', label: t('nav.ourPizza'), icon: <Pizza size={16} /> },
    { href: '/order', label: t('nav.order'), icon: <ShoppingBag size={16} /> },
    { href: '/visit', label: t('nav.visit'), icon: <MapPin size={16} /> },
  ]

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[12vh] z-[95] w-[min(640px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lg)]"
    >
      <div className="flex items-center gap-2 border-b border-border px-4">
        <Search size={16} className="text-faint" />
        <Command.Input placeholder={t('cmd.placeholder')} className="h-14 w-full bg-transparent text-[1rem] text-text outline-none placeholder:text-faint" />
      </div>
      <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
        <Command.Empty className="py-8 text-center text-sm text-muted">{t('cmd.empty')}</Command.Empty>
        <Command.Group heading={t('cmd.actions')} className={groupCls}>
          <Command.Item className={itemCls} onSelect={() => ext(primaryOrder.url)} value="order online slice doordash ordenar"><ShoppingBag size={16} /> {t('cta.orderOnline')}</Command.Item>
          <Command.Item className={itemCls} onSelect={() => ext(telHref(primaryLocation.phone))} value="call phone llamar"><Phone size={16} /> {t('cta.call')} · {primaryLocation.phone}</Command.Item>
          <Command.Item className={itemCls} onSelect={() => ext(mapsDirections(primaryLocation))} value="directions map como llegar"><MapPin size={16} /> {t('cta.directions')}</Command.Item>
          <Command.Item className={itemCls} onSelect={() => ext(site.instagram.url)} value="instagram"><Instagram size={16} /> Instagram</Command.Item>
          <Command.Item className={itemCls} onSelect={() => { toggleLang(); setOpen(false) }} value="language idioma spanish english español"><Languages size={16} /> {t('cmd.toggleLang')}</Command.Item>
          <Command.Item className={itemCls} onSelect={() => { toggleTheme(); setOpen(false) }} value="theme dark light tema"><SunMoon size={16} /> {t('cmd.toggleTheme')}</Command.Item>
        </Command.Group>
        <Command.Group heading={t('cmd.pages')} className={groupCls}>
          {pages.map((p) => (
            <Command.Item key={p.href} className={itemCls} onSelect={() => go(p.href)} value={`page ${p.label} ${p.href}`}>{p.icon} {p.label}</Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading={t('cmd.menu')} className={groupCls}>
          {allItems.map((i) => (
            <Command.Item
              key={i.id}
              className={itemCls}
              onSelect={() => go(`/menu?item=${i.id}#${i.category.id}`)}
              value={`${i.name.en} ${i.name.es} ${i.category.title.en} ${i.category.title.es}`}
            >
              <Pizza size={16} className="text-mango" />
              <span className="flex-1">{pick(i.name, lang)} <span className="text-faint">· {pick(i.category.title, lang)}</span></span>
              <span className="font-display font-extrabold text-primary">{i.price != null ? fmtPrice(i.price) : t('menu.ask')}</span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-faint">
        <span><kbd className="rounded border border-border px-1.5 py-0.5 font-sans">⌘K</kbd> {t('cmd.open')}</span>
        <span><kbd className="rounded border border-border px-1.5 py-0.5 font-sans">↵</kbd> {t('cmd.select')}</span>
      </div>
    </Command.Dialog>
  )
}
