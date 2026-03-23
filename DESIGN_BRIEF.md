# DESIGN BRIEF: moonb.io Rebuild

Final version. All preferences confirmed through conversation. This brief drives DESIGN.md generation.

---

## THE FEEL

A CMO lands on moonb.io. A showreel starts playing. The work is undeniable. As they scroll, sections layer on top of each other like beautiful sheets of thick paper, rounded corners, soft shadows, depth. Liquid glass panels catch the light. Illustrations animate on small details: arrows, icons, transitions. The color shifts from warm cream to purple to green between sections. Every scroll trigger feels intentional. The site feels like the best AI startup landing pages, not a traditional creative agency site.

The site sells taste through its own design. If the site looks this good, the work must be incredible.

## BASE PALETTE

- **Background:** Warm cream / off-white (not sterile white, think Notion's warmth)
- **Primary accent:** Purple (Wispr Flow range, used on buttons, CTAs, active states)
- **Secondary accent:** Green (Wispr Flow range, used on select sections, success states, highlights)
- **Text:** Near-black on light sections, off-white on colored sections
- **Section color shifts:** Sections transition between cream, purple, green, and back to cream (like Wispr Flow and Pitch)
- **Texture:** Marble / stone / paper grain texture in select sections as a fixed or slow-parallax background that content scrolls over (meetup.com effect). Not everywhere, just 1-2 hero or portfolio moments for physical depth.

## SHAPE LANGUAGE

- **Rounded corners on everything.** Cards, sections, buttons, inputs, nav items, video players, image containers. Consistent radius (16-24px on cards, 12px on buttons, full-round on pills/tags).
- **Overlapping card layouts.** Sections and feature cards sit on top of each other like layered pieces of paper. Slight offsets, soft shadows creating depth and hierarchy. Reference: Notion's feature cards, Rows' stacking sections, current Moonb's existing overlapping card style (evolve this further).
- **No hard edges anywhere.** Even full-width sections have internal content containers with rounded corners.

## LIQUID GLASS

Apple's iOS 26 Liquid Glass effect applied to key UI elements. Not everywhere, but in high-impact moments:

- **Navigation bar:** Frosted glass nav that warps/blurs the content scrolling behind it. The Wispr Flow menu style but with liquid glass treatment.
- **Hero CTA panel:** The headline and buttons sit on a frosted glass panel overlaying the showreel video.
- **Pricing cards:** Each pricing tier is a liquid glass card with subtle refraction of the background gradient behind it.
- **Testimonial blocks:** Frosted glass panels over a colored section background.
- **Floating elements:** Any element that "hovers" over a background (modals, tooltips, dropdowns) gets the glass treatment.

Technical approach: CSS `backdrop-filter: blur()` combined with SVG displacement filters for the warping/refraction effect. GSAP for scroll-triggered activation. Reference: reflect.app for the cleanest implementation, Raycast for the nav treatment.

## TYPOGRAPHY

Bold, clean, modern sans-serif. Editorial energy on headlines, highly readable on body.

- **Headings:** Geometric sans-serif (Satoshi, General Sans, or Neue Montreal range). Bold weight. Large sizes. Headlines should feel like magazine covers.
- **Body:** Clean workhorse sans (Inter or Instrument Sans). Regular weight. Generous line height (1.6-1.7).
- **Hierarchy through size, not weight variations.** H1 is massive (48-72px), body is comfortable (16-18px). The contrast between them creates visual rhythm.

## ANIMATION PHILOSOPHY

Insane level animations that never become unusable. Every animation has a reason: draw attention to work, guide the eye, create a feeling of craft and precision. Bold but functional.

### Scroll animations (GSAP ScrollTrigger)
- **Text reveals:** Headlines split and animate in word-by-word or line-by-line on scroll entry. Staggered, smooth, purposeful.
- **Card entrances:** Feature cards and work cards animate in with staggered timing, slight scale and opacity shifts. Cards closer to viewport enter first.
- **Section transitions:** Sections slide up and overlap the previous section like paper stacking. The rounded corners of the new section appear over the bottom of the previous one.
- **Parallax work gallery:** Portfolio/work items move at different scroll speeds, some going up, some going down, creating depth. Reference: Framer's recent work section, Superside's scrolling visuals.
- **Counter/metric animations:** Numbers count up as they enter viewport.
- **Illustration micro-animations:** Small illustrated elements (arrows, icons, decorative details) animate with subtle bounce, rotation, or path movement as they enter view.

### Page-level animations
- **Smooth page transitions:** Pages transition with a subtle fade and slide, not hard cuts.
- **Video autoplay on scroll:** Showreel and process videos begin playing as they enter the viewport, pause when they leave.
- **Hover states:** Work thumbnails reveal video preview or subtle zoom. Cards lift slightly with enhanced shadow. Buttons have smooth color transitions.

### What NOT to animate
- No scroll-jacking (user controls scroll speed always).
- No cursor effects (no custom cursors, no trails).
- No animations that block content from being read.
- No loading screens that delay content (progressive loading instead).
- No excessive particle systems or WebGL backgrounds.

## ILLUSTRATION ELEMENTS

Custom illustrations as micro-details throughout the site, not as hero visuals. These add warmth and personality:

- **Animated arrows** between steps in "how it works" sections.
- **Icon illustrations** for service categories (design, video, motion, strategy).
- **Decorative elements** at section transitions (small shapes, lines, dots that animate on scroll).
- **Hand-drawn style accents** on CTAs or highlighted text (underlines, circles, checkmarks).

Style: Clean, geometric, matching the purple/green accent palette. Not childish, not corporate. Think Notion's illustration style crossed with Wispr Flow's playfulness. Custom, not stock. Not AI-generated looking.

## HOMEPAGE STRUCTURE

1. **Hero section:** Showreel video playing (autoplay, muted, loop). Liquid glass panel overlay with headline, subheadline, and CTA buttons. Client logos marquee below. Innovative presentation: the video could be contained in a large rounded-corner container with the glass panel floating over one corner, or the video could be full-width with the glass panel centered.

2. **Capabilities overview:** "What we do" section. Rounded cards for Design, Video, Motion, Strategy. Each card has an illustration icon and brief description. Cards overlap slightly, staggered entrance animation on scroll.

3. **Recent work highlights:** Framer/Superside-style parallax gallery. 4-6 work pieces displayed as large rounded cards that move at different scroll speeds (some up, some down). Video thumbnails autoplay on hover. "See all work" link to /work page.

4. **How it works:** Process video embed in a rounded container. 3-4 step cards with animated arrows between them. Step cards stack/overlap as you scroll through them.

5. **Social proof:** Testimonials in liquid glass cards over a purple or green section background. Clutch rating, client count, years of experience as animated counters.

6. **CTA section:** Full-width colored section (purple or green) with bold headline and booking CTA. Liquid glass button treatment.

## KEY DEDICATED PAGES

- **/work** or **/portfolio:** Full portfolio page. Grid or masonry layout of work cards with category filters. Video thumbnails autoplay on hover. Rounded corners on everything.
- **/pricing:** Dedicated page with liquid glass pricing cards, comparison table, FAQ section, CTA. Not on homepage anymore.
- **/about:** Entity-defining page for GEO/AEO. Founding story, team, clients, awards.
- **/services/[slug]:** All existing + new service pages. V3 copy preserved.
- **/industries/[slug]:** All existing industry pages. V3 copy preserved.
- **/compare/[slug]:** Comparison pages.
- **/book-a-demo:** Dedicated booking page with Cal.com embed.
- **/blog/[slug]:** Blog with article schema.

## COMPETITIVE VISUAL POSITIONING

The biggest competitor looks like enterprise software: corporate blue, feature checklists, dashboard energy. Moonb should look like a premium tech startup that happens to sell creative services. Warm where they are cold. Playful where they are rigid. Illustrated where they are stock-photo. Animated where they are static.

Budget competitors look like discount marketplaces. Moonb's cream + purple + liquid glass immediately signals a different tier.

## REFERENCE SITES (confirmed preferences)

| Site | What to take from it |
|---|---|
| **superside.com** | Navigation structure, pricing page layout, services mega-menu, scrolling visual elements |
| **framer.com** | Scroll animations, parallax work cards (up/down movement), hero animation quality, recent work section layout |
| **wisprflow.ai** | Purple/green color palette, rounded sections, illustration style, section color shifts, menu style (adapt to liquid glass) |
| **meetup.com** | Marble/stone texture scroll-over effect for select sections |
| **notion.so** | Warm cream background, overlapping card layouts, illustration style, overall warmth |
| **clay.com** | Purple accents, cream sections, workflow animation sequences, B2B energy with startup polish |
| **linear.app** | Typography excellence, frosted glass card edges, purple accent, section transitions |
| **pitch.com** | Section color shifts (white to purple to green), illustrations mixed with product, rounded cards |
| **lottiefiles.com** | Animation as design element, purple accents, playful illustration energy |
| **rows.com** | Stacking/overlapping card animations on scroll, cream tones, GSAP-quality scroll triggers |
| **raycast.com** | Glassmorphism on nav and feature cards, light mode liquid glass treatment |
| **arc.net** | Playful illustrations on arrows and micro-elements, rounded corners, personality in animation |
| **beautiful.ai** | Cream editorial feel, rounded overlapping cards, smooth path animations |
| **reflect.app** | Best reference for liquid glass on light backgrounds, frosted pricing cards, refraction effect |
| **stripe.com** | Micro-interactions on pricing/features, glassmorphism on light backgrounds, enterprise credibility |

## WHAT THIS BRIEF PRODUCES

Claude Code reads this brief + visits/analyzes the reference URLs and generates DESIGN.md containing:
- Typography scale (exact font, sizes, weights, line heights)
- Color tokens (exact hex values for cream, purple, green, text, shadows, glass overlays)
- Spacing scale (padding, margins, gaps)
- Border radius tokens (cards, buttons, sections, pills)
- Shadow tokens (card shadows, overlapping depth shadows, hover lift shadows)
- Liquid glass CSS recipes (blur values, opacity, border treatments, refraction filters)
- Animation timing tokens (duration, easing curves, stagger delays)
- Component patterns (card, section, nav, hero, CTA, testimonial, pricing card)
- Texture implementation (marble/grain background approach)
- Illustration style guide (color, stroke weight, animation behavior)

DESIGN.md is committed to repo root. Every Claude Code session reads it and builds components to spec.
