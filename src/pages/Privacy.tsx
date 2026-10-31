import SEO from '@/components/SEO'
import { useT } from '@/i18n/useT'
import { primaryLocation, telHref } from '@/data/site'

export default function Privacy() {
  const { lang } = useT()
  const es = lang === 'es'
  return (
    <>
      <SEO
        title="Privacy | Pizzeria El Chocolate"
        description="How elchocolatepizza.com handles your data: privacy-first analytics with no cookies, and no personal data collected on this site."
        path="/privacy"
        titleEs="Privacidad | Pizzeria El Chocolate"
        descriptionEs="Cómo elchocolatepizza.com maneja tus datos: analítica sin cookies y sin datos personales."
      />
      <section className="section">
        <div className="container max-w-3xl prose-pec">
          <p className="kicker mb-3">{es ? 'Privacidad' : 'Privacy'}</p>
          <h1 className="text-[clamp(2.4rem,6vw,4rem)]">{es ? 'Tu privacidad' : 'Your privacy'}</h1>
          <p className="lede mt-4">{es ? 'Este sitio es para ver el menú y encontrarnos. No pedimos ni guardamos datos personales.' : 'This site is for browsing the menu and finding us. We don’t ask for or store personal data.'}</p>
          <h2>{es ? 'Analítica' : 'Analytics'}</h2>
          <p>{es ? 'Usamos Plausible, una analítica que respeta la privacidad: sin cookies, sin perfiles y sin datos personales. Solo vemos totales como visitas por página.' : 'We use Plausible, privacy-first analytics: no cookies, no profiles and no personal data. We only see totals such as visits per page.'}</p>
          <h2>{es ? 'Preferencias' : 'Preferences'}</h2>
          <p>{es ? 'Tu idioma y tema (claro/oscuro) se guardan solo en tu navegador.' : 'Your language and light/dark choice are saved only in your browser.'}</p>
          <h2>{es ? 'Pedidos y mapas' : 'Orders and maps'}</h2>
          <p>{es ? 'Los pedidos en línea se hacen en Slice o DoorDash, y el mapa es de Google Maps. Esos servicios tienen sus propias políticas de privacidad.' : 'Online orders happen on Slice or DoorDash, and the map is provided by Google Maps. Those services have their own privacy policies.'}</p>
          <h2>{es ? 'Contacto' : 'Contact'}</h2>
          <p>{es ? 'Preguntas: llámanos al ' : 'Questions? Call us at '}<a href={telHref(primaryLocation.phone)}>{primaryLocation.phone}</a>.</p>
        </div>
      </section>
    </>
  )
}
