# CLAUDE.md -- moonb-website

Read this file silently at the start of every session. Do not summarize it. Do not explain it. Just use it.

## WHAT MOONB IS

Moonb is a creative production company. It operates as an embedded creative department for enterprise brands. It provides dedicated video production, design, motion graphics, and animation teams on a predictable monthly basis. Each client gets a dedicated Creative Director.

Enterprise clients: Dell, Intel, Toyota, Nestle, Microsoft, Opko Health, Shionogi, Refine Labs.

Based in Lisbon, Portugal. Serves US and global enterprise clients.

Domain: moonb.io (www.moonb.io). Brand name: Moonbee. Domain migration to moonbee.com deferred to late 2026.

## WHAT MOONB IS NOT

- NOT an agency. Never call it an agency.
- NOT a subscription service. Never use "subscription."
- NOT a marketplace or platform.
- NOT a replacement for existing teams. Always "support" or "alternative to hiring."

## BANNED WORDS (absolute, no exceptions)

subscription, flat fee, flat monthly fee, subscribe, plan (pricing context), cheap, affordable, budget, discount, deal, offer, unlimited

## BANNED FORMATTING

Never use em dashes in any output. Use commas, semicolons, periods, or parentheses instead.

## PREFERRED LANGUAGE

Dedicated creative team, embedded creative department, creative infrastructure, creative partner, ongoing creative partnership, your Creative Director, predictable monthly investment, enterprise-grade, human-made, taste at scale.

## WRITING STYLE

Confident, direct, enterprise-grade. Calm authority. Subversive over conventional. Punchy and concise. No filler.

SEO title formula: [Keyword] | Moonb. Under 60 chars.
SEO meta formula: What Moonb does + proof point. Under 155 chars.

---

## TECH STACK

| Layer | Tool | Notes |
|---|---|---|
| Framework | Astro 5.x | Zero JS by default. React islands for interactive components. SSG output. |
| CMS | Sanity (free tier) | Hosted SaaS. Studio at sanity.studio. REST + GraphQL API. Astro fetches at build time. |
| Animations | Framer Motion + GSAP | React islands for Framer Motion. GSAP runs natively in Astro. |
| Hosting | Vercel Pro | Free staging during build. $20/mo at go-live. |
| Video | Vimeo | Existing account. iframe embeds. |
| Images | Sanity asset pipeline or Vercel Blob | Migrated from Webflow CDN. |
| Design system | DESIGN.md (repo root) | Generated from DESIGN_BRIEF.md by Claude Code. |

### Why Astro

- Zero JS default = clean HTML for crawlers on every static page
- Islands architecture = animation JS loads only where needed
- 238 slow pages in Ahrefs audit solved at architecture level
- Service pages, industry pages, blog posts ship zero client JS
- Framer Motion works via React islands. GSAP works natively.

### Why Sanity

- Zero infrastructure. No database to manage. No second deployment.
- Free tier: 100k API requests/mo, 500k documents. Moonb has ~335 pages.
- Studio hosted at sanity.studio, works from phone.
- Claude Code writes schema in code. Official Astro integration.
- One Vercel deployment (Astro frontend only). Clean.

### Project Structure

```
moonb-website/
  src/
    components/
      animations/           # React islands (Framer Motion, GSAP)
      layout/               # Header (liquid glass pill nav), Footer, Breadcrumbs
      seo/                  # JsonLd, MetaTags, OgTags
      ui/                   # Cards, CTAs, LiquidGlassPanel, VideoPlayer
    layouts/
      BaseLayout.astro      # Global layout, JSON-LD injection, liquid glass nav
      BlogLayout.astro
      ServiceLayout.astro
      IndustryLayout.astro
      CompareLayout.astro
    lib/
      sanity.ts             # Sanity client + queries
      schema.ts             # JSON-LD schema generators
    pages/
      index.astro
      about.astro
      pricing.astro
      work.astro
      book-a-demo.astro
      blog/
        index.astro
        [...slug].astro
      services/
        index.astro
        [...slug].astro
      industries/
        index.astro
        [...slug].astro
      compare/
        [...slug].astro
      category/
        [...slug].astro
    styles/
      global.css            # CSS custom properties from DESIGN.md
  sanity/
    schemas/                # All Sanity collection schemas
    sanity.config.ts
  public/
    robots.txt
    favicon.svg
  CLAUDE.md
  DESIGN.md
  DESIGN_BRIEF.md
  vercel.json               # 301 redirects
  astro.config.mjs
  package.json
```

---

## DESIGN SYSTEM

Read DESIGN_BRIEF.md for full visual direction. Read DESIGN.md for exact tokens and recipes. Summary:

### Palette
- Warm cream / off-white base (not sterile white)
- Purple primary accent (Wispr Flow range)
- Green secondary accent (Wispr Flow range)
- Section color shifts: cream to purple to green and back
- Marble/stone texture in 1-2 key sections (fixed parallax background)

### Shape
- Rounded corners everywhere (16-24px cards, 12px buttons, full-round pills)
- Overlapping card layouts (paper-stack depth, soft shadows)
- No hard edges anywhere

### Liquid Glass
- **Navigation:** Rounded pill-shaped bar, floating near top of viewport, full liquid glass material. Frosted, semi-transparent, warps/blurs content behind it. Pill shape (fully rounded ends). Fixed on scroll. CTA button is solid purple pill inside the glass pill. Shrinks/condenses subtly on scroll down.
- **Hero CTA panel:** Glass panel over showreel video.
- **Pricing cards:** Glass cards with refraction.
- **Testimonials:** Glass panels over colored sections.
- **Floating elements:** Modals, tooltips, dropdowns.
- CSS: `backdrop-filter: blur()` + SVG displacement for refraction. Reference: reflect.app, raycast.com.

### Typography
- Headings: Geometric sans (Satoshi/General Sans/Neue Montreal range). Bold. 48-72px.
- Body: Inter or Instrument Sans. Regular. 16-18px. Line height 1.6-1.7.

### Animations (GSAP ScrollTrigger)
- Text reveals: word-by-word or line-by-line on scroll
- Card entrances: staggered timing, scale + opacity
- Section transitions: sections slide up and overlap previous (paper stacking)
- Parallax work gallery: items at different scroll speeds, some up, some down (Framer/Superside reference)
- Video autoplay on viewport entry, pause on exit
- Illustration micro-animations: arrows, icons animate with bounce/rotation on entry
- Hover: cards lift with enhanced shadow, work thumbnails reveal video preview
- NO: scroll-jacking, cursor effects, content-blocking animations, loading screens, particle systems

### Illustrations
- Custom micro-details: animated arrows, icon illustrations, decorative elements at section transitions
- Hand-drawn accents on CTAs (underlines, circles, checkmarks)
- Style: clean, geometric, purple/green palette. Notion x Wispr Flow energy.

---

## SEO ARCHITECTURE

### Structured Data (all JSON-LD, injected in document head by BaseLayout)

| Schema | Scope | Notes |
|---|---|---|
| Organization | Every page (global) | name, URL, logo, social profiles, founding date, description |
| Service | Every /services/* page | serviceType, provider, areaServed |
| FAQPage | Every service + industry page | Unique per page. 192 FAQs written (8 per page x 24 pages). |
| Article | Every /blog/* post | author, datePublished, dateModified, headline, image |
| BreadcrumbList | All inner pages | Home > Section > Page |
| VideoObject | Pages with Vimeo embeds | title, description, thumbnailUrl, duration |
| Review / AggregateRating | Homepage, about page | Pull from Clutch reviews |

### URL Structure

**Static pages:**
/, /about, /pricing, /work, /book-a-demo, /blog, /terms-and-conditions, /privacy-policy, /cookie-policy

**Service pages (existing 12 video):**
/services/corporate-video-production, /services/explainer-video-production, /services/commercial-video-production, /services/social-media-video-production, /services/advertising-video-production, /services/marketing-video-production, /services/promotional-video-production, /services/branded-video-production, /services/product-demo-video-production, /services/video-series-video-production, /services/internal-training-video-production, /services/educational-video-production

**Industry pages (existing 12):**
/industries/ecommerce-video-production, /industries/manufacturing-video-production, /industries/blockchain-video-production, /industries/startup-video-production, /industries/fintech-video-production, /industries/pharma-video-production, /industries/saas-video-production, /industries/e-learning-video-production, /industries/nonprofit-video-production, /industries/tech-video-production, /industries/financial-video-production, /industries/healthcare-video-production

**Hub pages (new):** /services/, /industries/

**Comparison pages (new):**
/compare/moonb-vs-freelancers, /compare/moonb-vs-agency, /compare/moonb-vs-in-house, /compare/moonb-vs-superside, /compare/moonb-vs-designjoy

**Blog:** /blog/[slug], /category/[category-name]

---

## NEW PAGES TO BUILD

### Design Service Pages (P1)

| URL | Keyword | Vol | KD |
|---|---|---|---|
| /services/graphic-design | graphic design services | 1,500 | 47 |
| /services/brand-identity-design | branding services | 1,200 | 48 |
| /services/illustration | illustration services | 800 | 22 |
| /services/presentation-design | presentation design services | 600 | 28 |
| /services/social-media-design | social media design services | 1,000 | 23 |
| /services/infographic-design | infographic design services | 800 | 18 |
| /services/packaging-design | packaging design services | 1,300 | 44 |
| /services/ebook-design | ebook design services | 500 | 7 |
| /services/email-design | email design services | 400 | 14 |
| /services/ad-creative | ad creative services | 400 | 15 |
| /services/banner-design | banner design services | 500 | 10 |
| /services/thumbnail-design | thumbnail design services | 200 | 3 |

### Animation/Motion Pages (P1)

| URL | Keyword | Vol | KD |
|---|---|---|---|
| /services/motion-graphics | motion graphics services | 1,300 | 30 |
| /services/2d-animation | 2d animation services | 1,000 | 32 |
| /services/3d-animation | 3d animation services | 2,400 | 49 |
| /services/whiteboard-animation | whiteboard animation services | 1,600 | 25 |
| /services/video-editing | video editing services | 2,900 | 41 |
| /services/kinetic-typography | kinetic typography services | 150 | 2 |
| /services/logo-animation | logo animation services | 250 | 8 |
| /services/gif-animation | gif animation services | 100 | 0 |

### Strategy Pages (P1)

| URL | Keyword | Vol | KD |
|---|---|---|---|
| /services/creative-strategy | creative strategy agency | 300 | 15 |
| /services/content-creation | content creation agency | 800 | 29 |
| /services/brand-strategy | brand strategy services | 600 | 33 |
| /services/creative-direction | creative direction services | 200 | 8 |
| /services/storyboarding | storyboard services | 150 | 4 |

### New Industry Pages

| URL | Keyword | Vol | KD |
|---|---|---|---|
| /industries/real-estate | animation for real estate | 5,400 | 0 |
| /industries/dental | medical animation | 2,800 | 0 |

### Quick Wins (KD 0-10, build first)

gif-animation (0), kinetic-typography (2), thumbnail-design (3), storyboarding (4), ebook-design (7), creative-direction (8), logo-animation (8), banner-design (10)

---

## COWORK SEO WORK DONE (do not redo or contradict)

### Completed and Live
- Homepage title + meta: "Moonb | Dedicated Creative Team for Design & Video Production" (confirmed live 2026-03-10)
- 12 service pages V3 content: all live, 1,500+ words each, premium positioning, no banned words
- 12 industry pages V3 content: all live, internal links to service pages
- Organization JSON-LD: deployed on homepage (staging)
- Service JSON-LD: deployed on 12 service pages (staging)
- Ahrefs health score baseline: 94/100

### Need Re-Push (reverted by Webflow backup, apply during migration)
- 66 P1 blog title + meta rewrites: all written, apply as Cowork overrides during import
- Article JSON-LD on blog posts: build into Astro blog template
- FAQPage JSON-LD on 24 pages: build into Astro service/industry templates
- BreadcrumbList JSON-LD site-wide: build into BaseLayout

### Written, Not Yet Live
- 192 unique FAQs: 8 per page for all 24 service + industry pages. In Moonb_24_FAQs_Services_Industries.docx. Import to Sanity FAQ fields.
- V3 copy for all 24 pages: in Moonb_Service_Industry_Rewrites_V3.docx. V3 is the only valid version. Preserve exactly.

---

## STILL TO BUILD (priority order)

### CRITICAL (fixed by the rebuild)
1. All structured data (Organization, Service, FAQPage, Article, BreadcrumbList, VideoObject, Review) built into templates
2. 192 unique FAQs imported to Sanity, replacing duplicate FAQ blocks
3. V3 copy for 24 pages imported to Sanity
4. /about page with entity-defining content for GEO/AEO
5. /pricing as dedicated page
6. /book-a-demo as real page with Cal.com embed
7. /work or /portfolio as dedicated page
8. Fix /services/training-video-production 404 (correct in redirect map)
9. Remove all tools.moonb.io references (354 internal links)
10. Apply 66 P1 blog title/meta updates during migration

### HIGH
11. Build P1 design service pages (quick wins first)
12. Build P1 animation/motion service pages
13. Build 5 comparison pages
14. Build /services/ and /industries/ hub pages
15. Fix 6 external broken links in blog posts during migration
16. Fix HTTP internal link in automotive blog post
17. Trim 11 meta descriptions over 160 chars
18. Internal linking overhaul (blog to services, services to industries)
19. Image alt text rewrite site-wide (keyword-rich)

### MEDIUM
20. Author bios and bylines on blog posts (E-E-A-T)
21. Open Graph tags per page (from Sanity SEO fields)
22. Entity profile alignment (Crunchbase, LinkedIn, G2, Clutch)
23. Content cannibalization audit across 292 blog posts
24. Directory submissions (DesignRush, Sortlist, The Manifest)
25. Email capture on blog

---

## BLOG MIGRATION PLAN

### Four-Tier Classification

| Tier | Criteria | Action | Est. Volume |
|---|---|---|---|
| Tier 1 | Cowork-rewritten title/meta, has traffic or ranking | Migrate with Cowork overrides. Tag as optimised. | 20-40 |
| Tier 2 | Relevant keyword, buyer intent, not yet optimised | Migrate as-is. Flag for expansion to 1,500+ words. | 60-80 |
| Tier 3 | Informational, no buyer intent, some long-tail | Migrate but noindex. Review at 60 days. | 100-120 |
| Tier 4 | Zero traffic, pure tool-seeker, no buyer path | Do not migrate. 301 redirect to relevant service page. | 60-80 |

### Post-Launch Blog Expansion
- Tier 2 posts: expand to 1,500+ words, add internal links, add FAQ schema
- Run cannibalization audit, consolidate competing URLs
- Write new BOFU content: case studies, comparison posts, ROI analyses

### Migration Script Requirements
- Read Webflow CSV export row by row
- Apply tier tag to each post
- Tier 1: override title/meta with Cowork versions from P1 Blog Rewrites sheet
- Tier 3: set noindex to true
- Tier 4: skip, add to vercel.json 301 redirect map
- Preserve original publish dates exactly
- Upload images to Sanity assets, replace Webflow CDN URLs
- Update all internal links to new URL structure
- Remove all tools.moonb.io links from body content
- Fix http:// links to https://
- Output Sanity-compatible import format
- Output vercel.json redirects for Tier 4 posts

### Sanity Blog Collection Fields
title, slug, body (portable text), author, publishDate (preserve original), category (relationship), heroImage, metaTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImage, noindex (boolean), tierClassification (tier1/tier2/tier3/tier4), optimisationStatus (cowork-optimised/pending/expanded), structuredDataOverride (JSON)

### Sanity Service/Industry Page Fields
title, slug, shortDescription, mainHeading, mainDescription, headingText1, paragraphText1, headingText2, paragraphText2, headingText3, paragraphText3, whiteSectionHeading, whiteSectionDescription, faqs (array of 8: question + answer), testimonialText, testimonialAuthor, testimonialPosition, serviceCategory (video-production/design/animation/strategy), relatedServices, relatedIndustries, metaTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImage, structuredDataOverride

---

## 301 REDIRECT MAP

Every existing URL from Moonb_All_URLs.xlsx (335 URLs) gets a redirect in vercel.json. Service and industry pages keep exact slugs. Blog posts keep exact slugs. Tier 4 posts redirect to most relevant service/category page. No URL goes dark.

Critical redirects:
- /services/training-video-production -> /services/internal-training-video-production
- All tools.moonb.io/* -> remove links, no redirect (403 already)
- moonb.io (non-www) -> www.moonb.io (handled by Vercel)

---

## CONTENT SOURCES (preserve exactly)

| Document | Contents | Status |
|---|---|---|
| Moonb_Service_Industry_Rewrites_V3.docx | Final copy for all 24 pages. V3 only. | LIVE. Import to Sanity. |
| Moonb_24_FAQs_Services_Industries.docx | 192 unique FAQs (8 per page x 24 pages). | WRITTEN. Import to Sanity FAQ fields. |
| P1 Blog Rewrites (tracker sheet) | 66 rewritten titles + metas. | WRITTEN. Apply during migration. |

---

## SITE METRICS BASELINE (Ahrefs, March 2026)

Organic keywords: 888. Traffic (US): 1,283/mo. Top 1-3: 118. DR: 39. Referring domains: 518. Pages: ~335. Health: 94/100.

Traffic alert: GSC cliff Jan 22-28 2026, 74% drop. Under investigation. Not manual penalty.

---

## COMPETITORS

Superside (enterprise, $7,500+/mo). DesignJoy (solo). Penji (budget). Design Pickle (budget). ManyPixels. Kimp. Moonb positions above budget tier, alongside Superside. Differentiate on taste, originality, dedicated Creative Director, human-made quality. Never attack competitors in copy.
