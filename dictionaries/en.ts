import type { Dictionary } from './no';

export const en: Dictionary = {
  meta: {
    homeTitle: 'Ole Mathias Brænde, frontend developer | Next.js, React and TypeScript',
    homeDescription:
      'Frontend developer building fast, accessible and search-friendly websites with Next.js, React and TypeScript. See projects and get in touch.',
    projectsTitle: 'Projects',
    projectsDescription:
      'A selection of websites and apps I have built with React, Next.js and TypeScript, from restaurant sites to task management.',
    contactTitle: 'Contact',
    contactDescription:
      'Got a project or an idea? Send me a message and we will talk about what you need.',
    notFoundTitle: 'Page not found',
  },
  common: {
    skip: 'Skip to main content',
    home: 'Home',
    menu: 'Menu',
    closeMenu: 'Close menu',
    switchLang: 'Bytt til norsk',
    langShort: 'NO',
    primaryNav: 'Main navigation',
    viewLive: 'View live',
    viewCode: 'Code',
    opensNew: '(opens in a new tab)',
    backHome: 'Back to the front page',
  },
  nav: {
    projects: 'Projects',
    contact: 'Contact',
    cta: 'Get in touch',
  },
  hero: {
    status: 'Open to work',
    greeting: "Hi, I'm Ole Mathias Brænde",
    titleLines: ['Frontend that is fast,', 'accessible and built', 'to last.'],
    description:
      'I am a frontend developer who cares about getting the details right: performance you can feel, accessibility from the first line, and code that is easy to build on.',
    ctaProjects: 'See the projects',
    ctaContact: "Let's talk",
    scroll: 'Scroll down',
    stats: {
      projects: 'projects built',
      months: 'months of experience',
      lighthouse: 'Lighthouse: a11y, SEO & best practices',
    },
  },
  stack: {
    label: 'The toolbox',
  },
  about: {
    eyebrow: 'About me',
    title: "I started in September 2024, and haven't let go of the keyboard since.",
    paragraphs: [
      'What pulls me towards web development is that everything connects: design, performance, accessibility and code. I like digging into why a page feels slow, and fixing it properly, not with a shortcut.',
      'I build with Next.js, React and TypeScript, and I measure what I make: Core Web Vitals, WCAG and structured data are part of the job, not an afterthought.',
      'I learn fast, enjoy sharing knowledge, and do my best work on teams where people care about shipping something they are proud of.',
    ],
    facts: [
      { label: 'Focus', value: 'Frontend & performance' },
      { label: 'Stack', value: 'Next.js · React · TypeScript' },
      { label: 'Base', value: 'Norway' },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: "Where I've worked.",
    linkedin: 'See the full profile on LinkedIn',
    current: 'Current',
    items: [
      {
        role: 'Instructor, Kodehode',
        company: 'JobLoop',
        type: 'Part-time',
        period: 'Aug 2026 to present',
        location: 'Ørsta',
        current: true,
      },
      {
        role: 'Junior IT Consultant (internship)',
        company: 'NCMC AS',
        type: 'Internship',
        period: 'May 2025 to Jan 2026',
        location: 'Hareid, hybrid',
        current: false,
      },
    ],
  },
  principles: {
    eyebrow: 'How I work',
    title: "Four things I don't compromise on.",
    items: [
      {
        title: 'Performance',
        text: 'Pre-rendered HTML, minimal JavaScript and optimised images. The goal is green on every Core Web Vital, on a real phone, not just on a dev machine.',
      },
      {
        title: 'Accessibility',
        text: 'Semantic HTML, keyboard navigation, proper contrast and respect for reduced motion. Websites should work for everyone.',
      },
      {
        title: 'Search visibility',
        text: 'Correct metadata, structured data, sitemap and language alternates, so Google understands your site as well as visitors do.',
      },
      {
        title: 'Clean craft',
        text: 'Strict TypeScript, clear structure and code other developers actually want to open. It makes the site cheaper to maintain.',
      },
    ],
  },
  projects: {
    eyebrow: 'Selected projects',
    title: "Things I've built.",
    viewAll: 'See all projects',
    pageTitle: 'Projects',
    pageSubtitle: 'Everything I have built, from finished sites to experiments.',
    filterLabel: 'Filter by technology',
    filterAll: 'All',
    empty: 'No projects in this category yet.',
    tags: {
      react: 'React',
      nextjs: 'Next.js',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      'ui-ux': 'UI/UX',
      animation: 'Animation',
      responsive: 'Responsive',
      accessibility: 'Accessibility',
      api: 'API',
    },
  },
  building: {
    badge: 'Currently building',
    title: 'Several client projects',
    text: 'Alongside my own projects, I am building websites for several independent clients right now. More of them will show up here once they have launched.',
  },
  cta: {
    title: 'Need a hand with something?',
    text: 'Got an idea, a project or a question about websites? Get in touch and we will have a chat.',
    button: 'Get in touch',
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's make something good together.",
    subtitle: 'Send a message and I will reply as soon as I can.',
    formTitle: 'Send a message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending …',
    successTitle: 'Message sent!',
    success: 'Thanks for getting in touch. I will reply as soon as I can.',
    sendAnother: 'Send another message',
    error: 'Something went wrong. Try again, or copy the email address and write directly.',
    infoTitle: 'Other ways in',
    emailLabel: 'Email',
    emailImageAlt: 'Email address, shown as an image to prevent spam. Use the copy button.',
    copyEmail: 'Copy email address',
    emailCopied: 'Email address copied',
    required: 'All fields are required',
  },
  footer: {
    title: 'Built with care in Norway.',
    text: 'I started with frontend in September 2024, driven by curiosity. Since then I have built more and more, and learned something new every single week.',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
    social: 'Social media',
  },
  notFound: {
    title: '404',
    text: 'The page you are looking for does not exist, or it has moved.',
  },
  consent: {
    title: 'Cookies',
    message:
      'I use Google Analytics to understand how the site is used. It only loads if you accept.',
    accept: 'Accept',
    decline: 'Decline',
  },
};
