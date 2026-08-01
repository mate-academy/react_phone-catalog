# Nice Gadgets — React Product Catalog

An e-commerce front end for a gadget store: 194 phones, tablets and accessories with
search, sorting, pagination, a product details page, a cart and a favourites list.
Built with React, TypeScript and SCSS modules — no UI kit, no state library, every
component written from scratch against the Figma design.

**[Live demo →](https://maksbtw.github.io/react_phone-catalog/)**

## Features

- Category pages with search, sorting and pagination — all kept in the URL
  (`?sort=price&page=2&perPage=8&query=iphone`), so a view survives a reload and can
  be shared.
- Product details page with an image gallery, tech specs, colour and capacity
  pickers that switch to the matching variant, and a "You may also like" block.
- Cart and favourites with live totals, header counters and `localStorage`
  persistence.
- Light and dark theme, following the system preference by default.
- English and Ukrainian interface, including correct Ukrainian plural forms.
- Responsive from 320px up, with skeleton loaders, error states and
  keyboard-accessible controls.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18, React Router 6 (`HashRouter`) |
| Language | TypeScript (strict) |
| Styles | SCSS modules, custom properties for theming |
| State | React Context + a `useLocalStorage` hook |
| Build | Vite 5 |
| Quality | ESLint (Airbnb + a11y), Stylelint, Prettier, Cypress |
| CI/CD | GitHub Actions → GitHub Pages |

No component library and no Redux — the cart, favourites, theme and language each
live in a small context whose value is memoised, which is all a catalog of this size
needs.

## Architecture

The app is split by feature, not by file type. Each page is a module that owns its
own components, constants and helpers; anything used by two modules moves down into
`shared`.

```
src/
├── App.tsx              # layout: header, routed outlet, footer
├── index.tsx            # router and context providers
└── modules/
    ├── <Page>/          # one module per page
    │   ├── components/  # components used only by this page
    │   ├── constants.ts
    │   └── utils.ts
    └── shared/          # everything used by more than one page
        ├── api/         # data fetching and product selectors
        ├── components/  # header, footer, product card, ...
        ├── context/     # cart, favourites, theme, language
        ├── hooks/       # useLocalStorage, useDebounce
        ├── i18n/        # UI text in English and Ukrainian
        ├── styles/      # variables, mixins
        └── types/
```

Every component is a folder with `Component.tsx`, `Component.module.scss` and an
`index.ts` barrel. Path aliases (`@`, `@modules`, `@shared`) keep imports flat.

Product data is served as static JSON from `public/api`, so the API layer is a thin
module of `fetch` calls plus the selectors on top of it.

## Getting started

Requires Node.js 20+.

```bash
git clone https://github.com/maksbtw/react_phone-catalog.git
cd react_phone-catalog
npm install
npm start
```

The dev server prints its URL in the terminal and opens it in the browser.

### Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm test` | Run the Cypress end-to-end suite |
| `npm run lint` | Stylelint + Prettier + ESLint over the whole source |
| `npm run deploy` | Manual deploy to GitHub Pages |

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to the
`gh-pages` branch. The app uses `HashRouter` so deep links work on Pages' static
hosting without a rewrite rule.

## Credits

Built by [Maksym Savchenko](https://github.com/maksbtw) from the
[Phone catalog (V2)](https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original)
Figma design, as a project for [Mate Academy](https://mate.academy/).
Product data and images are provided with the original task.
