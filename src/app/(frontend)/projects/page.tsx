import { getPayloadClient, imageUrl, relationTitle } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const categoryID = category ? Number(category) : undefined
  const payload = await getPayloadClient()
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    where: {
      type: {
        equals: 'project',
      },
    },
  })
  const projects = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    where: {
      ...(categoryID
        ? {
            category: {
              equals: categoryID,
            },
          }
        : {}),
      published: {
        equals: true,
      },
    },
  })

  return (
    <section className="page">
      <div className="section-heading">
        <h1>Projects</h1>
      </div>
      <div className="filters">
        <a className={!categoryID ? 'active' : ''} href="/projects">
          All
        </a>
        {categories.docs.map((item) => (
          <a className={categoryID === item.id ? 'active' : ''} href={`/projects?category=${item.id}`} key={item.id}>
            {item.name}
          </a>
        ))}
      </div>
      <div className="grid">
        {projects.docs.map((project) => (
          <a className="tile" href={`/projects/${project.id}`} key={project.id}>
            {imageUrl(project.coverImage) ? (
              <img alt={project.title} src={imageUrl(project.coverImage) || ''} />
            ) : (
              <div className="image-placeholder">Photo</div>
            )}
            <span>{relationTitle(project.category)}</span>
            <h2>{project.title}</h2>
          </a>
        ))}
      </div>
    </section>
  )
}
