import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'publishedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    { name: 'status', type: 'select', options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ], defaultValue: 'draft', admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'tags', type: 'array', fields: [
      { name: 'tag', type: 'text' },
    ]},
    { name: 'readTime', type: 'number', admin: { position: 'sidebar', description: 'Estimated read time in minutes' } },
  ],
}
