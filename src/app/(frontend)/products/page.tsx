import { getPayloadClient, imageUrl, relationTitle } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const categoryID = category ? Number(category) : undefined
  const payload = await getPayloadClient()
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    where: {
      type: {
        equals: 'product',
      },
    },
  })
  const products = await payload.find({
    collection: 'products',
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
        <h1>Products</h1>
      </div>
      <div className="filters">
        <a className={!categoryID ? 'active' : ''} href="/products">
          All
        </a>
        {categories.docs.map((item) => (
          <a className={categoryID === item.id ? 'active' : ''} href={`/products?category=${item.id}`} key={item.id}>
            {item.name}
          </a>
        ))}
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
