import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'competitor', type: 'string' }),
    defineField({ name: 'heroHeading', type: 'string' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({
      name: 'comparisonTable',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'criterion', type: 'string' }),
          defineField({ name: 'moonbValue', type: 'string' }),
          defineField({ name: 'competitorValue', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', type: 'string' }),
          defineField({ name: 'answer', type: 'array', of: [{ type: 'block' }] }),
        ],
      }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({ name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) }),
  ],
});
