import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'featured', 'status'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'longDescription', type: 'richText' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'screenshots', type: 'array', fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'caption', type: 'text' },
    ]},
    { name: 'techStack', type: 'array', fields: [
      { name: 'tech', type: 'text' },
    ]},
    { name: 'githubUrl', type: 'text' },
    { name: 'liveUrl', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', options: [
      { label: 'Active', value: 'active' },
      { label: 'Archived', value: 'archived' },
      { label: 'In Progress', value: 'in-progress' },
    ], defaultValue: 'active', admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', options: [
      { label: 'Web App', value: 'web' },
      { label: 'Mobile App', value: 'mobile' },
      { label: 'CLI / Tool', value: 'cli' },
      { label: 'Open Source', value: 'oss' },
      { label: 'Other', value: 'other' },
    ], admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
