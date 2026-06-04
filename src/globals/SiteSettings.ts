import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'whoWeAre',
      type: 'textarea',
      label: 'Who We Are paragraph',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'workingHours',
      type: 'textarea',
      label: 'Working hours',
    },
    {
      name: 'googleMapUrl',
      type: 'text',
      label: 'Google Map link',
    },
    {
      name: 'whatsappUrl',
      type: 'text',
      label: 'WhatsApp link',
    },
    {
      name: 'viberUrl',
      type: 'text',
      label: 'Viber link',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram link',
    },
    {
      name: 'facebookUrl',
      type: 'text',
      label: 'Facebook link',
    },
  ],
}
