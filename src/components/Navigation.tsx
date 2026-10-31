import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Moon, Search, Sun, Phone, MapPin } from 'lucide-react'
import { useTheme } from '@/context/ThemeProvider'
import { useLanguage } from '@/context/LanguageProvider'
import { useT } from '@/i18n/useT'
import { primaryLocation, primaryOrder, telHref, mapsDirections } from '@/data/site'
import BrandMark from './BrandMark'
import LiveStatus from './LiveStatus'
import { openCommandMenu } from '@/lib/commandMenu'
import { NAV_LINKS } from '@/data/nav'

const iconBtn =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border px-2 text-muted transition hover:border-text hover:text-text'

function LangToggle() {
  const { lang, toggleLang } = useLanguage()
  const { t } = useT()
  return (
    <button onClick={toggleLang} aria-label={t('lang.switch')} className={`${iconBtn} gap-1 px-3 text-[0.7rem] font-bold tracking-widest`}>
      <span className={lang === 'en' ? 'text-text' : 'opacity-50'}>EN</span>
      <span className="opacity-40">/</span>
      <span className={lang === 'es' ? 'text-text' : 'opacity-50'}>ES</span>
    </button>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useT()
  return (
    <button onClick={toggleTheme} aria-label={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')} className={iconBtn}>
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}

function Burger({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-5 w-5">
      {[open ? 'top-1/2 rotate-45' : 'top-[28%]', open ? 'top-1/2 opacity-0' : 'top-1/2', open ? 'top-1/2 -rotate-45' : 'top-[72%]'].map((c, i) => (
        <span key={i} className={`absolute left-0 block h-[2px] w-5 -translate-y-1/2 rounded bg-current transition-all duration-300 ${c}`} />
      ))}
    </span>
  )
}

export default function Navigation() {
  const { t } = useT()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [drawerTop, setDrawerTop] = useState(64)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    setDrawerTop(Math.max(0, Math.round(ref.current?.getBoundingClientRect().bottom ?? 64)))
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 no-print ${
        scrolled ? 'border-border bg-[color-mix(in_srgb,var(--color-bg)_86%,transparent)] backdrop-blur-xl backdrop-saturate-150' : 'border-transparent bg-bg'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="container">
        <nav className="flex h-16 items-center justify-between gap-3" aria-label={t('nav.navigation')}>
          <Link to="/" className="flex min-w-0 items-center gap-2.5 no-underline" aria-label="Pizzeria El Chocolate">
            <BrandMark />
            <span className="flex flex-col leading-none">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-mango">Pizzeria</span>
              <span className="font-display text-[1.3rem] font-extrabold italic text-text">El Chocolate</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive }) =>
                  `border-b-2 pb-0.5 text-[0.92rem] font-semibold no-underline transition-colors ${isActive ? 'border-mango text-text' : 'border-transparent text-muted hover:text-text'}`
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LiveStatus short className="mr-1 hidden text-[0.8rem] font-semibold text-muted xl:inline-flex" />
            <button onClick={openCommandMenu} className={`${iconBtn} hidden gap-2 px-3 md:inline-flex`} aria-label={t('nav.search')}>
              <Search size={15} />
              <kbd className="font-sans text-[0.68rem] font-semibold opacity-70">⌘K</kbd>
            </button>
            <LangToggle />
            <span className="hidden sm:inline-flex"><ThemeToggle /></span>
            <a href={primaryOrder.url} target="_blank" rel="noopener" className="btn btn-hot btn-sm hidden md:inline-flex">
              {t('nav.orderNow')}
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text lg:hidden"
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <Burger open={open} />
            </button>
          </div>
        </nav>
      </div>

      {createPortal(
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.navigation')}
          aria-hidden={!open}
          className={`fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-bg transition-[opacity,transform,visibility] duration-300 lg:hidden ${
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
          style={{ top: drawerTop }}
        >
          <div className="container pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-4">
            <nav aria-label={t('nav.navigation')}>
              {[{ href: '/', key: 'nav.home' }, ...NAV_LINKS].map((l, i) => (
                <NavLink
                  key={l.href}
                  to={l.href}
                  end
                  className={({ isActive }) =>
                    `flex min-h-[60px] items-center justify-between border-b border-border font-display text-[1.8rem] font-extrabold no-underline transition-all duration-300 ${
                      isActive ? 'italic text-mango' : 'text-text'
                    } ${open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`
                  }
                  style={{ transitionDelay: `${60 + i * 35}ms` }}
                >
                  {t(l.key)}
                  <span aria-hidden="true" className="text-base opacity-40">→</span>
                </NavLink>
              ))}
            </nav>
            <div className="mt-8 grid gap-3">
              <a href={primaryOrder.url} target="_blank" rel="noopener" className="btn btn-hot btn-lg w-full">{t('cta.orderOnline')}</a>
              <div className="grid grid-cols-2 gap-3">
                <a href={telHref(primaryLocation.phone)} className="btn btn-ghost"><Phone size={16} /> {t('cta.call')}</a>
                <a href={mapsDirections(primaryLocation)} target="_blank" rel="noopener" className="btn btn-ghost"><MapPin size={16} /> {t('cta.directions')}</a>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <LiveStatus className="text-sm font-semibold text-muted" />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  )
}
