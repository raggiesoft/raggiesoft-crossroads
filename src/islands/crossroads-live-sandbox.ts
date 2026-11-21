/**
 * @license MIT
 * ============================================================================
 * src/islands/crossroads-live-sandbox.ts — Lit 3 Interactive Crossroads Widget
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL INTRO TO GOOGLE LIT 3 & WEB COMPONENTS):
 *   What is a Web Component (`<crossroads-live-sandbox>`)?
 *     The browser lets developers register brand-new HTML tags (always containing
 *     at least one hyphen, like `<crossroads-live-sandbox>`) backed by a JavaScript
 *     class extending `HTMLElement`—or here, **Lit 3's `LitElement`**.
 *
 *   Why use Lit 3 here instead of a plain `<button>`?
 *     Because this widget manages a multi-step branching story tree, tracks a
 *     live breadcrumb trail of reader choices, announces newly chosen scenes to
 *     screen readers via an internal `aria-live="polite"` status region, moves
 *     keyboard focus smoothly to the new scene heading (`tabindex="-1"`), and lets
 *     readers jump back to any prior Crossroads signpost with a single click!
 *
 *   Key Shadow DOM & Accessibility Rules Applied:
 *     1. `LitElement` creates an open Shadow Root (`mode: 'open'`), keeping all
 *        `aria-labelledby` and `id` relationships strictly inside the same tree.
 *     2. `:host` sets `display: block; container-type: inline-size;` and maps
 *        inherited `--cr-*` page tokens onto private `--_cr-*` aliases so both
 *        Light and Dark modes flow cleanly across the Shadow boundary without
 *        using non-standard `:host-context()`.
 *     3. Native `<button>` controls inside Shadow DOM explicitly declare
 *        `font: inherit; color: inherit;` so they inherit page typography rather
 *        than reverting to browser default system button fonts.
 * ============================================================================
 */

import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface SandboxOption {
  id: string;
  marker: string;
  label: string;
  hint: string;
  nextNodeId: string;
}

interface SandboxNode {
  id: string;
  stageLabel: string;
  crossroadsBadge: string;
  heading: string;
  architectNote: string;
  paragraphs: string[];
  promptQuestion?: string;
  options: SandboxOption[];
}

/**
 * Self-contained miniature Story Crossroads scene demonstrating BOTH a 3-Way
 * Crossroads (Stage 1) and a 2-Way Crossroads (Stage 2) leading to complete,
 * coequal sanctuary scenes (Stage 3)—with zero "wrong" or trap choices!
 */
const SANDBOX_NODES: Record<string, SandboxNode> = {
  start: {
    id: 'start',
    stageLabel: 'Opening Trunk • Dusk at the Lantern Post',
    crossroadsBadge: '3-Way Story Crossroads',
    heading: 'Three Trails Beyond the Rain-Washed Porch',
    architectNote:
      'Rowan Hawthorne: “Every Story Crossroads starts on a shared trunk like this porch. Pick whichever lantern trail calls to you—none of the three is a trap!”',
    paragraphs: [
      'Evening rain has just cleared off the cedar eaves, leaving the air cool and sweet with pine resin. On the stone porch table, Grandpa’s brass compass settles due north beside a warm hurricane lantern.',
      'Ahead of you, the mossy footpath splits around a weathered timber signpost pointing toward three very different corners of the valley—each dry, welcoming, and waiting to be explored.'
    ],
    promptQuestion: 'Crossroads 1 (3-Way): Which trail do you take from the signpost?',
    options: [
      {
        id: 'opt-creek',
        marker: 'Option 1 • Creek Trail',
        label: 'Follow the Cedar Footbridge Down to the Creek',
        hint: 'Listen to rushing snowmelt over smooth river stones beneath giant red cedars.',
        nextNodeId: 'creek'
      },
      {
        id: 'opt-ridge',
        marker: 'Option 2 • Meadow Ridge',
        label: 'Climb the Switchback Toward Starlight Meadow',
        hint: 'Catch the last amber sunset glow and watch the first stars emerge overhead.',
        nextNodeId: 'ridge'
      },
      {
        id: 'opt-cabin',
        marker: 'Option 3 • Stone Hearth',
        label: 'Step Inside the Fieldstone Reading Cabin',
        hint: 'Kindle dry cedar kindling in the hearth and listen to raindrops from the window seat.',
        nextNodeId: 'cabin'
      }
    ]
  },

  creek: {
    id: 'creek',
    stageLabel: 'Route 1 • Cedar Creek Footbridge',
    crossroadsBadge: '2-Way Story Crossroads',
    heading: 'Silver Water Under Old-Growth Boughs',
    architectNote:
      'Iris Hawthorne: “Notice the trail pill at the top of this card—I pinned Signpost 1 there so you can step back anytime without losing your bearings.”',
    paragraphs: [
      'Your boots cross hand-split cedar planks suspended six feet above crystal-clear snowmelt. Cutthroat trout dart beneath an undercut root bank while droplets patter softly off broad thimbleberry leaves.',
      'Just across the bridge, two dry spots invite you to linger as twilight deepens.'
    ],
    promptQuestion: 'Crossroads 2 (2-Way): How do you spend the evening by the water?',
    options: [
      {
        id: 'creek-lantern',
        marker: 'Option A • Gravel Bar',
        label: 'Set the Lantern on the Smooth River-Stone Bench',
        hint: 'Watch the Milky Way mirror itself in the calm eddy pool.',
        nextNodeId: 'ending-creek-stars'
      },
      {
        id: 'creek-shelter',
        marker: 'Option B • Cedar Eaves',
        label: 'Rest Beneath the Split-Cedar Canoe Boathouse Roof',
        hint: 'Sketch the valley map by warm lantern light while night mist rises.',
        nextNodeId: 'ending-creek-sketch'
      }
    ]
  },

  ridge: {
    id: 'ridge',
    stageLabel: 'Route 2 • Starlight Meadow Switchback',
    crossroadsBadge: '2-Way Story Crossroads',
    heading: 'Above the Tree Line Under Deep Teal Skies',
    architectNote:
      'Rowan Hawthorne: “Now you’ve reached a focused 2-Way Crossroads—two balanced options shaped specifically by climbing the ridge!”',
    paragraphs: [
      'Ten minutes up the dry granite switchback, the tall hemlocks open onto a sweeping subalpine meadow of wild huckleberry bushes and warm sun-baked boulders.',
      'With zero city lights for eighty miles, the evening sky deepens from compass teal to velvet indigo.'
    ],
    promptQuestion: 'Crossroads 2 (2-Way): Where do you pause on the ridge?',
    options: [
      {
        id: 'ridge-boulder',
        marker: 'Option A • Granite Outcrop',
        label: 'Lean Back Against the Warm South-Facing Granite Ledge',
        hint: 'Trace summer constellations arching cleanly from horizon to horizon.',
        nextNodeId: 'ending-ridge-cosmos'
      },
      {
        id: 'ridge-spring',
        marker: 'Option B • Springhouse Porch',
        label: 'Sit on the Old Timber Porch Beside the Meadow Spring',
        hint: 'Listen to nightjars calling across the quiet canyon below.',
        nextNodeId: 'ending-ridge-porch'
      }
    ]
  },

  cabin: {
    id: 'cabin',
    stageLabel: 'Route 3 • Fieldstone Reading Cabin',
    crossroadsBadge: '2-Way Story Crossroads',
    heading: 'Warmth in the Dry-Stacked Stone Hearth',
    architectNote:
      'Iris Hawthorne: “Nothing beats rain on cedar shakes! From here, choose how you want to spend the evening inside.”',
    paragraphs: [
      'Inside the snug fieldstone cabin, dry western red cedar shavings catch a bright amber flame on the first spark. Light dances across rough-sawn pine bookshelves and a cushioned window bench.',
      'A fresh summer rain shower begins tapping a gentle rhythm against the cedar roof shakes overhead.'
    ],
    promptQuestion: 'Crossroads 2 (2-Way): How do you settle in for the night?',
    options: [
      {
        id: 'cabin-journal',
        marker: 'Option A • Window Bench',
        label: 'Open the Leather Journal Beside the Rain-Streaked Glass',
        hint: 'Let the steady white noise of rain on split cedar steady every thought.',
        nextNodeId: 'ending-cabin-rain'
      },
      {
        id: 'cabin-guitar',
        marker: 'Option B • Fireside Chair',
        label: 'Pick Up the Mahogany Acoustic Guitar by the Hearth',
        hint: 'Fingerpick a warm open-chord melody that fills the timber rafters.',
        nextNodeId: 'ending-cabin-song'
      }
    ]
  },

  'ending-creek-stars': {
    id: 'ending-creek-stars',
    stageLabel: 'Complete Route • Creekside Starlight',
    crossroadsBadge: 'Route Complete • Coequal Ending 1A',
    heading: 'Two Rivers of Stars—One Above, One in the Creek',
    architectNote: 'Rowan & Iris: “Ending 1 of 6 discovered—complete, peaceful, and 100% coequal.”',
    paragraphs: [
      'In the sheltered bend of the creek, the surface flattens into dark glass. High between the cedar crowns, the bright core of the Milky Way emerges star by star until its reflection shimmers right beside your boots.',
      'Notice how nothing here punished you or cut your story short—every route in RaggieSoft Story Crossroads is written as a complete, rewarding journey.'
    ],
    options: []
  },

  'ending-creek-sketch': {
    id: 'ending-creek-sketch',
    stageLabel: 'Complete Route • Boathouse Sanctuary',
    crossroadsBadge: 'Route Complete • Coequal Ending 1B',
    heading: 'Dry Cedar Timber and a Mapped Horizon',
    architectNote: 'Rowan & Iris: “Ending 2 of 6 discovered—hop back one step to see the gravel bar under the stars!”',
    paragraphs: [
      'Beneath the fragrant cedar eaves, your fountain pen traces the bend of the creek, the high granite ridge, and the meadow trail—three distinct stories waiting in the same valley.',
      'Whenever you read a full Story Crossroads novel on RaggieSoft Book Reader, you can keep moving forward on your chosen route or hop back to any signpost whenever you like.'
    ],
    options: []
  },

  'ending-ridge-cosmos': {
    id: 'ending-ridge-cosmos',
    stageLabel: 'Complete Route • Granite Starwatch',
    crossroadsBadge: 'Route Complete • Coequal Ending 2A',
    heading: 'Sun-Warmed Stone Under the Milky Way',
    architectNote: 'Rowan & Iris: “Ending 3 of 6 discovered—clear skies all the way across the ridge.”',
    paragraphs: [
      'The granite slab still holds the afternoon sun against your shoulders while thousands of pinpoint stars blaze across the clear mountain sky.',
      'In a full RaggieSoft Story Crossroads novel like Cedar Run, choosing a high ridge foothold shapes every chapter that follows—from how characters gather water to what shelter they build.'
    ],
    options: []
  },

  'ending-ridge-porch': {
    id: 'ending-ridge-porch',
    stageLabel: 'Complete Route • Meadow Springhouse',
    crossroadsBadge: 'Route Complete • Coequal Ending 2B',
    heading: 'Cold Artesian Water and Quiet Pine Wind',
    architectNote: 'Rowan & Iris: “Ending 4 of 6 discovered—modeled after Route 3 in Cedar Run!”',
    paragraphs: [
      'From the covered timber porch, cool spring water trickles steadily through a hand-carved stone trough while wind hushes through the pines below.',
      'Every option at a Story Crossroads honors character agency—giving you three or two distinct ways to live inside the world.'
    ],
    options: []
  },

  'ending-cabin-rain': {
    id: 'ending-cabin-rain',
    stageLabel: 'Complete Route • Rain on Split Cedar',
    crossroadsBadge: 'Route Complete • Coequal Ending 3A',
    heading: 'The Soothing Hush of Rain on Cedar Shakes',
    architectNote: 'Rowan & Iris: “Ending 5 of 6 discovered—the Lantern Conservatory’s favorite sound.”',
    paragraphs: [
      'Wrapped in warmth beside the windowpane, the steady white noise of mountain rain against split-cedar shingles washes away the noise of the outside world.',
      'Ready to read a full-length branching novel? Jump straight into Cedar Run—or step back to the signpost below to try one of the other two trails!'
    ],
    options: []
  },

  'ending-cabin-song': {
    id: 'ending-cabin-song',
    stageLabel: 'Complete Route • Fireside Harmony',
    crossroadsBadge: 'Route Complete • Coequal Ending 3B',
    heading: 'Warm Mahogany Chords Against the Evening Rain',
    architectNote: 'Rowan & Iris: “Ending 6 of 6 discovered—warmth, music, and dry cedar rafters.”',
    paragraphs: [
      'Six acoustic strings ring out warmly against the stone hearth, blending effortless mountain-folk chords with the crackle of dry cedar kindling.',
      'Every Story Crossroads route carries its own heart, atmosphere, and discoveries—try stepping back to Crossroads 1 below to see where the creek or ridge trails lead!'
    ],
    options: []
  }
};

@customElement('crossroads-live-sandbox')
export class CrossroadsLiveSandbox extends LitElement {
  /**
   * `@state()` is Lit 3's reactive internal state decorator: whenever `history`
   * changes, Lit surgically updates ONLY the changed text/buttons inside this
   * Shadow Root without touching the rest of the Eleventy page!
   */
  @state()
  private history: string[] = ['start'];

  @state()
  private liveAnnouncement = '';

  static styles = css`
    @layer component {
      :host {
        display: block;
        container-type: inline-size;

        /* Private shadow custom-property aliases reading inherited page tokens */
        --_bg: var(--cr-surface, #ffffff);
        --_bg-raised: var(--cr-brass-surface, #fdf5e6);
        --_ink: var(--cr-ink, #0c222b);
        --_muted: var(--cr-ink-muted, #244552);
        --_teal: var(--cr-teal, #0b4a5a);
        --_brass: var(--cr-brass, #6e4309);
        --_border: var(--cr-border, #5a7682);
        --_focus: var(--cr-focus, #0b5cab);
        --_btn-bg: var(--cr-btn-bg, #0b4a5a);
        --_btn-fg: var(--cr-btn-fg, #ffffff);
        --_badge-bg: var(--cr-badge-bg, #0c3b47);
        --_badge-fg: var(--cr-badge-fg, #fde6be);
      }

      .sandbox-shell {
        background-color: var(--_bg);
        color: var(--_ink);
        border: 2px solid var(--_border);
        border-radius: 1rem;
        padding: clamp(1.15rem, 3vw, 1.85rem);
      }

      .trail-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding-bottom: 1rem;
        margin-bottom: 1.25rem;
        border-bottom: 1.5px solid var(--_border);
      }

      .breadcrumbs {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.4rem;
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 0.85rem;
      }

      .crumb-btn {
        font: inherit;
        color: inherit;
        background-color: var(--_bg-raised);
        border: 1.5px solid var(--_border);
        border-radius: 999px;
        padding: 0.28rem 0.7rem;
        font-weight: 600;
        cursor: pointer;
      }

      .crumb-current {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.28rem 0.75rem;
        border-radius: 999px;
        background-color: var(--_badge-bg);
        color: var(--_badge-fg);
        border: 1.5px solid var(--_border);
        font-weight: 700;
      }

      .badge-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.65rem;
      }

      .seal-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.25rem 0.7rem;
        border-radius: 999px;
        background-color: var(--_badge-bg);
        color: var(--_badge-fg);
        border: 1px solid var(--_border);
        font-size: 0.8rem;
        font-weight: 700;
      }

      .stage-label {
        font-size: 0.86rem;
        font-weight: 600;
        color: var(--_muted);
      }

      .scene-heading {
        font-family: var(--cr-font-display, Georgia, serif);
        font-size: clamp(1.35rem, 2.5vw, 1.75rem);
        line-height: 1.25;
        margin: 0 0 0.85rem;
      }

      .scene-heading:focus {
        outline: none;
      }

      .scene-heading:focus-visible {
        outline: 3px solid var(--_focus);
        outline-offset: 4px;
      }

      .prose p {
        margin: 0 0 0.95rem;
        line-height: 1.7;
        max-width: 68ch;
      }

      .architect-note {
        margin: 0 0 1rem;
        padding: 0.7rem 0.95rem;
        border-left: 4px solid var(--_teal);
        background-color: var(--_bg-raised);
        border-radius: 0.45rem;
        font-size: 0.9rem;
        color: var(--_muted);
      }

      .crossroads-prompt {
        margin-top: 1.35rem;
        padding-top: 1.15rem;
        border-top: 1.5px dashed var(--_border);
      }

      .prompt-title {
        font-weight: 700;
        font-size: 1rem;
        margin: 0 0 0.85rem;
        color: var(--_brass);
      }

      .options-grid {
        display: grid;
        gap: 0.85rem;
        grid-template-columns: 1fr;
      }

      @container (min-width: 42rem) {
        .options-grid[data-count="3"] {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .options-grid[data-count="2"] {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      /* Wrapped native <button> MUST declare font: inherit and color: inherit */
      .option-btn {
        font: inherit;
        color: var(--_ink);
        background-color: var(--_bg-raised);
        border: 2px solid var(--_border);
        border-radius: 0.85rem;
        padding: 1rem;
        text-align: left;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        transition: transform 0.12s ease, background-color 0.12s ease;
      }

      .option-btn:hover {
        transform: translateY(-1px);
      }

      .option-marker {
        font-size: 0.78rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--_brass);
      }

      .option-label {
        font-weight: 700;
        font-size: 1rem;
        line-height: 1.35;
      }

      .option-hint {
        font-size: 0.88rem;
        color: var(--_muted);
        line-height: 1.45;
      }

      .ending-actions {
        margin-top: 1.35rem;
        padding-top: 1.15rem;
        border-top: 1.5px solid var(--_border);
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      }

      .action-btn,
      .action-link {
        font: inherit;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        min-height: 44px;
        padding: 0.6rem 1.1rem;
        border-radius: 0.6rem;
        font-weight: 700;
        font-size: 0.94rem;
        cursor: pointer;
        text-decoration: none;
      }

      .action-primary {
        background-color: var(--_btn-bg);
        color: var(--_btn-fg);
        border: 2px solid var(--_btn-bg);
      }

      .action-secondary {
        background-color: var(--_bg);
        color: var(--_ink);
        border: 2px solid var(--_border);
      }

      button:focus-visible,
      a:focus-visible {
        outline: 3px solid var(--_focus);
        outline-offset: 3px;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media (prefers-reduced-motion: reduce) {
        .option-btn {
          transition: none;
        }
        .option-btn:hover {
          transform: none;
        }
      }

      @media (forced-colors: active) {
        .sandbox-shell,
        .option-btn,
        .crumb-btn,
        .action-secondary {
          background-color: Canvas;
          color: CanvasText;
          border-color: ButtonBorder;
        }
        .action-primary {
          background-color: ButtonFace;
          color: ButtonText;
          border-color: ButtonText;
        }
      }
    }
  `;

  private get currentNode(): SandboxNode {
    const currentId = this.history[this.history.length - 1] || 'start';
    return SANDBOX_NODES[currentId] || SANDBOX_NODES.start;
  }

  private chooseOption(option: SandboxOption): void {
    const nextNode = SANDBOX_NODES[option.nextNodeId];
    if (!nextNode) return;
    this.history = [...this.history, option.nextNodeId];
    this.liveAnnouncement = `Selected ${option.label}. Now reading: ${nextNode.heading}.`;
    this.focusSceneHeading();
  }

  private jumpToHistoryIndex(index: number): void {
    if (index < 0 || index >= this.history.length - 1) return;
    const sliced = this.history.slice(0, index + 1);
    const targetNode = SANDBOX_NODES[sliced[sliced.length - 1]] || SANDBOX_NODES.start;
    this.history = sliced;
    this.liveAnnouncement = `Returned to signpost: ${targetNode.heading}.`;
    this.focusSceneHeading();
  }

  private restartSandbox(): void {
    this.history = ['start'];
    this.liveAnnouncement = 'Returned to opening Crossroads signpost.';
    this.focusSceneHeading();
  }

  /**
   * Moves keyboard focus explicitly to the newly revealed scene heading (`tabindex="-1"`)
   * after Lit finishes updating the Shadow DOM (`this.updateComplete`), matching our
   * RaggieSoft Book Reader focus-management standard!
   */
  private focusSceneHeading(): void {
    void this.updateComplete.then(() => {
      const heading = this.renderRoot.querySelector<HTMLElement>('#sandbox-scene-heading');
      heading?.focus();
    });
  }

  override render() {
    const node = this.currentNode;

    return html`
      <section class="sandbox-shell" aria-labelledby="sandbox-scene-heading">
        <div class="sr-only" role="status" aria-live="polite">${this.liveAnnouncement}</div>

        <nav class="trail-bar" aria-label="Your Story Crossroads trail">
          <ol class="breadcrumbs">
            ${this.history.map((nodeId, idx) => {
              const item = SANDBOX_NODES[nodeId] || SANDBOX_NODES.start;
              const isCurrent = idx === this.history.length - 1;
              const shortLabel =
                idx === 0 ? 'Signpost 1' : idx === 1 ? 'Signpost 2' : 'Chosen Destination';

              return html`
                <li>
                  ${isCurrent
                    ? html`<span class="crumb-current" aria-current="step">
                        <span aria-hidden="true">🧭</span>
                        <span>${shortLabel}: ${item.stageLabel.split('•')[0].trim()}</span>
                      </span>`
                    : html`<button
                        type="button"
                        class="crumb-btn"
                        @click=${() => this.jumpToHistoryIndex(idx)}
                      >
                        ↩ Return to ${shortLabel}
                      </button>`}
                </li>
              `;
            })}
          </ol>
        </nav>

        <div class="badge-row">
          <span class="seal-pill">
            <span aria-hidden="true">✦</span>
            <span>${node.crossroadsBadge}</span>
          </span>
          <span class="stage-label">${node.stageLabel}</span>
        </div>

        <h3 id="sandbox-scene-heading" class="scene-heading" tabindex="-1">${node.heading}</h3>

        <p class="architect-note">${node.architectNote}</p>

        <div class="prose">
          ${node.paragraphs.map((p) => html`<p>${p}</p>`)}
        </div>

        ${node.options.length > 0
          ? html`
              <div class="crossroads-prompt">
                <p class="prompt-title" id="sandbox-prompt-label">${node.promptQuestion}</p>
                <div
                  class="options-grid"
                  data-count=${String(node.options.length)}
                  role="group"
                  aria-labelledby="sandbox-prompt-label"
                >
                  ${node.options.map(
                    (opt) => html`
                      <button
                        type="button"
                        class="option-btn"
                        @click=${() => this.chooseOption(opt)}
                      >
                        <span class="option-marker">${opt.marker}</span>
                        <span class="option-label">${opt.label} →</span>
                        <span class="option-hint">${opt.hint}</span>
                      </button>
                    `
                  )}
                </div>
              </div>
            `
          : html`
              <div class="ending-actions">
                <a class="action-link action-primary" href="https://books.raggiesoft.com/cedar-run">
                  <span aria-hidden="true">📚</span>
                  <span>Read Cedar Run on RaggieSoft Book Reader</span>
                </a>
                ${this.history.length > 2
                  ? html`
                      <button
                        type="button"
                        class="action-btn action-secondary"
                        @click=${() => this.jumpToHistoryIndex(1)}
                      >
                        ↩ Try the Other 2-Way Option
                      </button>
                    `
                  : null}
                <button
                  type="button"
                  class="action-btn action-secondary"
                  @click=${() => this.restartSandbox()}
                >
                  🧭 Back to 3-Way Opening Signpost
                </button>
              </div>
            `}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crossroads-live-sandbox': CrossroadsLiveSandbox;
  }
}
