import type { Lang } from './i18n';

export type ProjectStatus = 'live' | 'coming-soon';

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
  /** `coming-soon` shows a badge, hides the live link and keeps the page out of "live" counts. */
  status: ProjectStatus;
  /** Short text used on cards and in meta descriptions. */
  description: Localized<string>;
  /** Longer text for the detail page, one string per paragraph. */
  details?: Localized<string[]>;
  highlights?: Localized<string[]>;
  role?: Localized<string>;
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
    image: '/pics/voldatunnelen.png',
    imageSize: [1820, 1240],
    liveUrl: 'https://www.voldatunnelen.no/',
    tags: ['react', 'typescript', 'responsive'],
  },
  {
    slug: 'kroensji',
    status: 'live',
    title: 'Krønsji',
    description: {
      no: 'Nettside for restauranten Krønsji med meny, ingredienser, allergener og konsept, i et design som speiler den sprø opplevelsen.',
      en: 'Website for the restaurant Krønsji with menu, ingredients, allergens and concept, in a design that reflects the crispy experience.',
    },
    image: '/pics/kroensji.png',
    imageSize: [1897, 1075],
    liveUrl: 'https://krønsji.no',
    tags: ['javascript', 'responsive', 'ui-ux'],
  },
  {
    slug: 'flyt',
    status: 'live',
    title: 'Flyt',
    description: {
      no: 'Oppgavebehandling med visuell Kanban-tavle: dra-og-slipp, tidsregistrering, prioriteringer og søk. Flerspråklig, og dataene lagres lokalt.',
      en: 'Task management with a visual Kanban board: drag and drop, time tracking, priorities and search. Multilingual, with data stored locally.',
    },
    image: '/pics/flyt-todo.png',
    imageSize: [2555, 1274],
    liveUrl: 'https://flyt-todo.netlify.app/',
    githubUrl: 'https://github.com/Olebraende/todo',
    tags: ['react', 'responsive', 'ui-ux'],
  },
  {
    slug: 'fjell-kino',
    status: 'live',
    title: 'Fjell Kino',
    description: {
      no: 'Filmoversikt for et fiktivt kinoselskap, bygget i React med fokus på tilgjengelighet: bla i filmer, se kommende titler og bestill billetter.',
      en: 'Movie overview for a fictional cinema, built in React with an accessibility focus: browse films, see upcoming titles and book tickets.',
    },
    image: '/pics/fjell-kino.png',
    imageSize: [2551, 1431],
    liveUrl: 'https://olem-kodehode4.github.io/Fjell-Kino/',
    tags: ['react', 'responsive', 'accessibility', 'api'],
  },
  {
    slug: 'adventskalender',
    status: 'live',
    title: 'Adventskalender',
    description: {
      no: 'Interaktiv adventskalender i HTML, CSS og JavaScript. Hver dag åpnes en ny luke med overraskelser og aktiviteter.',
      en: 'An interactive advent calendar in HTML, CSS and JavaScript. Each day opens a new door with surprises and activities.',
    },
    image: '/pics/calendar.png',
    imageSize: [1920, 1080],
    liveUrl: 'https://olem-kodehode4.github.io/juleoppgave/',
    tags: ['javascript'],
  },
  {
    slug: 'pong',
    status: 'live',
    title: 'Pong',
    description: {
      no: 'Klassisk pong i HTML, CSS og JavaScript. Viser grunnleggende spillmekanikk og canvas-animasjon.',
      en: 'Classic pong in HTML, CSS and JavaScript. Demonstrates basic game mechanics and canvas animation.',
    },
    image: '/pics/pong-game.png',
    imageSize: [1920, 1080],
    liveUrl: 'https://olebraende.github.io/Pong-Game/',
    tags: ['javascript'],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** The three highlighted on the front page: the first live projects in the list above. */
export const featuredProjects = projects.filter((p) => p.status === 'live').slice(0, 3);

/** Neighbours in list order, wrapping around, for the previous/next links. */
export function getNeighbours(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
