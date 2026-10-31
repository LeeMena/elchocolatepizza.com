import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import Pie from '@/components/Pie'
import { useT } from '@/i18n/useT'

export default function NotFound() {
  const { t } = useT()
  return (
    <>
      <SEO
        title="Page Not Found | Pizzeria El Chocolate"
        description="That page isn't here, but the Cuban pizza is. Head back to the Pizzeria El Chocolate homepage or menu."
        path="/404"
        noindex
      />
      <section className="section">
        <div className="container grid place-items-center text-center">
          <p className="flex items-center font-display text-[clamp(5rem,20vw,11rem)] font-extrabold italic leading-none text-mango">
            4<span className="mx-2 inline-block h-[0.8em] w-[0.8em] animate-spin-slow"><Pie pie="pepperoni" animate={false} className="h-full w-full" /></span>4
          </p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)]">{t('nf.title')}</h1>
          <p className="lede mx-auto mt-3">{t('nf.d')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn btn-hot">{t('cta.backHome')}</Link>
            <Link to="/menu" className="btn btn-ghost">{t('cta.seeMenu')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
