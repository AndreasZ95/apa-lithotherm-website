import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    components: {
      edit: {
        SaveButton: '@/components/admin/SaveAndCreateNextButton#SaveAndCreateNextButton',
      },
    },
    defaultColumns: ['title', 'category', 'published', 'updatedAt'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Product name',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      filterOptions: {
        type: {
          equals: 'product',
        },
      },
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Main photo',
      relationTo: 'media',
      displayPreview: true,
    },
    {
      name: 'gallery',
      type: 'upload',
      hasMany: true,
      label: 'Photo gallery',
      relationTo: 'media',
      displayPreview: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: 'Visible on website',
    },
  ],
}
