/**
 * @license MIT
 * ============================================================================
 * src/site/_data/imprint.js — Global Eleventy v3 Data Module for Story Crossroads
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL INTRO TO ELEVENTY'S DATA CASCADE):
 *   How does Eleventy's `_data/` folder work?
 *     Any `.js` or `.json` file inside `src/site/_data/` automatically becomes
 *     a global template variable across EVERY Nunjucks page! Because this file
 *     is named `imprint.js`, any template can write `{{ imprint.siteName }}` or
 *     `{% for architect in imprint.architects.siblings %}` at build time with
 *     zero database queries and zero client-side network fetches!
 *
 *   In-Universe Guides:
 *     Brother and sister **Rowan & Iris Hawthorne** serve as the in-universe
 *     Architects of the Crossroads—parallel to Isabel, Eleanor, Sophia, and
 *     Oliver at Ocean View Archives—welcoming readers to the Lantern Signpost
 *     and explaining how Story Crossroads works.
 * ============================================================================
 */

const CDN_BASE = 'https://assets.raggiesoft.com';

export default {
  siteName: 'RaggieSoft Story Crossroads',
  siteOrigin: 'https://crossroads.raggiesoft.com',
  indexNowKey: '726167676965736f6674696e6465786e',
  heroImage: `${CDN_BASE}/raggiesoft-books/images/covers/og/story-crossroads-imprint.jpg`,
  architectsImage: `${CDN_BASE}/raggiesoft-books/images/scenes/crossroads/rowan_and_iris_hawthorne_signpost_architects.jpg`,
  logos: {
    emblem2Way: `${CDN_BASE}/raggiesoft-books/images/logos/story-crossroads-logo-2way-512.png`,
    emblem3Way: `${CDN_BASE}/raggiesoft-books/images/logos/story-crossroads-logo-3way-512.png`,
    seal2Way: `${CDN_BASE}/raggiesoft-books/images/logos/story-crossroads-seal-2way.svg`,
    seal3Way: `${CDN_BASE}/raggiesoft-books/images/logos/story-crossroads-seal-3way.svg`
  },

  /**
   * Navigation bar links rendered in `_includes/base.njk` and indexed in `sitemap.njk`.
   * Every SEO title is strictly <= 60 characters and every description is <= 155 characters.
   */
  navRoutes: [
    {
      url: '/',
      label: 'Signpost Home',
      seoTitle: 'RaggieSoft Story Crossroads | Interactive Novels',
      seoDescription:
        'Step onto the porch with Crossroads Architects Rowan and Iris Hawthorne to explore RaggieSoft Story Crossroads interactive branching novels.'
    },
    {
      url: '/architects',
      label: 'Rowan & Iris',
      seoTitle: 'Rowan & Iris Hawthorne | Architects of the Crossroads',
      seoDescription:
        'Meet brother and sister Rowan and Iris Hawthorne—the in-universe trail cartographer and medallion keeper behind RaggieSoft Story Crossroads.'
    },
    {
      url: '/how-it-works',
      label: 'How It Works',
      seoTitle: 'How Story Crossroads Works | Coequal Story Routes',
      seoDescription:
        'Rowan and Iris Hawthorne explain how RaggieSoft Story Crossroads novels honor every reader choice with coequal routes and signpost returns.'
    },
    {
      url: '/seals',
      label: '2-Way & 3-Way Seals',
      seoTitle: '2-Way & 3-Way Compass Seals | Story Crossroads',
      seoDescription:
        'Iris Hawthorne walks you through the Deep Compass Teal and Warm Brass medallions stamped on 2-Way and 3-Way Story Crossroads editions.'
    },
    {
      url: '/catalog',
      label: 'Bookshelf',
      seoTitle: 'Story Crossroads Bookshelf | Interactive Editions',
      seoDescription:
        'Browse published RaggieSoft Story Crossroads interactive novels, starting with Cedar Run—our three-route Pacific Northwest wilderness story.'
    },
    {
      url: '/sandbox',
      label: 'Try a Crossroads',
      seoTitle: 'Interactive Story Crossroads Preview | Try a Route',
      seoDescription:
        'Join Rowan and Iris at the lantern signpost to test a live 3-Way and 2-Way Story Crossroads right in your browser before opening a book.'
    }
  ],

  /**
   * In-universe Brother & Sister Architects of the Crossroads.
   */
  architects: {
    conservatoryName: 'The Lantern Signpost Conservatory',
    introQuote:
      '“Pull up a chair by the lantern! Over at Ocean View Archives, our friends Isabel, Eleanor, Sophia, and Oliver guard the great single-timeline novels. Out here on the porch, my brother Rowan and I build the signposts for stories meant to branch—where every single trail you pick leads somewhere whole, honest, and worth the walk.”',
    introSpeaker: '— Iris Hawthorne, Medallion Engraver & Co-Architect of the Crossroads',
    siblings: [
      {
        name: 'Rowan Hawthorne',
        ageAndRole: 'Brother (Age 23) • Trail Cartographer & Signpost Builder',
        icon: '🧭',
        specialty: 'Surveying Coequal Horizons & Carving the Signposts',
        voiceQuote:
          '“When Iris and I were kids, we hated branching books that punished you on the next page just for being curious. My job at the drafting table is simple: if we nail a brass board onto a signpost, the trail underneath it leads to a full, lived-in story—never a cliff or a trick door.”',
        duties: [
          'Charts the shared opening trunk and surveys two or three genuine, balanced trails at every Crossroads.',
          'Makes sure each option reflects a meaningful way characters choose to live, build, or stand by one another.',
          'Leaves warm lantern markers at every fork so you always know what trade-offs lie ahead without spoilers.'
        ]
      },
      {
        name: 'Iris Hawthorne',
        ageAndRole: 'Sister (Age 21) • Medallion Engraver & Continuity Keeper',
        icon: '✦',
        specialty: 'Stamping the Compass Seals & Keeping Trails Distinct',
        voiceQuote:
          '“Once Rowan maps the trails, I strike the circular 2-Way or 3-Way Compass Medallion onto the cover and keep each route’s ledger clean. Choose the creek bend, and the chapters remember split cedar; hop back for the granite overhang, and the hearth stones are waiting for you.”',
        duties: [
          'Engraves and stamps the Deep Compass Teal and Warm Brass 2-Way and 3-Way medallions onto every edition.',
          'Keeps separate Crossroads routes cleanly self-contained so details from unchosen paths never bleed across.',
          'Coordinates weekly book crates with Isabel and Sophia at Ocean View Archives so linear multi-book canon stays untangled.'
        ]
      }
    ],
    threeLaws: [
      {
        number: 'Law I',
        title: 'Zero Trick Doors, Zero Dead Ends',
        body: 'Rowan never carves a decoy signboard. Every option at a Crossroads opens a complete, full-hearted narrative route.'
      },
      {
        number: 'Law II',
        title: 'Purpose-Built Standalone Worlds',
        body: 'Iris keeps Story Crossroads worlds independent from multi-book linear series so your choices have true freedom to reshape the story.'
      },
      {
        number: 'Law III',
        title: 'The Lantern Stays Lit Behind You',
        body: 'Your chosen trail is remembered automatically from chapter to chapter, and you can step back to any signpost whenever curiosity calls.'
      }
    ]
  },

  /**
   * Four foundational editorial pillars distinguishing RaggieSoft Story Crossroads.
   */
  pillars: [
    {
      icon: '🧭',
      title: 'Every Route Is Coequal',
      summary:
        'Rowan’s first rule at the drafting desk: there are never abrupt dead ends or "wrong answers." Every option opens a complete, thoughtfully written storyline.'
    },
    {
      icon: '📖',
      title: 'Novel-Grade Literary Prose',
      summary:
        'Each Story Crossroads edition reads with the same rich sensory atmosphere, emotional warmth, and lived-in dialogue as our Ocean View Archives novels.'
    },
    {
      icon: '🌲',
      title: 'Self-Contained Worlds',
      summary:
        'Purpose-built standalone settings give your choices genuine room to reshape where characters live, what they build, and who they become.'
    },
    {
      icon: '🔖',
      title: 'Step Back Anytime',
      summary:
        'Iris’s route-memory ribbon remembers your active path across chapters while letting you return to any Crossroads signpost with a single tap.'
    }
  ],

  /**
   * Step-by-step walkthrough narrated by Rowan & Iris for `/how-it-works`.
   */
  readingSteps: [
    {
      stepNumber: '01',
      guide: 'Rowan’s Trail Note',
      heading: 'Walk the Shared Opening Trunk Together',
      detail:
        'Every Story Crossroads novel begins on a shared trail that grounds you in the characters, their bond, and the turning point unfolding in front of them.'
    },
    {
      stepNumber: '02',
      guide: 'Rowan’s Trail Note',
      heading: 'Pause at the Lantern Signpost',
      detail:
        'When the characters reach a defining fork in the road, a clear Crossroads card presents two or three distinct options—explaining the real trade-offs ahead without spoiling surprises.'
    },
    {
      stepNumber: '03',
      guide: 'Iris’s Continuity Note',
      heading: 'Live Inside Your Chosen Route',
      detail:
        'Your table of contents and Next Chapter links automatically follow the route you chose across web, desktop, tablet, and phone—with zero cross-trail confusion.'
    },
    {
      stepNumber: '04',
      guide: 'Iris’s Continuity Note',
      heading: 'Return to the Signpost Whenever You Wish',
      detail:
        'Wondering how life would have unfolded at the granite overhang instead of the creek bend? Tap the signpost link anytime—we leave the lantern burning for you.'
    }
  ],

  /**
   * Flagship & upcoming editions showcased on `/` and `/catalog`.
   */
  editions: [
    {
      slug: 'cedar-run',
      title: 'Cedar Run',
      subtitle: 'Book One: First Foothold in the Valley',
      directionsLabel: '3-Way Story Crossroads Edition',
      directionsCount: 3,
      eraLabel: 'Summer 2000 • Northeast Washington Wilderness',
      architectNote:
        'Rowan & Iris’s Field Note: “Luke, Tessa, and Sadie Bridger refused to let anyone split the three of them apart at eighteen. At their first Crossroads, you help all three triplets choose where in the valley to build their shelter together.”',
      cover2x3: `${CDN_BASE}/raggiesoft-books/images/covers/2x3/cedar-run.jpg`,
      coverOg: `${CDN_BASE}/raggiesoft-books/images/covers/og/cedar-run.jpg`,
      sealUrl: `${CDN_BASE}/raggiesoft-books/images/logos/story-crossroads-seal-3way.svg`,
      readUrl: 'https://books.raggiesoft.com/cedar-run',
      worldUrl: 'https://cedarrun.raggiesoft.com',
      synopsis:
        'Turned out on the evening of their eighteenth birthday simply for refusing to scatter onto three separate lives, fraternal brother Luke and identical twin sisters Tessa and Sadie Bridger step past their backyard fence into deep old-growth cedar forest with Grandpa Owen Sawyer’s canvas tool roll and 1974 mahogany guitar.',
      routes: [
        {
          badge: 'Option 1 • Creek-Side Timber',
          name: 'The Creek-Bend Cedar Bench',
          summary:
            'Split straight-grained windfall western red cedar planks beside cutthroat trout pools and soothing mountain rain.'
        },
        {
          badge: 'Option 2 • Dry-Stone Hearth',
          name: 'The Granite Overhang',
          summary:
            'Dry-stack warm Kettle Range granite beneath a natural rock ceiling thirty feet above the valley floor.'
        },
        {
          badge: 'Option 3 • High Meadow Spring',
          name: 'The Forgotten Stone Springhouse',
          summary:
            'Restore an overgrown 1930s mossy stone springhouse beside cold artesian water and wild huckleberry slopes.'
        }
      ]
    },
    {
      slug: 'waystation',
      title: 'The Uncharted Waystation',
      subtitle: 'Book One: Beyond the Studio Rift',
      directionsLabel: '3-Way Story Crossroads Edition',
      directionsCount: 3,
      eraLabel: '1980s Fantasy Realm of Vaeloria • Twin Moons',
      architectNote:
        'Rowan & Iris’s Field Note: “After losing their grandfather the day before Gwen turned eighteen, twenty-four-year-old Nolan (5\'7") and his six-foot-one sister Gwen Lennox (19) scraped by together in a tiny studio apartment—until Vaeloria’s sleeping Astrolabe answered Gwen’s wish, calling two inseparable hearts on forearm crutches to heal The Great Drift and find a forever home they never want to leave.”',
      cover2x3: `${CDN_BASE}/raggiesoft-books/images/covers/2x3/waystation.jpg`,
      coverOg: `${CDN_BASE}/raggiesoft-books/images/covers/og/waystation.jpg`,
      sealUrl: `${CDN_BASE}/raggiesoft-books/images/logos/story-crossroads-seal-3way.svg`,
      readUrl: 'https://books.raggiesoft.com/waystation',
      worldUrl: 'https://waystation.raggiesoft.com',
      synopsis:
        'Twenty-four-year-old Nolan Lennox and his tall nineteen-year-old sister Gwen tumble barefoot in jeans and cotton t-shirts from their one-room studio sofa-bed into the painted twin-moon borderlands of Vaeloria with Grandpa Walter’s plaid blanket and four ergonomic Lofstrand forearm crutches—choosing at every Story Crossroads which gentle 1980s-fantasy road carries them inward to re-harmonize the Bronze Astrolabe.',
      routes: [
        {
          badge: 'Option 1 • Waterway Lanterns',
          name: 'The Glasswater Lantern-Barge Canal',
          summary:
            'Rest bare feet on cushioned cedar planks aboard Maren’s glowing sapphire-lantern barge while navigating by double moonlight.'
        },
        {
          badge: 'Option 2 • Cushion-Moss & Springs',
          name: 'The Whisperwood Cushion-Moss Road',
          summary:
            'Walk unhurriedly over three-inch-deep velvet moss built by the Slow-Footed Order beside warm 98-degree crystal mineral foot-basins.'
        },
        {
          badge: 'Option 3 • Sky-Cable Gondolas',
          name: 'The Brass Counterweight Gondola Way',
          summary:
            'Glide effortlessly up the Amber Crags inside water-balanced oak-and-brass sky gondolas past singing cliffside wind-harps.'
        }
      ]
    }
  ],

  /**
   * Companion imprint comparison helping readers navigate the wider RaggieSoft library.
   */
  siblingImprints: [
    {
      name: 'RaggieSoft Story Crossroads',
      badge: 'Stewarded by Rowan & Iris Hawthorne',
      description:
        'Standalone interactive novels built from day one around reader-chosen Crossroads routes—marked with Iris’s circular Deep Compass Teal and Warm Brass medallion.',
      href: 'https://crossroads.raggiesoft.com/catalog',
      cta: 'Browse Story Crossroads'
    },
    {
      name: 'Ocean View Archives',
      badge: 'Stewarded by Isabel, Eleanor, Sophia & Oliver',
      description:
        'Interconnected full-length contemporary, sci-fi, and fantasy novels spanning decades of shared history across Virginia, Southern California, and deep space.',
      href: 'https://books.raggiesoft.com',
      cta: 'Visit Ocean View Archives'
    },
    {
      name: 'RaggieSoft Backstage',
      badge: 'Behind-the-Scenes & Alternate Scenarios',
      description:
        'Production notes, character dossiers, and self-contained alternate-scenario stories exploring pivotal moments from our linear Ocean View Archives books.',
      href: 'https://backstage.raggiesoft.com',
      cta: 'Explore Backstage'
    }
  ]
};
