import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'

// Home ships in the main bundle; other routes load on demand.
const Menu = lazy(() => import('@/pages/Menu'))
const OurPizza = lazy(() => import('@/pages/OurPizza'))
const Order = lazy(() => import('@/pages/Order'))
const Visit = lazy(() => import('@/pages/Visit'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/our-pizza" element={<OurPizza />} />
          <Route path="/order" element={<Order />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
