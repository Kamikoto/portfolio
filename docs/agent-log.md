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
