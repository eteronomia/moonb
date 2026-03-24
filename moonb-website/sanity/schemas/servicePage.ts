import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'shortDescription', type: 'string', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'mainHeading', type: 'string' }),
    defineField({ name: 'mainDescription', type: 'text' }),
    defineField({ name: 'headingText1', type: 'string' }),
    defineField({ name: 'paragraphText1', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'headingText2', type: 'string' }),
    defineField({ name: 'paragraphText2', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'headingText3', type: 'string' }),
    defineField({ name: 'paragraphText3', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'whiteSectionHeading', type: 'string' }),
    defineField({ name: 'whiteSectionDescription', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'answer', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        ],
      }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({ name: 'testimonialText', type: 'text' }),
    defineField({ name: 'testimonialAuthor', type: 'string' }),
    defineField({ name: 'testimonialPosition', type: 'string' }),
    defineField({
      name: 'serviceCategory',
      type: 'string',
      options: { list: ['video-production', 'design', 'animation', 'strategy'] },
    }),
    defineField({ name: 'relatedServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] }),
    defineField({ name: 'relatedIndustries', type: 'array', of: [{ type: 'reference', to: [{ type: 'industryPage' }] }] }),
    defineField({
      name: 'portfolioVideos',
      title: 'Portfolio Videos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'vimeoUrl', title: 'Vimeo URL', type: 'url', validation: (Rule) => Rule.required() }),
          defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
        ],
        preview: {
          select: { title: 'title', media: 'thumbnail' },
        },
      }],
    }),
    defineField({
      name: 'portfolioImages',
      title: 'Portfolio Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'caption', type: 'string' }),
          defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }),
        ],
      }],
    }),
    defineField({ name: 'relatedBlogPosts', title: 'Related Blog Posts', type: 'array', of: [{ type: 'reference', to: [{ type: 'blogPost' }] }] }),
    defineField({ name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) }),
    defineField({ name: 'canonicalUrl', type: 'url' }),
    defineField({ name: 'ogTitle', type: 'string' }),
    defineField({ name: 'ogDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
  ],
});
