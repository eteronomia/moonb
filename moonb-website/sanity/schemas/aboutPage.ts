import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', type: 'string' }),
    defineField({ name: 'foundingStory', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'teamSection', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'clientLogos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'logo', type: 'image' }),
          defineField({ name: 'name', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'awards', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) }),
  ],
});
