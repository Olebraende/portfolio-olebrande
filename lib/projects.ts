import type { Lang } from './i18n';

export type Project = {
  id: string;
  title: string;
  description: Record<Lang, string>;
  image: string;
  imageSize: [number, number];
  liveUrl: string;
  githubUrl?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'nuvora',
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
    id: 'voldatunnelen',
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
    id: 'kroensji',
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
    id: 'flyt',
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
    id: 'fjell-kino',
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
    id: 'adventskalender',
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
    id: 'pong',
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

/** The three highlighted on the front page. */
export const featuredProjects = projects.slice(0, 3);
