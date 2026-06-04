import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
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
      label: 'Project name',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      filterOptions: {
        type: {
          equals: 'project',
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
