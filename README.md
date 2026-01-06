# Brænde-DEV Portfolio

Modern, responsive portfolio website built with React + Vite showcasing web development services and projects.

## 🚀 Features

- **Bilingual Support** (Norwegian/English) with persistent language selection
- **Responsive Design** - Optimized for all devices (360px - 1920px+)
- **Project Filtering** - Filter projects by technology (React, Vanilla JS, Design)
- **Contact Form** - Netlify Forms integration (no backend needed)
- **Scroll Animations** - Smooth fade-in effects with Intersection Observer
- **SEO Optimized** - Dynamic meta tags for all routes
- **Accessibility** - WCAG AA compliant, keyboard navigation, screen reader support
- **Performance** - Lazy loading, code splitting, optimized bundle

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** CSS Modules with custom design system
- **Deployment:** Netlify
- **Forms:** Netlify Forms

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Navigation, Footer, Container)
│   ├── sections/        # Page sections (Hero, About, Skills, Projects)
│   └── ui/              # Reusable UI components (ProjectCard, Toast)
├── context/             # React Context (Language/i18n)
├── data/                # Static data (projects)
├── hooks/               # Custom React hooks
├── locales/             # Translation files (no.js, en.js)
├── pages/               # Route pages (Home, Tjenester, Kontakt)
├── styles/              # CSS (globals + modules)
└── utils/               # Helper functions
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in `/dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Connect repository to Netlify
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy!

Forms will automatically be detected and enabled.

## 🎨 Customization

### Update Content

- **Projects:** Edit `src/data/projects.js`
- **Translations:** Edit `src/locales/no.js` and `src/locales/en.js`
- **Colors:** Update CSS variables in `src/styles/globals.css`

### Add New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Navigation.jsx`
4. Add translations in `src/locales/`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML5
- ARIA labels where appropriate
- Keyboard navigation support
- Focus visible styles
- Respects `prefers-reduced-motion`
- Color contrast WCAG AA compliant

## 👤 Author

**Ole Mathias Brænde**
- GitHub: [@Olebraende](https://github.com/Olebraende)
- LinkedIn: [Ole Brænde](https://www.linkedin.com/in/olebrande/)
- Email: olembrande.work@gmail.com
- Website: olebrande.no