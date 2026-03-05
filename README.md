# Books Catalog

A full-featured online bookstore where users can browse, search, and purchase books in three formats — Paperback, Kindle, and Audiobook. Includes real payment processing (Stripe & LiqPay), multilingual support (English / Ukrainian), dark mode, and cinematic GSAP animations.

## Live Preview

**[Books Catalog — Live Demo](https://online-store-2026.github.io/books-catalog-frontend/)**

## Technologies Used

- **React 19** with **TypeScript 5.9**
- **Vite 7** — build tool with HMR
- **Tailwind CSS 4** + **shadcn/ui** + **Radix UI** — styling & component primitives
- **React Router 7** — client-side routing with lazy-loaded code-splitting
- **TanStack React Query 5** — server state management and caching
- **React Context** — app-wide state (auth, cart, favorites, currency, theme)
- **Firebase** — Auth, Firestore, Cloud Functions
- **Stripe Elements** & **LiqPay** — payment processing
- **@react-pdf/renderer** — downloadable PDF invoices
- **i18next** — internationalization (English / Ukrainian)
- **GSAP + ScrollTrigger** & **Lottie** — animations
- **React Hook Form + Zod** — form handling and validation
- **Embla Carousel**, **cmdk**, **Lucide icons**, **react-loading-skeleton** — UI components
- **ESLint**, **Prettier**, **Husky + lint-staged** — code quality
- **GitHub Pages** via **GitHub Actions** — deployment

## Getting Started

Clone the repository:

```bash
git clone https://github.com/online-store-2026/books-catalog-frontend.git
cd books-catalog-frontend
```

Install dependencies:

```bash
npm install
```

Run the project locally:

```bash
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Available Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start dev server (hot reload)  |
| `npm run build`     | Type-check and build for prod  |
| `npm run preview`   | Serve production build locally |
| `npm run lint`      | Lint and auto-fix with ESLint  |
| `npm run format`    | Format with Prettier           |
| `npm run fix-style` | Run both format and lint       |

## Features

- **Catalog with advanced filtering** — multi-field filtering (language, format, category) and dynamic sorting
- **Global search** — debounced search with results grouped by authors, publishers, and titles
- **Full checkout flow** — multi-step delivery form with Stripe or LiqPay payment
- **PDF invoices** — downloadable invoice generation
- **Order tracking** — order history with Telegram bot deep-link integration
- **Cart & Favorites** — persistent via localStorage with currency conversion (USD/UAH)
- **Animations** — GSAP hero reveal, ScrollTrigger section entrances, staggered 3D card transitions, fly-to-target effects
- **Authentication** — Firebase Auth with email/password and Google sign-in
- **Multilingual** — English and Ukrainian across 12+ translation namespaces
- **Dark mode** — flash-free theme toggle with localStorage persistence
- **Responsive** — mobile-first layout with 4/12/24-column CSS Grid system
- **Performance** — lazy-loaded routes, code-splitting, skeleton loading states, Lottie page loader

## Author

**Artem Stadnik** — [GitHub](https://github.com/artemstadnik) · [LinkedIn](https://linkedin.com/in/artem-stadnik/)
