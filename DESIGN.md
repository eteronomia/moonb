# DESIGN.md — Moonb Design System

Generated from DESIGN_BRIEF.md. Source of truth for all visual implementation. Every component, layout, and animation references these tokens.

---

## 1. COLOR TOKENS

### Base

| Token | Hex | Usage |
|---|---|---|
| `--color-cream` | `#FAF7F2` | Default page background, warm off-white |
| `--color-cream-dark` | `#F0EBE3` | Subtle background differentiation |
| `--color-white` | `#FFFFFF` | Cards, inputs, elevated surfaces |

### Purple (Primary Accent)

| Token | Hex | Usage |
|---|---|---|
| `--color-purple-50` | `#F5F0FF` | Tinted backgrounds |
| `--color-purple-100` | `#EDE5FF` | Light purple fills |
| `--color-purple-200` | `#D4BFFF` | Text on dark purple sections |
| `--color-purple-300` | `#B794F6` | Decorative accents |
| `--color-purple-400` | `#9F67FF` | Hover states |
| `--color-purple-500` | `#7C3AED` | Primary buttons, CTAs, active states |
| `--color-purple-600` | `#6D28D9` | Button hover, strong emphasis |
| `--color-purple-700` | `#5B21B6` | Section backgrounds |
| `--color-purple-800` | `#4C1D95` | Deep section backgrounds |
| `--color-purple-900` | `#3B0F7A` | Darkest purple |

### Green (Secondary Accent)

| Token | Hex | Usage |
|---|---|---|
| `--color-green-50` | `#ECFDF5` | Tinted backgrounds |
| `--color-green-100` | `#D1FAE5` | Light green fills |
| `--color-green-200` | `#A7F3D0` | Text on dark green sections |
| `--color-green-300` | `#6EE7B7` | Decorative accents |
| `--color-green-400` | `#34D399` | Success states, highlights |
| `--color-green-500` | `#10B981` | Secondary CTAs |
| `--color-green-600` | `#059669` | Section backgrounds |
| `--color-green-700` | `#047857` | Deep section backgrounds |
| `--color-green-800` | `#065F46` | Dark green |
| `--color-green-900` | `#064E3B` | Darkest green |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--color-text-primary` | `#1A1A2E` | Headings, primary body text on light |
| `--color-text-secondary` | `#4A4A68` | Body text, descriptions |
| `--color-text-muted` | `#8888A0` | Captions, timestamps, placeholders |
| `--color-text-on-dark` | `#F5F3EF` | Text on dark backgrounds |
| `--color-text-on-purple` | `#F5F0FF` | Text on purple sections |
| `--color-text-on-green` | `#ECFDF5` | Text on green sections |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--color-border` | `rgba(26, 26, 46, 0.08)` | Default dividers |
| `--color-border-strong` | `rgba(26, 26, 46, 0.15)` | Emphasized borders |

---

## 2. TYPOGRAPHY

### Font Families

| Token | Stack | Usage |
|---|---|---|
| `--font-heading` | `'General Sans', 'Satoshi', system-ui, sans-serif` | All headings, nav, brand |
| `--font-body` | `'Inter', 'Instrument Sans', system-ui, sans-serif` | Body, buttons, inputs, captions |

### Type Scale (Desktop)

| Token | Size | Usage |
|---|---|---|
| `--text-display` | `72px / 4.5rem` | Hero headlines |
| `--text-h1` | `56px / 3.5rem` | Page titles |
| `--text-h2` | `40px / 2.5rem` | Section headings |
| `--text-h3` | `28px / 1.75rem` | Sub-section headings |
| `--text-h4` | `22px / 1.375rem` | Card titles |
| `--text-body-lg` | `18px / 1.125rem` | Lead paragraphs |
| `--text-body` | `16px / 1rem` | Default body |
| `--text-small` | `14px / 0.875rem` | Nav links, captions |
| `--text-caption` | `12px / 0.75rem` | Fine print |

### Type Scale (Mobile, below 768px)

| Token | Size |
|---|---|
| `--text-display` | `44px / 2.75rem` |
| `--text-h1` | `36px / 2.25rem` |
| `--text-h2` | `28px / 1.75rem` |
| `--text-h3` | `22px / 1.375rem` |
| `--text-h4` | `18px / 1.125rem` |

### Line Heights

| Token | Value | Usage |
|---|---|---|
| `--leading-tight` | `1.15` | Display, H1 |
| `--leading-snug` | `1.3` | H2, H3 |
| `--leading-normal` | `1.6` | Body |
| `--leading-relaxed` | `1.7` | Long-form body |

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `--weight-regular` | `400` | Body text |
| `--weight-medium` | `500` | Nav links, subtle emphasis |
| `--weight-semibold` | `600` | Buttons, strong labels |
| `--weight-bold` | `700` | All headings |

---

## 3. SPACING SCALE

| Token | Value | px |
|---|---|---|
| `--space-1` | `0.25rem` | 4 |
| `--space-2` | `0.5rem` | 8 |
| `--space-3` | `0.75rem` | 12 |
| `--space-4` | `1rem` | 16 |
| `--space-5` | `1.25rem` | 20 |
| `--space-6` | `1.5rem` | 24 |
| `--space-8` | `2rem` | 32 |
| `--space-10` | `2.5rem` | 40 |
| `--space-12` | `3rem` | 48 |
| `--space-16` | `4rem` | 64 |
| `--space-20` | `5rem` | 80 |
| `--space-24` | `6rem` | 96 |
| `--space-32` | `8rem` | 128 |

---

## 4. BORDER RADIUS

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `8px` | Small inputs, tags |
| `--radius-md` | `12px` | Buttons, small cards |
| `--radius-lg` | `16px` | Standard cards, containers |
| `--radius-xl` | `24px` | Large cards, sections |
| `--radius-2xl` | `32px` | Full-width rounded sections |
| `--radius-pill` | `9999px` | Pills, nav bar, tags, buttons |

**Rule:** No hard edges anywhere. Every visible rectangle has a radius.

---

## 5. SHADOWS

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(26,26,46,0.04), 0 1px 3px rgba(26,26,46,0.06)` | Subtle cards |
| `--shadow-md` | `0 4px 6px rgba(26,26,46,0.04), 0 2px 12px rgba(26,26,46,0.06)` | Default cards |
| `--shadow-lg` | `0 10px 24px rgba(26,26,46,0.06), 0 4px 16px rgba(26,26,46,0.04)` | Elevated cards |
| `--shadow-xl` | `0 20px 40px rgba(26,26,46,0.08), 0 8px 24px rgba(26,26,46,0.04)` | Modals, hero panels |
| `--shadow-hover` | `0 14px 32px rgba(26,26,46,0.10), 0 6px 20px rgba(26,26,46,0.06)` | Card hover lift |
| `--shadow-glass` | `0 8px 32px rgba(124,58,237,0.06), 0 2px 8px rgba(26,26,46,0.04)` | Glass elements |

---

## 6. LIQUID GLASS RECIPES

### Navigation Bar (`.glass-nav`)
- `background: rgba(255, 255, 255, 0.55)`
- `backdrop-filter: blur(32px) saturate(1.5)`
- `border: 1px solid rgba(255, 255, 255, 0.6)`
- `border-radius: var(--radius-pill)`
- `box-shadow: 0 4px 24px rgba(26,26,46,0.06), inset 0 1px 0 rgba(255,255,255,0.7)`
- On scroll: increase opacity to 0.7, blur to 40px, shrink padding

### Hero CTA Panel (`.glass-hero`)
- `background: rgba(255, 255, 255, 0.35)`
- `backdrop-filter: blur(28px) saturate(1.3)`
- `border: 1px solid rgba(255, 255, 255, 0.4)`
- `border-radius: var(--radius-xl)`
- Strongest shadow: `0 16px 48px rgba(26,26,46,0.08)`

### Feature / Pricing Card (`.glass-card`)
- `background: rgba(255, 255, 255, 0.4)`
- `backdrop-filter: blur(20px) saturate(1.3)`
- `border: 1px solid rgba(255, 255, 255, 0.45)`
- Hover: background increases to 0.55, lifts 2px

### Testimonial Panel (`.glass-testimonial`)
- `background: rgba(255, 255, 255, 0.25)`
- `backdrop-filter: blur(20px) saturate(1.2)`
- Used on colored (purple/green) section backgrounds

### Floating Elements (`.glass-floating`)
- `background: rgba(255, 255, 255, 0.65)`
- `backdrop-filter: blur(36px) saturate(1.5)`
- Strongest opacity and blur for modals, tooltips, dropdowns

### Purple-Tinted Glass (`.glass-purple`)
- `background: rgba(124, 58, 237, 0.06)`
- `backdrop-filter: blur(24px) saturate(1.4)`
- `border: 1px solid rgba(124, 58, 237, 0.1)`
- Used on cream sections for accent glass elements

### Fallback
Browsers without `backdrop-filter` support get `background: rgba(255, 255, 255, 0.9)`.

---

## 7. ANIMATION TOKENS

### Durations

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover color, focus ring |
| `--duration-normal` | `300ms` | Default transitions |
| `--duration-slow` | `500ms` | Section entrances |
| `--duration-slower` | `800ms` | Hero reveals, page transitions |
| `--duration-reveal` | `1000ms` | Text split reveals |

### Easing Curves

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default exit easing (elements settling) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetrical transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounce, illustration micro-animations |
| `--ease-smooth` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Subtle, refined movements |

### Stagger Delays

| Token | Value | Usage |
|---|---|---|
| `--stagger-delay` | `60ms` | Default card/text stagger |
| `--stagger-delay-fast` | `40ms` | Dense lists, quick sequences |

### GSAP ScrollTrigger Patterns

**Text reveal (word-by-word):**
- Split text into `<span>` per word
- `gsap.from(words, { y: 40, opacity: 0, stagger: 0.04, duration: 0.8, ease: 'power3.out' })`
- Trigger: `start: 'top 85%'`

**Card entrance (staggered):**
- `gsap.from(cards, { y: 60, opacity: 0, scale: 0.96, stagger: 0.06, duration: 0.6, ease: 'power2.out' })`
- Trigger: `start: 'top 80%'`

**Section overlap (paper stacking):**
- Each section has `position: relative; z-index: auto`
- `gsap.from(section, { y: 100, duration: 0.8, ease: 'power2.out' })`
- Previous section stays in place as next slides up over it

**Parallax gallery:**
- Even items: `gsap.to(el, { y: '-15%', scrollTrigger: { scrub: true } })`
- Odd items: `gsap.to(el, { y: '15%', scrollTrigger: { scrub: true } })`

**Counter animation:**
- `gsap.to(counter, { innerText: targetValue, snap: { innerText: 1 }, duration: 1.5, ease: 'power2.out' })`

---

## 8. LAYOUT TOKENS

| Token | Value | Usage |
|---|---|---|
| `--max-width` | `1280px` | Default content container |
| `--max-width-narrow` | `960px` | Centered content, forms |
| `--max-width-text` | `720px` | Blog body, long-form text |
| `--nav-height` | `64px` | Nav bar resting height |
| `--nav-height-scrolled` | `52px` | Nav bar scrolled/condensed |

### Z-Index Scale

| Token | Value | Usage |
|---|---|---|
| `--z-base` | `0` | Default |
| `--z-above` | `10` | Overlapping cards |
| `--z-nav` | `100` | Fixed navigation |
| `--z-modal` | `200` | Modals, overlays |
| `--z-toast` | `300` | Toast notifications |

---

## 9. COMPONENT PATTERNS

### Card (`.card`)
- Background: `var(--color-white)`
- Radius: `var(--radius-xl)` (24px)
- Padding: `var(--space-8)` (32px)
- Shadow: `var(--shadow-md)`
- Hover: `var(--shadow-hover)`, `translateY(-4px)`

### Section (`.section`)
- Padding: `var(--space-20)` top and bottom (80px)
- Rounded sections (`.section--rounded`): `var(--radius-2xl)` with `margin-inline: var(--space-8)`
- Color variants: `--cream`, `--white`, `--purple`, `--green`

### Button (`.btn`)
- Radius: `var(--radius-pill)`
- Padding: `12px 24px`
- Font: `var(--font-body)`, `var(--weight-semibold)`
- Primary: purple-500 bg, white text, hover lifts 1px
- Secondary: white bg, border, hover lifts 1px

### Navigation
- Pill-shaped glass bar, fixed `top: 16px`, centered with `left: 50%; transform: translateX(-50%)`
- CTA button (solid purple pill) inside the glass pill
- Condenses on scroll (padding shrinks, blur increases)

### Hero
- Min-height 90vh
- Glass panel overlay with headline, subheadline, two CTAs
- Background: showreel video (later) or gradient placeholder

---

## 10. SECTION COLOR FLOW

Homepage sections alternate through the palette:

1. **Hero** — cream background (video behind glass)
2. **Capabilities** — white (rounded section)
3. **Work gallery** — cream
4. **How it works** — purple section (rounded)
5. **Social proof** — cream with glass testimonial cards
6. **CTA** — green section (rounded)

Service/industry pages:
1. Cream hero
2. White content sections
3. Purple social proof
4. Cream FAQ
5. Green CTA

---

## 11. TEXTURE IMPLEMENTATION

### Marble/Stone Background
- Applied to 1-2 hero or portfolio sections only
- CSS: `background-image` with marble texture, `background-attachment: fixed` (parallax), `background-size: cover`
- Content scrolls over the fixed texture
- Subtle opacity (0.3-0.5) so text remains readable
- Do not combine with liquid glass on the same section

---

## 12. ILLUSTRATION STYLE GUIDE

- **Color:** Purple and green accent palette only
- **Stroke:** 2px, rounded caps and joins
- **Style:** Clean, geometric, minimal. Not childish, not corporate.
- **Animated elements:** Arrows (path draw), checkmarks (draw-on), icons (scale + fade), decorative dots/lines (stagger entrance)
- **Animation:** GSAP with `--ease-spring` for bounce, `--stagger-delay` for sequences
- **Placement:** Section transitions, "how it works" steps, CTA accents, highlighted text decorations
- **Do not use:** Stock illustrations, AI-generated art, clip art, emoji
