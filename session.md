# SAYA LABS — Luxury Redesign Session

> A living document. Update phase status as work progresses. If the conversation context expires, the next session reads this top-to-bottom to know exactly where we are.

## Goal

Transform the existing SAYA LABS agency site (samurai/Japanese theme, dark, Next.js 16 + React 19 + GSAP + Three.js + Lenis) into a **$1M-tier luxury digital studio website**. Reference quality: GSAP showcase sites (awwwards / FWA), think Studio Bouroullec, Active Theory, Cuberto, Dennis Snellenberg, Locomotive.

## Non-negotiables the user gave

- **Designer-feel**: heavy motion, intentional spacing, dramatic typography
- **GSAP-inspired** animations everywhere — split text, scroll-pinned sections, parallax, magnetic interactions
- **Luxurious & spacious** — generous whitespace, oversized typography, editorial layouts
- **Images & visual interest** retained throughout
- **Services covered**: design, development, SEO

## Tech baseline (already in place — do not reinstall)

- Next.js 16.2.6 (App Router), React 19.2.4, TypeScript
- GSAP 3.15 + ScrollTrigger + @gsap/react
- Lenis 1.3 smooth scroll (LenisProvider mounted on page)
- @react-three/fiber + drei + three (SamuraiScene with optimized samurai GLB)
- Tailwind v4
- Fonts: Bebas Neue, Inter, Playfair Display, Noto Serif JP, Road Rage (brush), localFont

## Design system decisions

- **Palette**: pure black `#0a0a0a` base, crimson `#C41E3A` accent, amber/gold `#D4A574` warm light, ivory `#E5E1D8` body, plus deeper `#7A1020` for hover crimson. Keep dark + cinematic.
- **Typography scale** (refined for luxury):
  - Display jumbo: `clamp(5rem, 12vw, 14rem)` — section openers
  - Display: `clamp(4rem, 10vw, 9rem)` — hero
  - Headline: `clamp(2.5rem, 5vw, 4.5rem)` — section titles
  - Lede: `clamp(1.1rem, 1.6vw, 1.5rem)` — premium subtitle
  - Body: `1rem / 1.9` line-height (more generous than 1.7)
  - Meta: `0.7rem / letter-spacing 4px` uppercase
- **Spacing**: section padding bumped to `clamp(120px, 14vw, 220px)`. Container max stays `1400px`. More breathing room everywhere.
- **Easing**: `cubic-bezier(0.7, 0, 0.2, 1)` — luxurious heavy-out, longer than default
- **Cursor**: hidden by default, replaced with a custom cursor dot + ring that scales/morphs on interactive elements

## Phases

### Phase 1 — Motion Foundation `STATUS: pending`
Reusable primitives used by every section.
- [ ] `app/components/CustomCursor.tsx` — fixed dot + ring, GSAP-driven, magnetic to `[data-cursor="magnetic"]` elements, scales on `[data-cursor="link"]`, hides on touch devices
- [ ] `app/components/SplitText.tsx` — wraps children in per-character/word spans for stagger reveal via GSAP
- [ ] `app/components/MagneticButton.tsx` — buttons subtly track cursor on hover with pixel offset
- [ ] `app/components/RevealOnScroll.tsx` — generic wrapper using ScrollTrigger to fade+rise children
- [ ] `app/components/AnimatedNumber.tsx` — counts from 0 to target when scrolled into view
- [ ] `app/components/Marquee.tsx` — infinite horizontal scrolling text strip with GSAP loop
- [ ] `app/components/ScrollProgress.tsx` — top-of-viewport thin crimson bar tracking page progress
- [ ] `app/components/Preloader.tsx` — cinematic page-load reveal (brand mark + line draw)

### Phase 2 — Design tokens elevation `STATUS: pending`
- [ ] Update `globals.css` `:root` with new spacing/typography vars
- [ ] Add ivory color, refined easing curves
- [ ] Cursor styles (`* { cursor: none }` on desktop with fallback)
- [ ] New keyframes for marquee, draw, charReveal, maskReveal

### Phase 3 — Hero rebuild `STATUS: pending`
- [ ] Wrap SAYA / LABS in SplitText, stagger reveal on mount
- [ ] Parallax background layers (translate Y on scroll)
- [ ] Vertical kanji marquee on side
- [ ] Magnetic CTAs
- [ ] Subtitle character reveal
- [ ] Refined scroll indicator (line draws downward)

### Phase 4 — Marquee strips `STATUS: pending`
- [ ] Insert `<Marquee>` strips between Hero→AboutSaya, AboutSaya→Services, Services→Portfolio
- [ ] Mix kanji + English uppercase words ("DESIGN" "DEVELOPMENT" "SEO" "創造" "革新" "鍛造")

### Phase 5 — Services reshape `STATUS: pending`
- [ ] Replace 3-col grid with alternating left/right editorial cards
- [ ] Each card: huge number, kanji, title, lede, list of capabilities, hover image preview that follows cursor
- [ ] Sticky pin while scrolling through the section
- [ ] Reveal on scroll

### Phase 6 — Portfolio rebuild `STATUS: pending`
- [ ] Featured project full-width hero image with reveal mask
- [ ] Below: 2-col asymmetric grid (different aspect ratios)
- [ ] Image scale + clip-path reveal on scroll
- [ ] Hover: title slides up, crimson tint overlays

### Phase 7 — Process redesign `STATUS: pending`
- [ ] Vertical timeline center line
- [ ] SVG path that draws as user scrolls (stroke-dashoffset)
- [ ] 4 sticky stages, each with kanji + animated number + title + body
- [ ] Alternating left/right offset

### Phase 8 — Testimonials stack `STATUS: pending`
- [ ] Pin section, cards stack one over another as user scrolls
- [ ] Active card sharp, behind cards blurred/dimmed
- [ ] AnimatedCounter for trust stats above grid

### Phase 9 — Contact + Footer overhaul `STATUS: pending`
- [ ] Massive "LET'S BUILD" split-text headline above form
- [ ] Form inputs: underline-only style with animated focus line
- [ ] Footer: huge "SAYA LABS" wordmark, social cluster, copyright

### Phase 10 — Final polish `STATUS: pending`
- [ ] Wire `<CustomCursor />`, `<ScrollProgress />`, `<Preloader />` into `layout.tsx` (or `page.tsx`)
- [ ] Touch device detection — disable cursor
- [ ] `prefers-reduced-motion` respected — disable parallax + autoplay marquees
- [ ] Test build (`npm run build`) — no TS errors, no SSR issues
- [ ] Visually verify in dev server

## File map (planned)

```
app/
  layout.tsx                      [modify — fonts, cursor, scroll progress]
  page.tsx                        [modify — section order, marquee insertions]
  globals.css                     [modify — new tokens, keyframes, cursor]
  components/
    CustomCursor.tsx              [NEW]
    SplitText.tsx                 [NEW]
    MagneticButton.tsx            [NEW]
    RevealOnScroll.tsx            [NEW]
    AnimatedNumber.tsx            [NEW]
    Marquee.tsx                   [NEW]
    ScrollProgress.tsx            [NEW]
    Preloader.tsx                 [NEW]
    Hero.tsx                      [rewrite]
    AboutSaya.tsx                 [enhance — text reveals]
    Services.tsx                  [rewrite — editorial sticky cards]
    About.tsx                     [enhance — reveals, parallax image]
    Portfolio.tsx                 [rewrite — featured + asymmetric grid]
    Process.tsx                   [rewrite — vertical SVG timeline]
    Testimonials.tsx              [rewrite — stacking cards]
    Contact.tsx                   [enhance — massive headline, underline form]
    Footer.tsx                    [enhance — wordmark]
    Navbar.tsx                    [enhance — hide on scroll-down, show on scroll-up]
    SamuraiScene.tsx              [keep — already optimized per 3d_optimization_skill.md]
    ModelLoader.tsx               [keep]
    LenisProvider.tsx             [tune easing]
```

## Coding conventions for this work

- All new client components start with `"use client"`
- GSAP plugins registered once at module top with `gsap.registerPlugin(ScrollTrigger)`
- Use `useGSAP` from `@gsap/react` for safer cleanup
- Refs over IDs where possible
- Tailwind for layout; CSS modules / globals.css for animations + design system
- Respect `prefers-reduced-motion` in motion primitives
- Disable custom cursor + heavy parallax on touch devices

## Progress log

- 2026-06-16 — Session started. Audited existing components. Created task list. Wrote this file. Beginning Phase 1.
