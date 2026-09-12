# Nice Gadgets — Phone Catalog

An online store catalog for phones, tablets and accessories, built with React and TypeScript. Users can browse products by category, filter, sort and paginate the catalog, view detailed product pages, and manage a shopping cart and a favorites list.

## Live demo

- [Demo](https://proninamariia.github.io/react_phone-catalog/)
- [Mockup (Figma)](https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original)

## Technologies used

- React + TypeScript
- React Router
- Sass (CSS Modules)
- Bulma
- Font Awesome
- Vite

## Core features

- Home page with an image slider, category links, and "Hot prices" / "Brand new" product sliders
- Separate catalog pages for Phones, Tablets and Accessories with sorting, pagination and items-per-page controls
- Product details page with color/capacity selection, image gallery, breadcrumbs and related products
- Shopping cart with quantity controls, persisted in `localStorage`
- Favorites list, persisted in `localStorage`
- Responsive layout with a mobile navigation menu
- Not found page for unknown routes

## Setup instructions

```bash
npm install
npm start       # local dev server
npm run build   # production build
npm run deploy  # deploy to GitHub Pages
```
