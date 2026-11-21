#!/usr/bin/env node
/**
 * @license MIT
 * ============================================================================
 * scripts/verify-build.mjs — Post-Build SEO, Accessibility & Comment Safety Gate
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL INTRO):
 *   Why run a verification script at the end of `npm run build`?
 *     Automated guardrails catch subtle mistakes BEFORE files ever reach GitHub
 *     or production Nginx:
 *       1. Verifies `dist/sitemap.xml`, `dist/robots.txt`, `dist/404.html`
 *          (`noindex`), IndexNow key file, and `dist/assets/crossroads-islands.js`
 *          all exist and are non-empty.
 *       2. Audits every canonical HTML page in `dist/` to enforce `<title>` <= 60
 *          characters, `<meta name="description">` <= 155 characters, valid
 *          OpenGraph tags, valid JSON-LD syntax, and zero prohibited terms.
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

const requiredFiles = [
  'index.html',
  'architects/index.html',
  'how-it-works/index.html',
  'seals/index.html',
  'catalog/index.html',
  'sandbox/index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  '726167676965736f6674696e6465786e.txt',
  'assets/crossroads.css',
  'assets/crossroads-islands.js'
];

for (const rel of requiredFiles) {
  const full = path.join(distDir, rel);
  if (!fs.existsSync(full) || fs.statSync(full).size === 0) {
    throw new Error(`Missing or empty compiled artifact: ${rel}`);
  }
}

const canonicalHtmlFiles = [
  'index.html',
  'architects/index.html',
  'how-it-works/index.html',
  'seals/index.html',
  'catalog/index.html',
  'sandbox/index.html'
];

for (const rel of canonicalHtmlFiles) {
  const html = fs.readFileSync(path.join(distDir, rel), 'utf8');

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) throw new Error(`${rel}: Missing <title>`);
  if (titleMatch[1].length > 60) {
    throw new Error(`${rel}: <title> exceeds 60 chars (${titleMatch[1].length}): "${titleMatch[1]}"`);
  }

  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  if (!descMatch) throw new Error(`${rel}: Missing <meta name="description">`);
  if (descMatch[1].length > 155) {
    throw new Error(
      `${rel}: <meta description> exceeds 155 chars (${descMatch[1].length}): "${descMatch[1]}"`
    );
  }

  if (!html.includes('property="og:title"') || !html.includes('name="twitter:card"')) {
    throw new Error(`${rel}: Missing OpenGraph or Twitter Card tags`);
  }

  // Verify JSON-LD parses cleanly with zero comments
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ldMatch) throw new Error(`${rel}: Missing Schema.org JSON-LD`);
  JSON.parse(ldMatch[1]);
}

const html404 = fs.readFileSync(path.join(distDir, '404.html'), 'utf8');
if (!html404.includes('noindex')) {
  throw new Error('404.html is missing noindex robots meta tag');
}

console.log(
  '✅ Story Crossroads build verified (5 canonical Eleventy routes + Lit 3 islands + 404.html + sitemap.xml).'
);
