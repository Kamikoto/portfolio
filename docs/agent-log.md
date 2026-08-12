# Agent log

Handoff document for AI agents working on this portfolio codebase.

---

## 2026-06-17 — Fllex case study + hero duo layout + centered media slides

### Goal

Add the Fllex case-study page to the portfolio, refactor the hero for two-image covers, introduce a reusable centered-media carousel slide pattern, and document architecture decisions for future agents.

### Files modified

- `fllex.html` (created)
- `7tech.html`
- `styles.css`
- `script.js`
- `docs/agent-log.md` (created)

### Changes made

- Created `fllex.html` as a third case-study page (`body.page--fllex`) using the same HTML structure, classes, footer, TOC shell, carousels, and fullscreen figure pattern as `intelkon.html` and `7tech.html`.
- Mapped all Fllex content from `Fllex.md` into editorial sections, caption sections, five scroll galleries, one fullscreen image (`img09-fs.png`), and the shared footer.
- Asset paths use the existing folder `assets/Fllex/` (capital **F**). Do not rename to lowercase without updating HTML.
- Added hero layout modifier `case-hero__grid--duo` for two-cover pages (7TECH, Fllex). Intelkon keeps the default three-image grid unchanged.
- On `case-hero__grid--duo`: left column uses a single row (`grid-template-rows: 1fr`), phone panel uses `aspect-ratio: 1020 / 1248` on mobile, and on desktop (`min-width: 769px`) the phone panel stretches to `height: 100%` with `aspect-ratio: auto` so it matches the right panel height with no empty slot below.
- Applied `case-hero__grid--duo` to `7tech.html` (retrofit) and `fllex.html`.
- Introduced reusable centered-media carousel slide markup:
  - `case-figure__frame--centered` — flexbox centering inside a normal gallery slide frame (same `aspect-ratio: 3344 / 2088` as other slides)
  - `case-figure__frame--centered-lilac` — background `#B7A9FF` (gallery 01)
  - `case-figure__frame--centered-cloud` — background `#F8F8FC` (gallery 05)
  - `case-centered-media--square` — proportional square media at `width: 29.9043%` of slide (250/836 ratio, not hardcoded px)
  - `case-centered-media--card` — proportional card media at `width: 64.5933%` of slide (540/836 ratio) with `aspect-ratio: 540 / 370`, `border-radius: 10px`, `box-shadow: 0 1.5px 4.5px rgba(0, 0, 0, 0.08)`
- Fllex gallery 01 slide 1: `img04-cntnt.gif` inside lilac centered container (replaces `img04-scrl-01.png` as a visible slide).
- Fllex gallery 05 slide 3: `img18-cntnt.gif` inside cloud centered container (replaces `img18-scrl-05.png` as a visible slide).
- Extended `body.page--fllex` to all existing case-study CSS token blocks (same variables and breakpoints as Intelkon/7TECH).
- Extended PhotoSwipe selectors in `script.js` to include `.page--fllex .main`.
- No new carousel JS. Carousels still use `[data-carousel]` + existing `script.js` implementation.
- No CSS duplication of case-study tokens; page classes are comma-grouped.

### Reason

- Fllex is a new portfolio case study that must match existing pages in structure and behavior.
- Two-cover heroes (7TECH, Fllex) left empty space under the left panel because the hero grid still reserved a second row for Intelkon’s logo panel.
- Fllex design requires two gallery slides where a GIF sits centered inside a colored frame at a specific proportional scale — a pattern worth reusing via classes rather than page-specific CSS.

### Notes for the next agent

- **Case-study pages:** `intelkon.html` (`page--intelkon`), `7tech.html` (`page--7tech`), `fllex.html` (`page--fllex`). All share `styles.css` case-study block and `script.js` (header hide, TOC auto-build, carousels, PhotoSwipe).
- **Hero variants:** Default = three images (phone + logo left, desktop right). Duo = add `case-hero__grid--duo` on `.case-hero__grid` when only two cover images exist.
- **Centered media slides:** Use inside `.case-scroller__item` when a GIF should be centered in a colored frame instead of a full-bleed screenshot. Modifiers: `--square` (lilac bg) and `--card` (cloud bg + shadow). GIF loop/ping-pong is handled by the asset; no extra JS.
- **Gallery numbering:** `scrl-NN` in filenames groups carousel slides. `-cntnt` assets are centered-media GIFs paired with a gallery number.
- **Unused Fllex assets by design:** `img04-scrl-01.png` and `img18-scrl-05.png` exist on disk but are replaced in HTML by their `-cntnt.gif` centered slides.
- **TOC:** Auto-generated from `.case-section__title` text. Caption titles (`case-section__title--caption`) and empty titles are excluded. Script does not need per-page changes.
- **Index links:** `index.html` still has placeholder `#` hrefs for projects; wiring Fllex/7TECH/Intelkon links is a separate task if requested.
- **Adding another case study:** Copy nearest page HTML, set `body.page--*`, add the page class to comma-grouped selectors in `styles.css` and PhotoSwipe gallery selector in `script.js`, use `case-hero__grid--duo` or default hero grid as appropriate.

---

## 2026-06-17 — 7TECH case study (prior session)

### Goal

Create the 7TECH case-study page from markdown and assets, matching Intelkon implementation.

### Files modified

- `7tech.html` (created)
- `styles.css` (added `page--7tech` to case-study selectors)
- `script.js` (extended PhotoSwipe to `page--7tech`)

### Changes made

- Full case-study page with hero, TOC, editorial sections, four carousels, one single-image caption section, one fullscreen figure, footer.
- Asset paths: `assets/7tech/`.
- Extended shared case-study CSS/JS for `page--7tech` without duplicating component styles.

### Notes for the next agent

- 7TECH hero was initially two images without the duo modifier; fixed in the Fllex session by adding `case-hero__grid--duo`.

---

## 2026-06-27 — Homepage navigation verification + GitHub Pages publish guard

### Goal

Verify homepage project-card navigation, verify case-study back arrows, keep the development log out of the published GitHub Pages site, and prepare the complete website for commit/push.

### Files modified

- `index.html`
- `_config.yml` (created)
- `docs/agent-log.md`

### Changes made

- Wired the Fllex homepage card to `fllex.html`.
- Wired the 7TECH homepage card to `7tech.html`.
- Confirmed the Intelkon homepage card already points to `intelkon.html`.
- Confirmed all case-study back arrows point to `index.html`.
- Added `_config.yml` with `docs/agent-log.md` in the Jekyll `exclude` list so the file remains versioned but is not emitted into the GitHub Pages site.
- Per user instruction, skipped browser automation and performed static verification only.
- Static verification checked homepage card targets, case-page back arrows, local `href`/`src` asset paths, carousel control structure, fullscreen figure presence, PhotoSwipe selectors for all three case pages, and absence of public links to `docs/agent-log.md`.

### Reason

The homepage still had placeholder links for newly added case studies, while previous implementation notes explicitly left homepage wiring as a follow-up. The agent log is useful for future development but should not be part of the public site output or linked from any public page.

### Notes for the next agent

- Current live case-study routes are `intelkon.html`, `7tech.html`, and `fllex.html`.
- The Doyu and Getmobi homepage cards intentionally remain `href="#"` because no corresponding local pages exist yet.
- Do not remove `_config.yml` unless replacing it with another GitHub Pages build configuration that still excludes `docs/agent-log.md`.
- `docs/agent-log.md` is not linked from any page and should remain append-only.

---

## 2026-07-10 — Doyu case study + centered phone media patterns

### Goal

Create the Doyu case-study page as a native part of the existing portfolio, using `ref/doyu.md`, the Doyu visual references, and the established Intelkon/7TECH/Fllex implementation patterns.

### Files modified

- `doyu.html` (created)
- `index.html`
- `styles.css`
- `script.js`
- `docs/agent-log.md`

### Changes made

- Created `doyu.html` with the shared case-study shell: sticky case header, back arrow, hero, generated TOC placeholder, editorial sections, carousel sections, fullscreen figure, shared footer, and `script.js`.
- Wired the Doyu homepage project card to `doyu.html`.
- Added `body.page--doyu` to the shared case-study CSS selector groups so Doyu inherits the same typography, spacing, responsive grid, sticky header behavior, carousels, and reduced-motion rules as the existing case pages.
- Added Doyu to the shared PhotoSwipe page selector in `script.js`.
- Updated the lightbox image query to exclude `.case-hero__icon`, because the Doyu hero icon is inline heading content and should behave like a character, not a fullscreen gallery item.
- Added reusable hero title-panel classes:
  - `case-hero__panel--title` for the light right hero panel.
  - `case-hero__heading` for H1 text inside a hero panel.
  - `case-hero__icon` for the inline, baseline-aligned icon that scales with the H1.
- Added reusable centered phone-media classes:
  - `case-figure__frame--device-stage` for the proportional rounded cloud stage used by centered phone media.
  - `case-centered-media--video` for a single phone-shaped MP4 inside a centered cloud frame.
  - `case-centered-media--pair` for paired phone screens inside one slide.
  - `case-centered-media__screen` for each individual phone screen with shared radius and shadow.
- Used MP4s only inside centered media containers, with `autoplay`, `muted`, `loop`, and `playsinline`.
- Grouped paired files into single slides where `(2)` variants exist:
  - `img09-scrl-02.mp4` + `img09-scrl-02(2).mp4`
  - `img10-scrl-02.mp4` + `img10-scrl-02(2).mp4`
  - `img13.mp4` + `img13(2).png`
- Preserved fullscreen viewer behavior for Doyu images in hero panels and figure frames; videos are not turned into standalone videos or lightbox items.
- Used the actual available hero icon file `assets/Doyu/icon-img02-crv.png`; the prompt referred to `icon-img02-cvr`, but that file does not exist on disk.

### Reason

Doyu needed a new case-study page without redesigning the portfolio system. The new title-panel hero and phone-video/pair media patterns are specific to Doyu assets, but they are implemented as reusable extensions of the existing hero and centered-media components instead of page-specific hacks or duplicate JS.

### Notes for the next agent

- Current live case-study routes are `doyu.html`, `intelkon.html`, `7tech.html`, and `fllex.html`.
- Doyu uses `assets/Doyu/` with a capital **D**. Keep paths case-sensitive for GitHub Pages.
- The Doyu hero icon file is named `icon-img02-crv.png` on disk. Do not rename it to `cvr` without updating `doyu.html`.
- Keep paired `(2)` Doyu assets inside one `case-scroller__item`; they represent one slide, not two carousel slides.
- `case-centered-media--video`, `case-centered-media--pair`, and `case-centered-media__screen` are reusable for future centered phone-screen videos/images.
- The inline hero icon is intentionally excluded from PhotoSwipe in `script.js` via `img:not(.case-hero__icon)`.
- Verification performed this session: static link/asset scan, homepage card target checks, back-arrow checks, carousel control structure, Doyu video attributes, paired-screen grouping, TOC source headings, Doyu lightbox selector coverage, responsive CSS selector coverage, and local HTTP `200 OK` checks for `/`, `/doyu.html`, one MP4, and one parenthesized PNG asset.

---

## 2026-07-10 — Doyu hero glyph and iPhone screen-radius refinements

### Goal

Refine the Doyu hero composition to better match the provided reference and make embedded phone screens read more like iPhone displays.

### Files modified

- `doyu.html`
- `styles.css`
- `docs/agent-log.md`

### Changes made

- Swapped the Doyu hero inline icon from PNG to the available SVG asset: `assets/Doyu/icon-img02-crv.svg`.
- Removed the artificial `max-width` constraint from `.case-hero__heading` so the heading uses the available right-panel width and wraps closer to the reference composition.
- Tuned `.case-hero__panel--title` padding so the text block sits closer to the reference instead of feeling overly inset.
- Tuned `.case-hero__heading` type sizing/line-height for the title-panel composition while keeping it tied to the existing case-study typography scale.
- Adjusted `.case-hero__icon` sizing, spacing, and baseline alignment so the SVG behaves more like an embedded glyph in the sentence.
- Increased the visible radius on `.case-centered-media--video` and `.case-centered-media__screen` using proportional elliptical border-radius values, preserving the existing shadow and responsiveness.

### Reason

The first Doyu implementation treated the hero as an H1 with an inline image, but the visual reference reads as a single typographic composition inside the right hero panel. Embedded phone videos/screens also needed a more device-like radius rather than a generic small rounded rectangle.

### Notes for the next agent

- The prompt referred to `icon-img02-cvr.svg`, but the SVG currently present in `assets/Doyu/` is named `icon-img02-crv.svg`; `doyu.html` uses the file that exists on disk.
- The larger iPhone-like radius is applied to the embedded screens/videos themselves, not to the outer centered presentation container.
- Keep `.case-hero__icon` excluded from the PhotoSwipe wrapping in `script.js`; it is typographic content, not gallery media.

---

## 2026-07-10 — Doyu hero icon specificity fix

### Goal

Make the Doyu hero SVG behave like a typographic glyph embedded in the heading sentence and use the requested `icon-img02-cvr.svg` asset path.

### Files modified

- `doyu.html`
- `styles.css`
- `assets/Doyu/icon-img02-cvr.svg` (created)
- `docs/agent-log.md`

### Changes made

- Created `assets/Doyu/icon-img02-cvr.svg` from the existing Doyu SVG artwork so the requested filename resolves locally.
- Updated `doyu.html` to use `assets/Doyu/icon-img02-cvr.svg`.
- Replaced the low-specificity `.case-hero__icon` CSS rule with `.case-hero__heading .case-hero__icon`.
- The more specific selector intentionally overrides the generic `.case-hero__panel img { width: 100%; height: 100%; object-fit: cover; }` rule, which was making the icon behave like standalone hero media.
- Tuned the glyph to `0.72em` square with a small inline margin and baseline offset so it reads as roughly cap-height, wraps naturally, and affects layout like one character rather than a block or media element.

### Reason

The visual mismatch came from CSS specificity: the generic hero-panel image rule was stronger than the icon rule. The icon was inside a hero panel, so it inherited media sizing instead of typographic sizing.

### Notes for the next agent

- Keep the selector `.case-hero__heading .case-hero__icon` or another selector stronger than `.case-hero__panel img`; otherwise the hero icon will regress to panel-media sizing.
- The icon must remain inline inside the H1, not a flex child, block, absolutely positioned layer, or separate panel element.

---

## 2026-07-10 — Doyu hero responsive typography

### Goal

Make the Doyu hero heading preserve the reference-like composition across smaller breakpoints without awkward wrapping, clipping, or overflow.

### Files modified

- `styles.css`
- `docs/agent-log.md`

### Changes made

- Made `.case-hero__panel--title` an inline-size container so the Doyu heading can scale from the available right-panel width.
- Replaced the previous desktop-biased heading size with fluid typography:
  - viewport fallback: `clamp(24px, 4vw, 64px)`
  - container-query sizing: `clamp(24px, 6.45cqw, 64px)`
- Made heading letter-spacing fluid with `clamp(-1.62px, -0.025em, -0.72px)` so tight desktop tracking does not become too aggressive on small screens.
- Adjusted title-panel padding with responsive clamps so the heading has enough room on mobile while retaining the reference composition on desktop.
- Kept the SVG icon sized in `em`, so it scales together with the text.

### Reason

The desktop hero was close, but the heading’s previous minimum size made smaller panels feel cramped. Scaling from the panel width preserves the text/icon relationship and keeps the sentence inside the right panel more reliably across breakpoints.

### Notes for the next agent

- The Doyu hero heading now depends on container query units (`cqw`) with a viewport fallback. Keep `container-type: inline-size` on `.case-hero__panel--title`.
- The icon remains typographic because its size is defined in `em`; do not replace it with fixed pixel sizing.

---

## 2026-07-10 — Doyu carousel caption title

### Goal

Add the missing gray section title next to the Doyu carousel containing `img05-scrl-01`.

### Files modified

- `doyu.html`
- `docs/agent-log.md`

### Changes made

- Replaced the empty left-side section title before the `img05-scrl-01` carousel with `Онбординг Tg Mini app, Quick guide,  добавление заметки`.
- Used the existing `case-section__title case-section__title--caption` classes so typography, gray color, spacing, TOC exclusion, and layout match other media caption sections.

### Reason

The carousel needed the same gray left caption treatment as other case-study image/media sections, without adding a new component or style variation.

### Notes for the next agent

- Caption titles should continue using `case-section__title--caption`; the TOC generator intentionally excludes them.

---

## 2026-07-10 — Doyu hero horizontal overflow fix + publish

### Goal

Remove the small horizontal overflow in the Doyu hero without hiding it with page-level `overflow-x: hidden`, then verify, commit, and push the latest website version.

### Files modified

- `styles.css`
- `docs/agent-log.md`

### Changes made

- Removed `overflow: auto` from `.case-hero__grid` so the hero grid itself is not a horizontal scroll container.
- Changed the mobile hero grid track from `1fr` to `minmax(0, 1fr)`.
- Changed the desktop hero grid tracks from `var(--case-col-left) var(--case-col-right)` to `minmax(0, var(--case-col-left)) minmax(0, var(--case-col-right))`.
- Added `min-width: 0` to `.case-hero__grid`, `.case-hero__left`, `.case-hero__panel`, and `.case-hero__heading` so grid/flex children can shrink within the available viewport instead of honoring intrinsic content width.
- Added a desktop rule for `.case-hero__grid--duo .case-hero__panel--title` matching the existing duo phone-panel behavior: `aspect-ratio: auto`, `height: 100%`, and `min-height: 100%`.

### Reason

The remaining desktop overflow was not caused by the inline SVG. Chrome measurements showed the Doyu title panel kept its own `aspect-ratio` inside the two-column duo grid. The row height was set by the left hero image, and the right panel widened itself a few pixels beyond its assigned grid track to preserve its aspect ratio. Letting the title panel stretch to the grid cell height removes the overflow at the source.

### Notes for the next agent

- Do not restore `overflow: auto` on `.case-hero__grid`; carousels handle their own horizontal scrolling via `.case-scroller`.
- Keep the desktop `.case-hero__grid--duo .case-hero__panel--title` rule paired with the phone-panel duo rule. Both prevent aspect-ratio-driven overflow in two-panel heroes.
- Final Chrome layout verification checked viewport widths `320`, `375`, `390`, `430`, `768`, `769`, `1024`, `1440`, and `1920`; all reported `documentDelta=0`, `gridOverflow=0`, `titleOverflow=0`, and `headingOverflow=0`.

---

## 2026-07-14 — Stable TOC hover + non-clickable covers/fullscreen images

### Goal

Remove TOC hover layout jumps while preserving the visual weight effect, and prevent cover/fullscreen images from behaving like gallery/lightbox images.

### Files modified

- `styles.css`
- `script.js`
- `docs/agent-log.md`

### Changes made

- Changed `.case-toc__link:hover` so it no longer changes real font metrics. It keeps the normal `font-weight`, `font-variation-settings`, and `letter-spacing`, then adds a subtle `text-shadow: 0.018em 0 0 currentColor` for a metrics-stable visual bolding effect.
- Added `text-shadow` to the TOC link transition list and reset it in the reduced-motion hover override.
- Updated the PhotoSwipe wrapping selector in `script.js` from hero + all figure-frame images to only:
  - `.case-figure:not(.case-figure--fs) .case-figure__frame:not(.case-figure__frame--wide) img`
- As a result, hero cover images and fullscreen/wide images are not wrapped in `.case-lightbox__item`, do not get the zoom cursor, and do not open PhotoSwipe.
- Gallery and inline inspection images remain wrapped and keep the existing fullscreen viewer behavior.

### Reason

Increasing TOC font weight changes text metrics and can alter line wrapping. A single negative letter-spacing value could not preserve wrapping across every page and mobile width: values that fixed one long title could unwrap another. The final solution keeps layout metrics unchanged and applies the hover emphasis as a visual-only weight effect.

Cover and fullscreen images are presentation media, not inspection-gallery media, so they should not be clickable or zoomable.

### Notes for the next agent

- Do not reintroduce real `font-weight` changes on `.case-toc__link:hover` unless you also add a robust layout-stability strategy for all case pages and mobile widths.
- Cover images are `.case-hero__panel img`; fullscreen images are `.case-figure--fs` / `.case-figure__frame--wide`. These should stay outside PhotoSwipe wrapping.
- Final browser verification covered `doyu.html`, `intelkon.html`, `7tech.html`, and `fllex.html` at widths `320`, `375`, `390`, `430`, `768`, `1024`, and `1440`.
- Verification confirmed `tocProblems=0`, `heroWrapped=0`, `fsWrapped=0`, gallery wrapped counts equal gallery image counts, cover cursor is `auto`, and gallery cursor is `zoom-in`.
