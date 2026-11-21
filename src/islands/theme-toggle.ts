/**
 * @license MIT
 * ============================================================================
 * src/islands/theme-toggle.ts — Comfort Reading Light Toggle (`color-scheme`)
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL PROGRESSIVE ENHANCEMENT GUIDE):
 *   How does our reading-light toggle work without breaking OS automatic themes?
 *     1. By default, `<meta name="color-scheme" content="light dark">` lets the
 *        visitor's operating system switch between Sunlit Parchment (`light`)
 *        during the day and Midnight Compass (`dark`) at night automatically.
 *     2. When the visitor clicks `#cr-reading-light-toggle`:
 *        - We inspect what is CURRENTLY rendered on screen (`stored ?? system`).
 *        - We compute the opposite scheme (`'dark'` or `'light'`).
 *        - If that target matches the current OS preference, the visitor is
 *          undoing an override—so we REMOVE `localStorage['color-scheme']` and
 *          restore `<meta content="light dark">` instead of invisibly pinning it!
 *        - Otherwise we store `'light'` or `'dark'` and update `<meta>`.
 *     3. A `window.addEventListener('storage', ...)` listener keeps multiple
 *        open `crossroads.raggiesoft.com` tabs in instant sync!
 * ============================================================================
 */

const STORAGE_KEY = 'color-scheme';

function getSystemScheme(): 'light' | 'dark' {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function getStoredOverride(): 'light' | 'dark' | null {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === 'light' || val === 'dark' ? val : null;
  } catch {
    return null;
  }
}

function applyMetaColorScheme(value: 'light' | 'dark' | null): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (meta) {
    meta.content = value ?? 'light dark';
  }
}

export function initReadingLightControl(): void {
  const button = document.getElementById('cr-reading-light-toggle');
  if (button) {
    button.addEventListener('click', () => {
      const system = getSystemScheme();
      const stored = getStoredOverride();
      const currentlyRendered: 'light' | 'dark' = stored ?? system;
      const target: 'light' | 'dark' = currentlyRendered === 'dark' ? 'light' : 'dark';

      if (target === system) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        applyMetaColorScheme(null);
      } else {
        try {
          localStorage.setItem(STORAGE_KEY, target);
        } catch {}
        applyMetaColorScheme(target);
      }
    });
  }

  // Keep open tabs synchronized if the visitor toggles reading light in another tab
  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      const next = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
      applyMetaColorScheme(next);
    }
  });
}
