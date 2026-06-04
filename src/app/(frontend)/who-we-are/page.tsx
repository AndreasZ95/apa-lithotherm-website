import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function WhoWeArePage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <section className="page narrow">
      <h1>Who We Are</h1>
      <p>
        {settings.whoWeAre ||
          'A.P.A LithoTherm specializes in fireplaces, stone applications, BBQ areas, and wood stoves.'}
      </p>
    </section>
  )
}
