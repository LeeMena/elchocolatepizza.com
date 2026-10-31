import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'
import CommandMenu from './CommandMenu'
import ScrollToTop from './ScrollToTop'
import MobileBar from './MobileBar'
import { useConversionTracking } from '@/lib/analytics'
import { useT } from '@/i18n/useT'

export default function Layout() {
  useConversionTracking()
  const { t } = useT()
  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <a href="#main-content" className="skip-link">{t('skip')}</a>
      <ScrollToTop />
      <AnnouncementBar />
      <Navigation />
      <CommandMenu />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
