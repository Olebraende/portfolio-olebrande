import type { Lang } from './i18n';

export type ProjectStatus = 'live' | 'coming-soon' | 'archived';

type Localized<T> = Record<Lang, T>;

/**
 * One entry per project. To add a project, copy an entry below, give it a unique `slug`
 * and drop the screenshot in `public/pics/`. The card, the detail page at
 * `/prosjekter/<slug>`, the sitemap and the filters all pick it up from here.
 * To remove a project, delete its entry.
 *
 * Only `slug`, `title`, `status`, `description` and `tags` are required. The optional
 * fields (`details`, `highlights`, `role`, `year`) add sections to the detail page.
 */
export type Project = {
  /** URL segment, lower case with dashes. Keep it stable once the page is live. */
  slug: string;
  title: string;
  /**
   * `live`: finished and online. `coming-soon`: badge, no live link, not counted as built.
   * `archived`: built but no longer online (for example a client that closed). Keeps the card
   * and page, hides the live link and explains why.
   */
  status: ProjectStatus;
  /** Short text used on cards and in meta descriptions. */
  description: Localized<string>;
  /** Longer text for the detail page, one string per paragraph. */
  details?: Localized<string[]>;
  highlights?: Localized<string[]>;
  role?: Localized<string>;
  /** Why an `archived` project is offline. Shown on its detail page. */
  archivedReason?: Localized<string>;
  year?: string;
  /** Screenshot in `public/pics/`. Without one, a placeholder is drawn. */
  image?: string;
  imageSize?: [number, number];
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: 'nuvora',
    status: 'live',
    title: 'Nuvora',
    description: {
      no: 'Konsept for et digitalt byrå, bygget for å vise avanserte frontend-teknikker: glassmorphism, scroll-drevne animasjoner og parallax. Alt innhold er fiktivt.',
      en: 'A digital agency concept built to showcase advanced frontend techniques: glassmorphism, scroll-driven animation and parallax. All content is fictional.',
    },
    details: {
      no: [
        'Nuvora er et konseptnettsted for et fiktivt digitalt byrå. Jeg bygde det for å øve på og vise frem avanserte frontend-teknikker. Alt innhold er fiktivt.',
        'Nettstedet har fem sider (forside, om oss, funksjoner, arbeider og kontakt) og er satt sammen av gjenbrukbare komponenter som hero, funksjonskort, showcase, tall som teller opp og et kundesitat.',
        'Effektene er bygget som egne byggeklosser: glassmorfisme-kort, gradienttekst, parallakslag, avsløring når du scroller, fremdriftslinje for scrolling, en glød som følger markøren og jevn scrolling med Lenis.',
      ],
      en: [
        'Nuvora is a concept website for a fictional digital agency. I built it to practise and show off advanced frontend techniques. All content is fictional.',
        'The site has five pages (home, about, features, work and contact) and is composed of reusable components such as a hero, feature cards, a showcase, counting numbers and a customer quote.',
        'The effects are built as separate building blocks: glassmorphism cards, gradient text, parallax layers, reveal on scroll, a scroll progress bar, a glow that follows the cursor and smooth scrolling with Lenis.',
      ],
    },
    highlights: {
      no: [
        'Next.js 16 (App Router), React 19 og TypeScript',
        'Gjenbrukbare effektkomponenter som GlassCard, ParallaxLayer og ScrollReveal',
        'Jevn scrolling med Lenis',
        'Animerte tall, fremdriftslinje og markørglød',
      ],
      en: [
        'Next.js 16 (App Router), React 19 and TypeScript',
        'Reusable effect components such as GlassCard, ParallaxLayer and ScrollReveal',
        'Smooth scrolling with Lenis',
        'Animated numbers, a progress bar and a cursor glow',
      ],
    },
    year: '2026',
    image: '/pics/nuvora.png',
    imageSize: [3020, 1494],
    liveUrl: 'https://nuvora-phi.vercel.app/',
    githubUrl: 'https://github.com/Olebraende/nuvora',
    tags: ['nextjs', 'typescript', 'animation', 'ui-ux'],
  },
  {
    slug: 'voldatunnelen',
    status: 'live',
    title: 'Voldatunnelen',
    description: {
      no: 'Informasjonsside om Voldatunnelen på E39, med oppdatert informasjon om tunnelen, vegstrekningen og prosjektstatus til lokalmiljøet og de reisende.',
      en: 'An information site about the Voldatunnelen on E39, giving the community and travellers up-to-date information on the tunnel, the road and project status.',
    },
    details: {
      no: [
        'Voldatunnelen er en uoffisiell informasjonsside om E39 Voldatunnelen mellom Volda og Furene. Siden samler fakta, kart og nyheter om tunnelprosjektet, som skal gi bedre trafikksikkerhet og frigjøre sentrum i Volda.',
        'Jeg bygde siden i React med Vite og React Router. Kartet er laget med Leaflet, og siden har eget galleri, tidslinje, nyhetsseksjon og en side om selve prosjektet.',
      ],
      en: [
        'Voldatunnelen is an unofficial information site about the E39 Voldatunnelen between Volda and Furene. It gathers facts, a map and news about the tunnel project, which aims to improve road safety and free up the centre of Volda.',
        'I built the site in React with Vite and React Router. The map is made with Leaflet, and the site has its own gallery, timeline, news section and a page about the project itself.',
      ],
    },
    highlights: {
      no: [
        'Interaktivt kart med Leaflet',
        'Tidslinje, galleri og nyheter',
        'Måling med Vercel Analytics og Speed Insights, bak samtykkebanner',
      ],
      en: [
        'Interactive map with Leaflet',
        'Timeline, gallery and news',
        'Measured with Vercel Analytics and Speed Insights, behind a consent banner',
      ],
    },
    year: '2026',
    image: '/pics/voldatunnelen.png',
    imageSize: [1820, 1240],
    liveUrl: 'https://www.voldatunnelen.no/',
    tags: ['react', 'javascript', 'responsive'],
  },
  {
    slug: 'kroensji',
    status: 'archived',
    title: 'Krønsji',
    description: {
      no: 'Nettside for restauranten Krønsji med meny, ingredienser, allergener og konsept, i et design som speiler den sprø opplevelsen.',
      en: 'Website for the restaurant Krønsji with menu, ingredients, allergens and concept, in a design that reflects the crispy experience.',
    },
    archivedReason: {
      no: 'Nettsiden er tatt ned fordi restauranten har lagt ned driften.',
      en: 'The website has been taken down because the restaurant has closed.',
    },
    image: '/pics/kroensji.png',
    imageSize: [1897, 1075],
    tags: ['javascript', 'responsive', 'ui-ux'],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** The three highlighted on the front page: the first projects in the list that are not coming soon. */
export const featuredProjects = projects.filter((p) => p.status !== 'coming-soon').slice(0, 3);

/** Projects that have been built, online or not. */
export const builtProjectCount = projects.filter((p) => p.status !== 'coming-soon').length;

/** Neighbours in list order, wrapping around, for the previous/next links. */
export function getNeighbours(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
