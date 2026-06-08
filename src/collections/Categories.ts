import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    components: {
      edit: {
        SaveButton: '@/components/admin/SaveAndCreateNextButton#SaveAndCreateNextButton',
      },
    },
    defaultColumns: ['name', 'type', 'parent'],
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
    {
      name: 'parent',
      type: 'relationship',
      admin: {
        description: 'Optional. Select a parent category to make this category a subcategory.',
      },
      filterOptions: ({ data }) => ({
        type: {
          equals: data?.type || 'product',
        },
      }),
      label: 'Parent category',
      relationTo: 'categories',
    },
  ],
}
