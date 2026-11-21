# RaggieSoft Story Crossroads (`https://crossroads.raggiesoft.com`)

Official imprint home and interactive branching-narrative showcase for **RaggieSoft Story Crossroads**—RaggieSoft's independent interactive-fiction imprint where every Crossroads offers coequal, character-driven literary routes.

## Architecture Overview ("HTML-First Islands")

- **Static Site Generator**: **Eleventy v3 (`@11ty/eleventy` ESM)** compiles multi-page semantic HTML5 templates (`src/site/*.njk`), structured `_data/` catalogs, `sitemap.xml`, `robots.txt`, and `404.html` into `/dist`.
- **Interactive W3C Custom Elements**: **Lit 3 (`LitElement`) + TypeScript + `esbuild`** powers self-contained interactive Web Component islands (`<crossroads-live-sandbox>` and `<crossroads-seal-explorer>`) with open Shadow DOM, inherited CSS custom property tokens, WAI-ARIA `aria-live` announcements, roving keyboard focus, and Windows High-Contrast (`forced-colors`) support.
- **Accessibility & Color Scheme**: WCAG 2.1 AA / AAA contrast in both Sunlit Parchment (`light`) and Midnight Compass (`dark`) modes (`#0F4C5C` Deep Compass Teal & `#E3B27C` Warm Brass).

## Build & Verify

```bash
npm install
npm run build
```

## Licensing

- **Source Code**: MIT License (`LICENSE`).
- **Creative Narrative Content & Artwork**: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) (commercial licensing via `https://raggiesoft.com/raggiesoft-media/licensing/commercial`).
