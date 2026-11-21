/**
 * @license MIT
 * ============================================================================
 * eleventy.config.mjs — Eleventy v3 (ESM) Static Site Generator Configuration
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL INTRO TO ELEVENTY v3):
 *   What is Eleventy (`11ty`)?
 *     Eleventy is an "HTML-first" Static Site Generator (SSG) widely favored by
 *     public-sector, university, and accessibility-focused engineering teams.
 *     Unlike Single-Page Application (SPA) frameworks that turn every paragraph
 *     of text into JavaScript code, Eleventy reads clean templates (`.njk`
 *     Nunjucks files in `src/site/`) plus structured data (`src/site/_data/`),
 *     and writes pure, zero-overhead `.html` files into `dist/` at build time!
 *
 *   How does Eleventy pair with Google's Lit 3 on this site?
 *     We use the **Islands Architecture**:
 *       1. Eleventy renders 100% of page landmarks, headings, imprint guides,
 *          book cards, OpenGraph metadata, and `sitemap.xml` as fast static HTML.
 *       2. Wherever a page needs rich stateful UI—like our live interactive
 *          Story Crossroads reader (`<crossroads-live-sandbox>`) or our 2-Way vs.
 *          3-Way medallion inspector (`<crossroads-seal-explorer>`)—we drop a
 *          native W3C Custom Element tag right into the HTML, which `esbuild`
 *          bundles from TypeScript + Lit 3 into `dist/assets/crossroads-islands.js`!
 *
 *   Inputs & Outputs:
 *     - Input templates & data : `src/site/` (`_includes/`, `_data/`, pages)
 *     - Compiled static output : `dist/` (deployed to `/var/www/crossroads.raggiesoft.com`)
 * ============================================================================
 */

export default function configureEleventy(eleventyConfig) {
  // 1. PASSTHROUGH FILE COPY:
  // Tell Eleventy to copy `src/site/assets/crossroads.css` straight into
  // `dist/assets/crossroads.css` without running a template engine over it.
  eleventyConfig.addPassthroughCopy({
    'src/site/assets': 'assets'
  });

  // 2. CUSTOM NUNJUCKS TEMPLATE FILTERS:
  // In Nunjucks (`{{ value | filterName }}`), filters format values cleanly inside templates.

  // `isoDate`: Formats a JS `Date` (or `'now'`) as `YYYY-MM-DD` for `<lastmod>` in `sitemap.xml`.
  eleventyConfig.addFilter('isoDate', (value) => {
    const d = value === 'now' || !value ? new Date() : new Date(value);
    return d.toISOString().slice(0, 10);
  });

  // `jsonStringify`: Serializes a JavaScript object into compact, comment-free JSON
  // for `<script type="application/ld+json">` structured data in `<head>`.
  eleventyConfig.addFilter('jsonStringify', (value) => {
    return JSON.stringify(value);
  });

  // 3. DIRECTORY & TEMPLATE ENGINE SETTINGS:
  // Return Eleventy's directory map so `eleventy` knows where source templates live
  // (`src/site`) and where compiled production files belong (`dist`).
  return {
    dir: {
      input: 'src/site',
      includes: '_includes',
      data: '_data',
      output: 'dist'
    },
    templateFormats: ['njk', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}
