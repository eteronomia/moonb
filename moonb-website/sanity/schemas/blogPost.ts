import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'author', type: 'string', initialValue: 'Moonb' }),
    defineField({ name: 'publishDate', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) }),
    defineField({ name: 'canonicalUrl', type: 'url' }),
    defineField({ name: 'ogTitle', type: 'string' }),
    defineField({ name: 'ogDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'noindex', type: 'boolean', initialValue: false }),
    defineField({
      name: 'tierClassification',
      type: 'string',
      options: { list: ['tier1', 'tier2', 'tier3', 'tier4'] },
    }),
    defineField({
      name: 'optimisationStatus',
      type: 'string',
      options: { list: ['cowork-optimised', 'pending', 'expanded'] },
    }),
  ],
});
