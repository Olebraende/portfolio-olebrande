# olebrande.no

Personal portfolio for Ole Mathias Brænde. Built with Next.js (App Router), React 19 and TypeScript, statically generated and bilingual (Norwegian at `/`, English at `/en`).

## Highlights

- **Performance:** pre-rendered pages, no animation libraries, optimised images (AVIF/WebP) and self-hosted fonts through `geist`. Lighthouse measured 100 in all four categories on the Vercel deployment.
- **Accessibility:** semantic HTML, keyboard navigation, skip link, visible focus states, AA+ contrast, a form that never relies on colour alone, and full support for `prefers-reduced-motion`.
- **SEO:** per-page metadata, canonical and `hreflang` alternates, sitemap, robots, JSON-LD (Person and WebSite) and generated share images. Anything not served from `olebrande.no` sends `noindex`.
- **Motion:** CSS only (scroll-driven animations, `@property` counters, view transitions, a marquee and a cursor glow), no JavaScript animation libraries.
- **Contact form:** posts to a Next.js route handler that sends mail through Resend, with a honeypot, validation and basic rate limiting. The email address is rendered to a canvas to keep scrapers out.

## Tech stack

Next.js 16, React 19, TypeScript (strict), CSS Modules, `geist` fonts, `simple-icons` (rendered on the server, so no client JavaScript), Resend, hosted on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

Requires Node.js 20.9 or newer.

## Structure

```text
app/[lang]/          Pages (home, prosjekter, project detail, kontakt), 404 and share image, per language
app/api/contact/     Contact form endpoint (Resend)
app/icon.svg         Favicon (apple-icon.tsx generates the touch icon)
components/          UI components, each with a co-located CSS module
dictionaries/        Norwegian and English copy (no.ts is the source of the types)
lib/                 Site constants, i18n helpers and project data
vercel.json          Pins the framework to Next.js
legacy/              The original static version of the site
```

### Language routing

Both languages are served from `app/[lang]`. Norwegian URLs stay unprefixed through rewrites in `next.config.ts` (`/` is served from `/no`), `/no/*` redirects to the unprefixed path, and English lives under `/en`. The language switcher keeps the scroll position, navigation to other pages scrolls to the top.

### Content

- Copy lives in `dictionaries/no.ts` and `dictionaries/en.ts`. Keep both in sync, the English file is typed against the Norwegian one.
- Projects live in `lib/projects.ts`, see [Projects](#projects).
- Work experience and the other sections are driven by the dictionaries as well.

## Projects

Every project is one entry in `lib/projects.ts`. The card, the detail page at `/prosjekter/<slug>`, the filters, the sitemap and the structured data are all generated from it.

**Add a project:** copy an entry, give it a unique `slug`, and add a screenshot to `public/pics/` (optional, a placeholder is drawn without one).

```ts
{
  slug: 'my-project',
  title: 'My project',
  status: 'live',               // or 'coming-soon' or 'archived'
  description: { no: '...', en: '...' },
  details: { no: ['Paragraph one', 'Paragraph two'], en: ['...', '...'] },  // optional
  highlights: { no: ['...'], en: ['...'] },                                  // optional
  role: { no: 'Utvikler', en: 'Developer' },                                 // optional
  year: '2026',                                                              // optional
  image: '/pics/my-project.png',
  imageSize: [1920, 1080],
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/...',
  tags: ['nextjs', 'typescript'],
},
```

Tags shown to visitors are translated in `dictionaries/` under `projects.tags`, add a label there for any new tag.

**Coming soon:** set `status: 'coming-soon'`. The card gets a badge, the live link is hidden and the project does not count towards the number of finished projects on the front page.

**Archived:** set `status: 'archived'` for a project that was built but is no longer online (for example a client that closed). Remove its `liveUrl` and optionally add `archivedReason` (translated). The card and page stay, with an "Archived" badge and a note.

**Remove a project:** delete its entry. Keep slugs stable once a page is live, or add a redirect in `next.config.ts` so old links keep working.

## Environment variables

Set these in Vercel under Settings, Environment Variables (Production and Preview). For local testing, put them in `.env.local`, which git ignores.

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required for the contact form to deliver mail |
| `CONTACT_TO` | Recipient. Without a verified domain in Resend this must be the address the Resend account was registered with |
| `CONTACT_FROM` | Optional sender, for example `Portfolio <kontakt@olebrande.no>`. Needs a domain verified in Resend |

Without `RESEND_API_KEY` the form shows its error state.

## Deployment

Pushing to `main` deploys to production at `olebrande.no` on Vercel. Other branches get preview deployments. `www.olebrande.no` redirects to `olebrande.no`, DNS is managed at the domain registrar.

Deployments that are not served from `olebrande.no` or `www.olebrande.no` (for example `*.vercel.app`) send `X-Robots-Tag: noindex, nofollow`, configured in `next.config.ts`.

## Privacy

Google Analytics only loads after the visitor accepts the consent banner. The choice is stored in `localStorage` and nothing is set before consent.
