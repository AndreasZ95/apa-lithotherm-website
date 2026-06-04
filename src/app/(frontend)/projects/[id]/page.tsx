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

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params
  const payload = await getPayloadClient()
  const project = await payload.findByID({
    collection: 'projects',
    depth: 2,
    id,
  })

  if (!project?.published) notFound()

  const photos = [project.coverImage, ...(Array.isArray(project.gallery) ? project.gallery : [])].filter(Boolean)
  const galleryPhotos = photos
    .map((photo, index) => ({
      alt: `${project.title} photo ${index + 1}`,
      src: imageUrl(photo) || '',
    }))
    .filter((photo) => photo.src)

  return (
    <section className="detail">
      <div className="detail-copy">
        <BackButton fallbackHref="/projects" />
        <p className="eyebrow">{relationTitle(project.category)}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
      <GalleryCarousel photos={galleryPhotos} title={project.title} />
    </section>
  )
}
