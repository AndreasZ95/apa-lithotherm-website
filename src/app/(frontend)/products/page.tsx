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

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const categoryID = category ? Number(category) : undefined
  const payload = await getPayloadClient()
  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
    where: {
      type: {
        equals: 'product',
      },
    },
  })
  const productCategories = categories.docs as CategoryDoc[]
  const parentCategories = productCategories.filter((item) => !relationId(item.parent))
  const activeParentID = selectedParentId(productCategories, categoryID)
  const activeSubcategories = activeParentID
    ? productCategories.filter((child) => relationId(child.parent) === activeParentID)
    : []
  const selectedCategoryIDs = categoryID ? [categoryID, ...childCategoryIds(productCategories, categoryID)] : []
  const products = await payload.find({
    collection: 'products',
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
        <h1>Products</h1>
      </div>
      <div className="filters category-filters">
        <div className="filter-row">
          <a className={!categoryID ? 'active' : ''} href="/products">
            All
          </a>
          {parentCategories.map((item) => (
            <a
              className={activeParentID === Number(item.id) ? 'active' : ''}
              href={`/products?category=${item.id}`}
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
                href={`/products?category=${child.id}`}
                key={child.id}
              >
                {child.name}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="grid">
        {products.docs.map((product) => (
          <a className="tile" href={`/products/${product.id}`} key={product.id}>
            {imageUrl(product.coverImage) ? (
              <img alt={product.title} src={imageUrl(product.coverImage) || ''} />
            ) : (
              <div className="image-placeholder">Photo</div>
            )}
            <span>{relationTitle(product.category)}</span>
            <h2>{product.title}</h2>
          </a>
        ))}
      </div>
    </section>
  )
}
