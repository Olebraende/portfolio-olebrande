# olebrande.no

Portfolio built with Next.js (App Router), React 19 and TypeScript. Statically generated, bilingual (Norwegian at `/`, English at `/en`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Structure

```
app/[lang]/        Pages (home, prosjekter, tjenester, kontakt) rendered per language
app/api/contact/   Contact form endpoint (Resend)
components/        UI components, each with a co-located CSS module
dictionaries/      Norwegian and English copy
lib/               Site constants, i18n helpers, project data
```

Norwegian URLs stay unprefixed through rewrites in `next.config.ts`; `/no/*` redirects to the unprefixed path.

## Environment variables (Vercel)

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required for the contact form to deliver mail |
| `CONTACT_TO` | Optional recipient override |
| `CONTACT_FROM` | Optional sender, must be a domain verified in Resend |

## Notes

- Animations are CSS only (scroll-driven animations, `@property` counters, view transitions) and respect `prefers-reduced-motion`.
- Google Analytics only loads after the visitor accepts.
- `legacy/` holds the original static version.
