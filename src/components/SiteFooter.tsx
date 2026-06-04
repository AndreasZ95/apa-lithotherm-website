import { getPayloadClient } from '@/lib/payload'

function mapSearchUrl(address?: string | null) {
  if (!address) return ''

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

export async function SiteFooter() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })
  const year = new Date().getFullYear()
  const directionsUrl = settings.googleMapUrl || mapSearchUrl(settings.address)

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h2>A.P.A LithoTherm</h2>
          <p>Fireplaces, natural stones, barbeques and wood stoves.</p>
        </div>
        <div>
          <h3>Contact</h3>
          {settings.phone && (
            <p>
              <strong>Phone:</strong> <a href={`tel:${settings.phone.replaceAll(' ', '')}`}>{settings.phone}</a>
            </p>
          )}
          {settings.email && (
            <p>
              <strong>Email:</strong> <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>
          )}
          {settings.address && (
            <p>
              <strong>Address:</strong> {settings.address}
            </p>
          )}
        </div>
        <div>
          <h3>Working Hours</h3>
          {settings.workingHours ? <p>{settings.workingHours}</p> : <p>Monday - Saturday: 08:00 - 17:00<br />Sunday: Closed</p>}
        </div>
        <div>
          <h3>Links</h3>
          <div className="footer-socials">
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
          {directionsUrl && (
            <a className="footer-link directions-link" href={directionsUrl}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              Get Directions
            </a>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} A.P.A LithoTherm</span>
        <span>Design & Developed by A.Zavros</span>
      </div>
    </footer>
  )
}
