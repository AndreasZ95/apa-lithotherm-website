import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    defaultColumns: ['name', 'type'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'product',
      options: [
        {
          label: 'Product',
          value: 'product',
        },
        {
          label: 'Project',
          value: 'project',
        },
      ],
      required: true,
    },
  ],
}
