/**
 * @license MIT
 * ============================================================================
 * src/islands/index.ts — Client Entrypoint Bundled by esbuild for Lit 3 Islands
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW:
 *   Importing our two Lit 3 Custom Element modules registers
 *   `<crossroads-live-sandbox>` and `<crossroads-seal-explorer>` with the
 *   browser's `customElements` registry, and `initReadingLightControl()` wires
 *   our progressive-enhancement comfort reading-light button!
 * ============================================================================
 */

import './crossroads-live-sandbox.js';
import './crossroads-seal-explorer.js';
import { initReadingLightControl } from './theme-toggle.js';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReadingLightControl);
} else {
  initReadingLightControl();
}
