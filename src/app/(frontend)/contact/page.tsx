import { getPayloadClient } from '@/lib/payload'
import { ContactForm } from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

const apaMapUrl = 'https://maps.app.goo.gl/UR471u6n5JUtXseg8'
const apaMapEmbedUrl = 'https://www.google.com/maps?q=35.0235842,34.0131854&z=17&output=embed'

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })
  const directionsUrl = apaMapUrl
  const embedUrl = apaMapEmbedUrl

  return (
    <section className="page two-column">
      <div>
        <h1>Contact</h1>
        <ContactForm />
      </div>
      <aside className="info-panel">
        {settings.phone && <p><strong>Phone</strong><br />{settings.phone}</p>}
        {settings.email && <p><strong>Email</strong><br />{settings.email}</p>}
        {settings.address && <p><strong>Address</strong><br />{settings.address}</p>}
        {settings.workingHours && <p><strong>Working hours</strong><br />{settings.workingHours}</p>}
        <div className="socials">
          {settings.whatsappUrl && <a className="social-link text-link" href={settings.whatsappUrl}>WhatsApp</a>}
          {settings.viberUrl && <a className="social-link text-link" href={settings.viberUrl}>Viber</a>}
          {settings.instagramUrl && (
            <a aria-label="Instagram" className="social-link icon-link instagram-link" href={settings.instagramUrl}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect height="17" rx="5" width="17" x="3.5" y="3.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
          )}
          {settings.facebookUrl && (
            <a aria-label="Facebook" className="social-link icon-link facebook-link" href={settings.facebookUrl}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M15 8h2V4h-3c-3 0-5 2-5 5v2H7v4h2v6h4v-6h3l1-4h-4V9c0-1 1-1 2-1Z" />
              </svg>
            </a>
          )}
        </div>
        {embedUrl && (
          <div className="map-preview">
            <iframe
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={embedUrl}
              title="A.P.A LithoTherm map"
            />
          </div>
        )}
        {directionsUrl && (
          <a className="button map-button" href={directionsUrl}>
            Get Directions
          </a>
        )}
      </aside>
    </section>
  )
}
