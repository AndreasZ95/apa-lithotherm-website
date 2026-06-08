import { getPayloadClient, imageUrl, relationTitle } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type CategoryDoc = {
  id: number | string
  name: string
  parent?: CategoryDoc | number | string | null
}

type PageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

function relationId(value: CategoryDoc | number | string | null | undefined) {
  if (!value) return undefined

  return typeof value === 'object' ? Number(value.id) : Number(value)
}

function childCategoryIds(categories: CategoryDoc[], parentID?: number) {
  if (!parentID) return []

  return categories.filter((item) => relationId(item.parent) === parentID).map((item) => Number(item.id))
}

function selectedParentId(categories: CategoryDoc[], selectedID?: number) {
  if (!selectedID) return undefined

  const selected = categories.find((item) => Number(item.id) === selectedID)
  const parentID = relationId(selected?.parent)

  return parentID || selectedID
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const categoryID = category ? Number(category) : undefined
  const payload = await getPayloadClient()
  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
    where: {
      type: {
        equals: 'project',
      },
    },
  })
  const projectCategories = categories.docs as CategoryDoc[]
  const parentCategories = projectCategories.filter((item) => !relationId(item.parent))
  const activeParentID = selectedParentId(projectCategories, categoryID)
  const activeSubcategories = activeParentID
    ? projectCategories.filter((child) => relationId(child.parent) === activeParentID)
    : []
  const selectedCategoryIDs = categoryID ? [categoryID, ...childCategoryIds(projectCategories, categoryID)] : []
  const projects = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    where: {
      ...(categoryID
        ? {
            category: {
              in: selectedCategoryIDs,
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
      <div className="filters category-filters">
        <div className="filter-row">
          <a className={!categoryID ? 'active' : ''} href="/projects">
            All
          </a>
          {parentCategories.map((item) => (
            <a
              className={activeParentID === Number(item.id) ? 'active' : ''}
              href={`/projects?category=${item.id}`}
              key={item.id}
            >
              {item.name}
            </a>
          ))}
        </div>
        {activeSubcategories.length > 0 && (
          <div className="filter-row subcategory-row">
            {activeSubcategories.map((child) => (
              <a
                className={`sub-filter ${categoryID === Number(child.id) ? 'active' : ''}`}
                href={`/projects?category=${child.id}`}
                key={child.id}
              >
                {child.name}
              </a>
            ))}
          </div>
        )}
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
