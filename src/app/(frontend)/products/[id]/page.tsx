import { notFound } from 'next/navigation'
import { BackButton } from '@/components/BackButton'
import { GalleryCarousel } from '@/components/GalleryCarousel'
import { getPayloadClient, imageUrl, relationTitle } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const payload = await getPayloadClient()
  const product = await payload.findByID({
    collection: 'products',
    depth: 2,
    id,
  })

  if (!product?.published) notFound()

  const photos = [product.coverImage, ...(Array.isArray(product.gallery) ? product.gallery : [])].filter(Boolean)
  const galleryPhotos = photos
    .map((photo, index) => ({
      alt: `${product.title} photo ${index + 1}`,
      src: imageUrl(photo) || '',
    }))
    .filter((photo) => photo.src)

  return (
    <section className="detail">
      <div className="detail-copy">
        <BackButton fallbackHref="/products" />
        <p className="eyebrow">{relationTitle(product.category)}</p>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <a className="button primary" href="/contact">
          Contact us for more info
        </a>
      </div>
      <div className="detail-gallery">
        <GalleryCarousel photos={galleryPhotos} title={product.title} />
      </div>
    </section>
  )
}
