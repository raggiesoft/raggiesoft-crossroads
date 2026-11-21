/**
 * @license MIT
 * ============================================================================
 * src/islands/crossroads-seal-explorer.ts — Lit 3 Medallion & Crest Inspector
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL WAI-ARIA TABS INSIDE SHADOW DOM):
 *   What does `<crossroads-seal-explorer>` do?
 *     Every RaggieSoft Story Crossroads book cover carries one of two official
 *     Deep Compass Teal (`#0F4C5C`) and Warm Brass (`#E3B27C`) medallions:
 *       1. **2-Way Story Crossroads** (two-board signpost for binary Option A /
 *          Option B turning points).
 *       2. **3-Way Story Crossroads** (three-board signpost for multi-route
 *          turning points like *Cedar Run*).
 *
 *   How Accessible Keyboard Navigation Works Inside This Custom Element:
 *     - Implements the WAI-ARIA Tabs pattern (`role="tablist"`, `role="tab"`,
 *       `role="tabpanel"`) with ALL `id`, `aria-controls`, and `aria-labelledby`
 *       attributes kept strictly inside this component's open Shadow Root so
 *       relationships never break across the Shadow boundary!
 *     - Supports `ArrowLeft`, `ArrowRight`, `Home`, and `End` roving `tabindex`
 *       (`0` on the active tab, `-1` on inactive tabs) so keyboard users tab in
 *       with a single stop and switch seals effortlessly with arrow keys.
 * ============================================================================
 */

import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface SealSpec {
  id: '3way' | '2way';
  tabLabel: string;
  heading: string;
  tagline: string;
  whenUsed: string;
  signpostAnatomy: string[];
  exampleNote: string;
  emblemUrl: string;
  emblemAlt: string;
  sealUrl: string;
  sealAlt: string;
}

const CDN_LOGOS = 'https://assets.raggiesoft.com/raggiesoft-books/images/logos';

const SEAL_SPECS: SealSpec[] = [
  {
    id: '3way',
    tabLabel: '3-Way Crossroads Seal',
    heading: '3-Way Story Crossroads Medallion (Multi-Route Editions)',
    tagline: 'Three signpost boards & three diverging paths beneath the RaggieSoft star.',
    whenUsed:
      'Stamped onto Story Crossroads novels where a pivotal Crossroads offers three or more coequal routes forward—allowing readers to compare three distinct ways of living inside the story world.',
    signpostAnatomy: [
      'Three angled Warm Brass directional boards pointing upper-left, center-right, and lower-left.',
      'Three diverging path arcs beneath the signpost pedestal representing three full-length storylines.',
      'Deep Compass Teal (#0F4C5C) field with twin brass rings and four-point star separators.'
    ],
    exampleNote: 'Featured on Cedar Run (Book One: First Foothold in the Valley).',
    emblemUrl: `${CDN_LOGOS}/story-crossroads-logo-3way-512.png`,
    emblemAlt:
      'Open golden-lit book with a three-directional teal and warm brass signpost rising from its pages beneath a four-point star',
    sealUrl: `${CDN_LOGOS}/story-crossroads-seal-3way.svg`,
    sealAlt:
      'Circular RaggieSoft Story Crossroads 3-Way cover medallion in Deep Compass Teal and Warm Brass'
  },
  {
    id: '2way',
    tabLabel: '2-Way Crossroads Seal',
    heading: '2-Way Story Crossroads Medallion (Binary Crossroads Editions)',
    tagline: 'Two opposing signpost boards for defining two-option turning points.',
    whenUsed:
      'Stamped onto Story Crossroads novels built around focused Option A vs. Option B decisions—where two equally compelling convictions or promises carry the story down two distinct routes.',
    signpostAnatomy: [
      'Two balanced Warm Brass directional boards pointing left and right from the central post.',
      'Two diverging path arcs below the pedestal honoring both sides of a defining choice.',
      'Placed in the lower-right cover safe zone with a soft elevation halo for instant shelf recognition.'
    ],
    exampleNote: 'Reserved for binary two-route RaggieSoft Story Crossroads editions.',
    emblemUrl: `${CDN_LOGOS}/story-crossroads-logo-2way-512.png`,
    emblemAlt:
      'Open golden-lit book with a two-directional teal and warm brass signpost rising from its pages beneath a four-point star',
    sealUrl: `${CDN_LOGOS}/story-crossroads-seal-2way.svg`,
    sealAlt:
      'Circular RaggieSoft Story Crossroads 2-Way cover medallion in Deep Compass Teal and Warm Brass'
  }
];

@customElement('crossroads-seal-explorer')
export class CrossroadsSealExplorer extends LitElement {
  @state()
  private activeId: '3way' | '2way' = '3way';

  static styles = css`
    @layer component {
      :host {
        display: block;
        container-type: inline-size;

        --_bg: var(--cr-surface, #ffffff);
        --_bg-raised: var(--cr-brass-surface, #fdf5e6);
        --_ink: var(--cr-ink, #0c222b);
        --_muted: var(--cr-ink-muted, #244552);
        --_brass: var(--cr-brass, #6e4309);
        --_border: var(--cr-border, #5a7682);
        --_focus: var(--cr-focus, #0b5cab);
        --_badge-bg: var(--cr-badge-bg, #0c3b47);
        --_badge-fg: var(--cr-badge-fg, #fde6be);
      }

      .explorer-box {
        background-color: var(--_bg);
        color: var(--_ink);
        border: 2px solid var(--_border);
        border-radius: 1rem;
        padding: clamp(1.15rem, 3vw, 1.85rem);
      }

      .tablist {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1.5px solid var(--_border);
      }

      .tab-btn {
        font: inherit;
        color: var(--_ink);
        background-color: var(--_bg-raised);
        border: 2px solid var(--_border);
        border-radius: 0.65rem;
        min-height: 44px;
        padding: 0.55rem 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
      }

      .tab-btn[aria-selected="true"] {
        background-color: var(--_badge-bg);
        color: var(--_badge-fg);
      }

      .tab-btn:focus-visible {
        outline: 3px solid var(--_focus);
        outline-offset: 3px;
      }

      .panel-grid {
        display: grid;
        gap: 1.5rem;
        align-items: center;
        grid-template-columns: 1fr;
      }

      @container (min-width: 44rem) {
        .panel-grid {
          grid-template-columns: 1.05fr 0.95fr;
        }
      }

      .panel-heading {
        font-family: var(--cr-font-display, Georgia, serif);
        font-size: clamp(1.3rem, 2.3vw, 1.65rem);
        margin: 0 0 0.4rem;
      }

      .tagline {
        font-weight: 700;
        color: var(--_brass);
        margin: 0 0 0.85rem;
      }

      .when-used {
        margin: 0 0 1rem;
        line-height: 1.65;
      }

      .anatomy-list {
        margin: 0 0 1rem;
        padding-left: 1.25rem;
      }

      .anatomy-list li {
        margin-bottom: 0.45rem;
        color: var(--_muted);
      }

      .example-pill {
        display: inline-block;
        padding: 0.4rem 0.8rem;
        border-radius: 0.5rem;
        background-color: var(--_bg-raised);
        border: 1.5px solid var(--_border);
        font-size: 0.88rem;
        font-weight: 600;
      }

      .art-pair {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .art-card {
        margin: 0;
        background-color: #081521;
        color: #f3f7f9;
        border: 2px solid var(--_border);
        border-radius: 0.85rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.65rem;
      }

      .art-card img {
        width: 100%;
        max-width: 175px;
        aspect-ratio: 1 / 1;
        object-fit: contain;
        border-radius: 0.5rem;
      }

      .art-caption {
        font-size: 0.82rem;
        font-weight: 600;
        color: #fde6be;
      }

      @media (forced-colors: active) {
        .explorer-box,
        .tab-btn,
        .example-pill {
          background-color: Canvas;
          color: CanvasText;
          border-color: ButtonBorder;
        }
        .tab-btn[aria-selected="true"] {
          background-color: Highlight;
          color: HighlightText;
        }
      }
    }
  `;

  private handleTabKeydown(e: KeyboardEvent, index: number): void {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % SEAL_SPECS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + SEAL_SPECS.length) % SEAL_SPECS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = SEAL_SPECS.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextSpec = SEAL_SPECS[nextIndex];
    this.activeId = nextSpec.id;
    void this.updateComplete.then(() => {
      const btn = this.renderRoot.querySelector<HTMLButtonElement>(`#tab-${nextSpec.id}`);
      btn?.focus();
    });
  }

  override render() {
    const active = SEAL_SPECS.find((s) => s.id === this.activeId) || SEAL_SPECS[0];

    return html`
      <div class="explorer-box">
        <div class="tablist" role="tablist" aria-label="Story Crossroads Seal Variants">
          ${SEAL_SPECS.map((spec, idx) => {
            const selected = spec.id === active.id;
            return html`
              <button
                type="button"
                role="tab"
                class="tab-btn"
                id="tab-${spec.id}"
                aria-selected=${selected ? 'true' : 'false'}
                aria-controls="panel-${spec.id}"
                tabindex=${selected ? '0' : '-1'}
                @click=${() => {
                  this.activeId = spec.id;
                }}
                @keydown=${(e: KeyboardEvent) => this.handleTabKeydown(e, idx)}
              >
                <span aria-hidden="true">${selected ? '✦' : '○'}</span>
                <span>${spec.tabLabel}</span>
              </button>
            `;
          })}
        </div>

        <div
          role="tabpanel"
          id="panel-${active.id}"
          aria-labelledby="tab-${active.id}"
          class="panel-grid"
        >
          <div>
            <h3 class="panel-heading">${active.heading}</h3>
            <p class="tagline">${active.tagline}</p>
            <p class="when-used">${active.whenUsed}</p>
            <ul class="anatomy-list">
              ${active.signpostAnatomy.map((item) => html`<li>${item}</li>`)}
            </ul>
            <span class="example-pill">${active.exampleNote}</span>
          </div>

          <div class="art-pair">
            <figure class="art-card">
              <img src=${active.emblemUrl} alt=${active.emblemAlt} width="175" height="175" loading="lazy" />
              <figcaption class="art-caption">Imprint Crest</figcaption>
            </figure>
            <figure class="art-card">
              <img src=${active.sealUrl} alt=${active.sealAlt} width="175" height="175" loading="lazy" />
              <figcaption class="art-caption">Book Cover Medallion</figcaption>
            </figure>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crossroads-seal-explorer': CrossroadsSealExplorer;
  }
}
