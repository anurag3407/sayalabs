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

### Phase 1 — Motion Foundation `STATUS: ✅ complete`
- [x] `CustomCursor.tsx` — dot + ring, magnetic targets via `data-cursor`
- [x] `SplitText.tsx` — char/word mask + GSAP stagger
- [x] `MagneticButton.tsx` — cursor-tracking inner span
- [x] `RevealOnScroll.tsx` — ScrollTrigger fade-up wrapper
- [x] `AnimatedNumber.tsx` — counter
- [x] `Marquee.tsx` + `MarqueeStrip.tsx` (variants: primary / outline / kanji / services)
- [x] `ScrollProgress.tsx` — top crimson bar
- [x] `Preloader.tsx` — cinematic page-load reveal with 5s safety fallback

### Phase 2 — Design tokens elevation `STATUS: ✅ complete`
- [x] New tokens (ivory, ink, ease curves, type scale, spacing)
- [x] Cursor styles + .has-custom-cursor opt-in
- [x] All new component CSS appended in a Luxury V2 block
- [x] prefers-reduced-motion accommodations

### Phase 3 — Hero rebuild `STATUS: ✅ complete`
- [x] SAYA / LABS split-char reveal on mount
- [x] Background parallax via ScrollTrigger
- [x] Vertical kanji sides float out on scroll
- [x] Magnetic CTAs
- [x] Subtitle word reveal
- [x] Meta strip at bottom + refined scroll indicator

### Phase 4 — Marquee strips `STATUS: ✅ complete`
- [x] Primary marquee after AboutSaya
- [x] Services word marquee after Services (reverse direction)
- [x] Kanji marquee after About
- [x] Outline marquee after Portfolio (reverse direction)
- [x] Footer in-context marquee

### Phase 5 — Services reshape `STATUS: ✅ complete`
- [x] 6 disciplines as alternating editorial rows
- [x] Huge index numbers with hover crimson outline
- [x] Kanji + label above number
- [x] Capability list with crimson markers
- [x] Word-level title reveals + list staggers

### Phase 6 — Portfolio rebuild `STATUS: ✅ complete`
- [x] Featured project hero image with scale-in reveal
- [x] 2-col asymmetric grid with mixed aspect ratios
- [x] Clip-path mask reveals on scroll
- [x] data-cursor="text" → VIEW label cursor

### Phase 7 — Process redesign `STATUS: ✅ complete`
- [x] Continuous center spine across all steps
- [x] Animated draw line (scrub-driven scaleY)
- [x] 4 markers with hover fill
- [x] Alternating left/right content with x-slide reveal
- [x] Huge number with -webkit-text-stroke outline + filled variants

### Phase 8 — Testimonials stack `STATUS: ✅ complete`
- [x] Pin section, cards stack one over another (ScrollTrigger pin + scrub)
- [x] Dot pagination + index counter
- [x] Active card crisp, behind cards fade/scale

### Phase 9 — Contact + Footer overhaul `STATUS: ✅ complete`
- [x] "LET'S BUILD SOMETHING EXTRAORDINARY." massive headline with stroke + crimson accent
- [x] Underline-only form with crimson focus border
- [x] Magnetic submit button
- [x] Footer wordmark (SAYA + outlined LABS)
- [x] In-footer marquee strip
- [x] Three-column navigation

### Phase 10 — Final polish `STATUS: ✅ complete`
- [x] CustomCursor, ScrollProgress, Preloader wired in page.tsx
- [x] Touch device detection in CustomCursor + MagneticButton
- [x] prefers-reduced-motion global rule
- [x] Preloader body scroll-lock via `html.preloading`
- [x] Navbar hides on scroll-down / shows on scroll-up
- [x] `npm run build` passes with TypeScript strict
- [x] SSR output verified — all new section classes render

## Files created

```
app/components/
  CustomCursor.tsx        NEW
  SplitText.tsx           NEW
  MagneticButton.tsx      NEW
  RevealOnScroll.tsx      NEW
  AnimatedNumber.tsx      NEW
  Marquee.tsx             NEW
  MarqueeStrip.tsx        NEW
  ScrollProgress.tsx      NEW
  Preloader.tsx           NEW
```

## Files modified

```
app/page.tsx              - new section order + marquees + preloader/cursor/scrollprogress
app/globals.css           - new tokens, ~700 lines of new system styles appended
app/components/Hero.tsx          - split-text reveals, parallax, magnetic CTAs
app/components/AboutSaya.tsx     - animated stat counters, reveal wrappers
app/components/Services.tsx      - editorial alternating-row redesign
app/components/About.tsx         - reveals + animated counters
app/components/Portfolio.tsx     - featured hero + asymmetric grid + clip reveals
app/components/Process.tsx       - vertical timeline with drawn spine
app/components/Testimonials.tsx  - stacking pinned cards
app/components/Contact.tsx       - massive headline + underline form + magnetic submit
app/components/Footer.tsx        - wordmark + marquee + 3-col grid
app/components/Navbar.tsx        - hide on scroll-down, data-cursor attrs
```

## Things to verify in a future session

- Test in a browser at multiple viewports (1440, 1024, 768, 375). Confirm sticky/pin behavior of testimonials feels right.
- The samurai 3D model still renders correctly given the marquee/strips inserted between sections — the existing SamuraiScene `ScrollTrigger` references `home` and `aboutsaya` IDs, which still exist in the same positions.
- Tweak preloader timing if it feels too long (currently 1.4s min).
- Real images for portfolio — currently reusing existing 4 stock images for 4 projects (one duplicates the bg). Replace when client provides assets.
- Real testimonials, real client logos, real case-study photography.
- Maybe add a "selected clients" logo strip before testimonials for added social proof.

## Phase 12 — Samurai storytelling + Funnel + Community `STATUS: ✅ complete (visual tuning pending)`

Goal: turn the Hero + AboutSaya pair into a 4-beat **samurai storytelling scroll** with a
cinematic scroll *camera*; add a **funnel** page + landing teaser + **community** card;
mesh-gradient / grid-dot surface system; real performance pass.

- **`HeroStory.tsx`** (NEW) — replaces `Hero` + `AboutSaya`. Four `.saga` beats:
  `#home` (intro) · `#saga-vow` (left) · `#saga-edge` (right) · `#saga-craft` (center,
  folds in the old AboutSaya brush wordmark + stats + socials). Backgrounds are
  agy-generated `saga_1..4.png`. `Hero.tsx` / `AboutSaya.tsx` are now orphaned (unused).
- **`SamuraiScene.tsx`** (REWRITE) — model stays near origin; the **camera** moves through
  4 keyframes (`STOPS_DESKTOP/MOBILE`: position + lookAt + fov + model yaw) interpolated
  across `#home`→`#saga-craft` with easing + damping (dolly / crane / orbit). `BASE_ROT_Y`
  = 3π/2 (front-facing, matches the prior working pose). **Perf gate**: `frameloop`
  toggles `always`/`never` + container opacity, active only while the saga zone is on screen.
- **`KatanaScene.tsx`** — untouched animation; only added the same frameloop perf gate
  (active within forge→path). It was the "perfect" reference and is preserved.
- **CSS V4 block** in `globals.css` — `.mesh-gradient` (+ crimson/gold/indigo/emerald,
  `--animated`), `.bg-dot-grid`, `.bg-line-grid`, `.bg-field-mask` (Claude-style fields),
  full `.saga` system, `.engage` + `.tier-card`, `.community`, and the `/work-with-us`
  `.funnel-*` / `.tier-row` styles.
- **`/work-with-us`** (NEW route) — funnel page: Enterprise (城) · Freelance/Sprint (刃) ·
  Catalyst partnership (種) · Subscription (守), as mesh-gradient tier rows + CTA. Shares
  the Lenis/Navbar/Cursor/Footer shell.
- **Landing additions** — `Engage.tsx` (4 tier teaser cards → `/work-with-us`) after
  Portfolio; `Community.tsx` (open-source "Saya Commons" mesh card) after Process.
- **Navbar** now `usePathname`-aware (in-page `#id` on `/`, `/#id` elsewhere) + "Work With
  Us" link; **Footer** links made absolute + Work-With-Us/Community added.
- **Layering note**: `.saga` deliberately has NO `z-index` so its bg (z0) sits *below* the
  fixed samurai canvas (z5) and `.saga-inner` (z6) sits *above* it — model reads behind copy.

**Verified**: `npm run build` green (TS clean, `/` + `/work-with-us` prerender). SSR for both
routes returns 200 with all new sections. **Not yet verified (needs a browser)**: the live
WebGL framing/scale and camera arc feel — tune `STOPS_*` and `MODEL_NORMALIZED_SIZE` to taste.

## Progress log

- 2026-06-16 — Session started. Audited existing components. Created task list. Wrote this file.
- 2026-06-16 — Phases 1–11 complete. Build passes. SSR output verified.
- 2026-06-19 — Phase 12: samurai 4-beat storytelling + cinematic camera, funnel page
  `/work-with-us` + landing teaser + community, mesh/grid surface system, canvas perf
  gating. Build green; backgrounds generated with the agy CLI.
- 2026-06-19 — Phase 12b (feedback pass):
  • **Lenis ↔ ScrollTrigger now synced** in `LenisProvider` (gsap.ticker drives lenis +
    `lenis.on('scroll', ScrollTrigger.update)` + `lagSmoothing(0)`) — fixes the scrub
    "shaking".
  • Samurai: `MODEL_NORMALIZED_SIZE` 3.4→5, strong multi-light rig, beat 1 frames the
    figure on the RIGHT, much bigger camera orbit (px ±2.7) + model yaw swings for a real
    cinematic feel. Removed the wrong 5th "Sheath" beat.
  • Samurai now **rests stuck on the Forge `#forge-stamp` card** (right column of "The
    Origin"): master trigger `#home → #forge top 30%`, last 20% blends saga→rest and the
    model tracks the card's live rect (screen→world), then sticks. Canvas raised to z8
    (above story sections z7) and `.saga-inner` to z9 so copy stays above the figure.
    Tuning knobs: `REST_DESKTOP.{pz,fov,scale,yOff}` and `STOPS_DESKTOP`.
  • Projects moved off the landing into a dedicated **`/projects`** page (editorial grid,
    4 new agy images `proj_1..4` + existing portfolio art). Nav/Footer/hero "Work" →
    `/projects`. `Portfolio.tsx` now orphaned.
- 2026-06-19 — Phase 12c (feedback pass 2):
  • Resting samurai now **rigid-locks to the Forge card like a flat 2D image**: once
    `restBlend >= 0.999`, `SamuraiScene` sets camera/position/scale/rotation directly from
    the card rect each frame (no damping/drift) instead of lerping.
  • New full **`/community`** page (The Saya Commons): hero + 3 values + 6 open-source repo
    cards (origami/tsuba/sumi/hashira/katana/kintsugi — placeholder content & GitHub links
    to swap for real ones) + CTA. Nav/Footer "Community" and the landing community card all
    point to `/community`. Routes: `/`, `/projects`, `/work-with-us`, `/community`.

