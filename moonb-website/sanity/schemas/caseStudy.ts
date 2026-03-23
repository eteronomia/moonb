import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'industry', type: 'reference', to: [{ type: 'industryPage' }] }),
    defineField({ name: 'services', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] }),
    defineField({ name: 'challenge', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'solution', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'results', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'galleryImages', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'videoEmbed', type: 'url' }),
    defineField({ name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) }),
  ],
});
