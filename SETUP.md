# SETUP.md -- First Session Scaffold Plan

Input for Claude Code's first `/plan` command. Delete from repo after scaffold is complete.

---

## 1. Initialize Project

```bash
npm create astro@latest moonb-website -- --template minimal
cd moonb-website
```

### Install Dependencies

```bash
# Astro integrations
npx astro add react sitemap vercel

# Animation
npm install framer-motion gsap @gsap/react

# Sanity
npm install @sanity/client @sanity/image-url sanity @sanity/vision

# Types
npm install -D @types/react @types/react-dom typescript
```

### Project Structure

```
moonb-website/
  src/
    components/
      animations/           # React islands (Framer Motion, GSAP wrappers)
      layout/
        LiquidGlassNav.tsx  # Pill-shaped frosted glass nav (React island)
        Footer.astro
        Breadcrumbs.astro
      seo/
        JsonLd.astro        # Generic JSON-LD injector
        MetaTags.astro      # Meta title, description, canonical, OG
      ui/
        LiquidGlassPanel.tsx  # Reusable glass panel component
        RoundedCard.astro
        VideoPlayer.tsx     # Autoplay on viewport, pause on exit
        ParallaxGallery.tsx # Framer/Superside-style up/down scroll
    layouts/
      BaseLayout.astro
      BlogLayout.astro
      ServiceLayout.astro
      IndustryLayout.astro
      CompareLayout.astro
    lib/
      sanity.ts             # Sanity client, all GROQ queries
      schema.ts             # JSON-LD generators per schema type
    pages/
      index.astro           # Homepage with showreel hero
      about.astro
      pricing.astro
      work.astro
      book-a-demo.astro
      blog/
        index.astro
        [...slug].astro
      services/
        index.astro         # Hub page
        [...slug].astro
      industries/
        index.astro         # Hub page
        [...slug].astro
      compare/
        [...slug].astro
      category/
        [...slug].astro
    styles/
      global.css            # CSS custom properties from DESIGN.md
      liquid-glass.css      # Glass effect recipes
  sanity/
    schemas/
      blogPost.ts
      servicePage.ts
      industryPage.ts
      comparisonPage.ts
      caseStudy.ts
      category.ts
      aboutPage.ts          # Singleton document
    sanity.config.ts
    sanity.cli.ts
  public/
    robots.txt
    favicon.svg
  CLAUDE.md
  DESIGN.md
  DESIGN_BRIEF.md
  vercel.json
  astro.config.mjs
  package.json
  tsconfig.json
```

---

## 2. Astro Configuration

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.moonb.io',
  output: 'static',
  adapter: vercel({ imageService: true }),
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ['framer-motion'],
    },
  },
});
```

---

## 3. Sanity Project Setup

```bash
# In project root
npm create sanity@latest -- --project-path sanity --dataset production
```

Configure Sanity Studio to deploy to sanity.studio (free hosted).

### Sanity Schemas

#### Blog Post

```ts
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'author', type: 'string', initialValue: 'Moonb' },
    { name: 'publishDate', type: 'datetime', validation: (Rule) => Rule.required() },
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'heroImage', type: 'image', options: { hotspot: true } },
    // SEO
    { name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) },
    { name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) },
    { name: 'canonicalUrl', type: 'url' },
    { name: 'ogTitle', type: 'string' },
    { name: 'ogDescription', type: 'text', rows: 2 },
    { name: 'ogImage', type: 'image' },
    // Migration
    { name: 'noindex', type: 'boolean', initialValue: false },
    {
      name: 'tierClassification',
      type: 'string',
      options: { list: ['tier1', 'tier2', 'tier3', 'tier4'] },
    },
    {
      name: 'optimisationStatus',
      type: 'string',
      options: { list: ['cowork-optimised', 'pending', 'expanded'] },
    },
  ],
}
```

#### Service Page

```ts
export default {
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() },
    { name: 'shortDescription', type: 'string', validation: (Rule) => Rule.max(60) },
    { name: 'mainHeading', type: 'string' },
    { name: 'mainDescription', type: 'text' },
    { name: 'headingText1', type: 'string' },
    { name: 'paragraphText1', type: 'array', of: [{ type: 'block' }] },
    { name: 'headingText2', type: 'string' },
    { name: 'paragraphText2', type: 'array', of: [{ type: 'block' }] },
    { name: 'headingText3', type: 'string' },
    { name: 'paragraphText3', type: 'array', of: [{ type: 'block' }] },
    { name: 'whiteSectionHeading', type: 'string' },
    { name: 'whiteSectionDescription', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'faqs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', validation: (Rule) => Rule.required() },
          { name: 'answer', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
        ],
      }],
      validation: (Rule) => Rule.max(8),
    },
    { name: 'testimonialText', type: 'text' },
    { name: 'testimonialAuthor', type: 'string' },
    { name: 'testimonialPosition', type: 'string' },
    {
      name: 'serviceCategory',
      type: 'string',
      options: { list: ['video-production', 'design', 'animation', 'strategy'] },
    },
    { name: 'relatedServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] },
    { name: 'relatedIndustries', type: 'array', of: [{ type: 'reference', to: [{ type: 'industryPage' }] }] },
    // SEO
    { name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) },
    { name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) },
    { name: 'canonicalUrl', type: 'url' },
    { name: 'ogTitle', type: 'string' },
    { name: 'ogDescription', type: 'text', rows: 2 },
    { name: 'ogImage', type: 'image' },
  ],
}
```

#### Industry Page

Same structure as Service Page, plus:
```ts
{ name: 'industryFocus', type: 'string' },
{ name: 'relatedCaseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }] },
```

#### Comparison Page

```ts
export default {
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'competitor', type: 'string' },
    { name: 'heroHeading', type: 'string' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    {
      name: 'comparisonTable',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'criterion', type: 'string' },
          { name: 'moonbValue', type: 'string' },
          { name: 'competitorValue', type: 'string' },
        ],
      }],
    },
    {
      name: 'faqs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string' },
          { name: 'answer', type: 'array', of: [{ type: 'block' }] },
        ],
      }],
      validation: (Rule) => Rule.max(6),
    },
    { name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) },
    { name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) },
  ],
}
```

#### Case Study

```ts
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'client', type: 'string' },
    { name: 'industry', type: 'reference', to: [{ type: 'industryPage' }] },
    { name: 'services', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] },
    { name: 'challenge', type: 'array', of: [{ type: 'block' }] },
    { name: 'solution', type: 'array', of: [{ type: 'block' }] },
    { name: 'results', type: 'array', of: [{ type: 'block' }] },
    { name: 'heroImage', type: 'image', options: { hotspot: true } },
    { name: 'galleryImages', type: 'array', of: [{ type: 'image' }] },
    { name: 'videoEmbed', type: 'url' },
    { name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) },
    { name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) },
  ],
}
```

#### Category

```ts
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() },
  ],
}
```

Pre-populate: video-content-creation, ai, creative-strategy, animation, marketing, editing, production, video

#### About Page (singleton)

```ts
export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    { name: 'heroHeading', type: 'string' },
    { name: 'foundingStory', type: 'array', of: [{ type: 'block' }] },
    { name: 'teamSection', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'clientLogos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'logo', type: 'image' },
          { name: 'name', type: 'string' },
        ],
      }],
    },
    { name: 'awards', type: 'array', of: [{ type: 'block' }] },
    { name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) },
    { name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(155) },
  ],
}
```

---

## 4. Sanity Client (src/lib/sanity.ts)

```ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2026-03-23',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// GROQ queries
export async function getServicePages() {
  return client.fetch(`*[_type == "servicePage"] | order(title asc)`);
}
export async function getServicePage(slug: string) {
  return client.fetch(`*[_type == "servicePage" && slug.current == $slug][0]`, { slug });
}
// ... same pattern for all content types
```

---

## 5. BaseLayout with JSON-LD

BaseLayout.astro must:
- Accept page-level JSON-LD props and inject in `<head>`
- Always include Organization schema
- Generate BreadcrumbList from URL path
- Render meta title, description, canonical, OG tags from props
- Include the liquid glass pill nav component (React island, `client:load`)
- Include footer
- Load global.css and liquid-glass.css
- Ship zero JS on pages without islands

---

## 6. JSON-LD Generators (src/lib/schema.ts)

```ts
export function organizationSchema() { /* ... */ }
export function serviceSchema(page: ServicePage) { /* ... */ }
export function faqPageSchema(faqs: FAQ[]) { /* ... */ }
export function articleSchema(post: BlogPost) { /* ... */ }
export function breadcrumbSchema(crumbs: Crumb[]) { /* ... */ }
export function videoObjectSchema(video: Video) { /* ... */ }
export function reviewSchema(reviews: Review[]) { /* ... */ }
```

---

## 7. Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://www.moonb.io/sitemap-index.xml
```

---

## 8. Vercel Config

Single Vercel project. Root directory is project root. Build command: `npm run build`. Output: `dist/`.

Environment variables:
```
PUBLIC_SANITY_PROJECT_ID=...
PUBLIC_SANITY_DATASET=production
```

vercel.json contains the 301 redirect map (generated later during migration).

---

## 9. Verification Checklist (end of session 1)

- [ ] `npm run build` succeeds with zero errors
- [ ] dist/ contains .html files with zero `<script>` tags on static pages
- [ ] Sanity Studio deploys to sanity.studio and shows all schemas
- [ ] Blog post schema has noindex toggle and tier classification
- [ ] Service page schema has FAQ array (max 8)
- [ ] JSON-LD generators exist in src/lib/schema.ts
- [ ] BaseLayout injects Organization JSON-LD on every page
- [ ] robots.txt in public/
- [ ] Vercel preview URL loads
- [ ] Global CSS file has placeholder custom properties for DESIGN.md tokens

---

## DELETE THIS FILE AFTER SCAFFOLD IS COMPLETE
