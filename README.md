# 📱 Nice Gadgets — Phone Catalog

A responsive e-commerce catalog for phones, tablets, and accessories built with React + TypeScript.

**[Live Demo](https://serhiy23471.github.io/react_phone-catalog/)**

---

## 📋 About the Project

Nice Gadgets is a single-page application that allows users to browse a catalog of Apple devices, view product details, manage a shopping cart, and save favorites. The project was built as part of a frontend development course and implements all required features from the specification.

---

## ✅ Features (per specification)

- **Home page** — banner slider, "Brand new models" and "Hot prices" product sliders, shop by category section
- **Catalog pages** — phones, tablets, accessories with sorting (newest, alphabetically, cheapest), pagination, and items-per-page control
- **Product details page** — image gallery with thumbnail navigation, color and capacity selectors, tech specs, "You may also like" slider
- **Cart** — add/remove items, update quantity, total price calculation, persisted in `localStorage`
- **Favorites** — toggle favorites, persisted in `localStorage`
- **Search** — debounced search with URL query params on catalog and favorites pages
- **Dark theme** — full dark mode toggle, persisted in `localStorage`
- **Responsive design** — mobile (320px), tablet (640px), desktop (1200px)
- **404 page** — not found page for unknown routes
- **Swipe gestures** — touch swipe support on sliders and product image gallery

---

## ✨ Extra Features

### Skeleton loading
Instead of a plain spinner, all loading states use skeleton screens that mirror the actual layout:
- `ProductCardSkeleton` — matches `ProductCard` structure
- `ProductDetailsSkeleton` — full page skeleton for the product details page including gallery, options, about, and tech specs sections
- `ProductsSlider` — shows skeleton cards while loading
- `ShopByCategory` — skeleton counts while category data loads

### Toast notifications
Subtle macOS-style pill notifications appear when users interact with cart and favorites:
- "Added to cart" on add to cart
- "Added to favorites" / "Removed from favorites" on toggle
- Auto-dismiss after 3 seconds
- Color-coded dot indicator (green for success, red for error)
- Dark theme support via CSS variables

### Page transitions
Smooth fade-in + slide-up animation when navigating between pages. Header and footer remain stable — only the main content area animates.

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Language | TypeScript |
| Routing | React Router v6 |
| Styling | SCSS Modules |
| State | React Context API |
| Build tool | Vite |
| Linting | ESLint |
| Testing | Cypress |
| Deploy | GitHub Pages |

---

## 📁 Project Structure

```
src/
├── api/              # fetch functions (products, phones, tablets, accessories)
├── context/          # CartContext, FavoritesContext, ThemeContext, ToastContext
├── hooks/            # useCatalog, useDebounce, useSwipe, useWindowWidth
├── modules/
│   ├── HomePage/
│   ├── PhonesPage/
│   ├── TabletsPage/
│   ├── AccessoriesPage/
│   ├── ProductDetailsPage/
│   ├── FavoritesPage/
│   ├── CartPage/
│   ├── NotFoundPage/
│   └── shared/       # Header, Footer, ProductCard, ProductsSlider, BannerSlider,
│                     # Loader, Skeleton, ProductCardSkeleton, ProductDetailsSkeleton,
│                     # ShopByCategory, CatalogPage, Breadcrumbs, Pagination,
│                     # Dropdown, SearchInput, ErrorState, ScrollToTop, ToastContainer
├── styles/           # _variables, _mixins, _reset, _typography, _layout
├── types/            # TypeScript interfaces
└── utils/            # colors.ts (COLOR_MAP for product color swatches)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/KazymyrYan/react_phone-catalog.git
cd react_phone-catalog
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm test
```

---

## 📐 Design

The project is based on a Figma mockup with three breakpoints:

| Breakpoint | Width |
|------------|-------|
| Mobile | 320px – 639px |
| Tablet | 640px – 1199px |
| Desktop | 1200px+ |

---

## 🗂 API

Data is served from static JSON files in `/public/api/`:
- `products.json` — all products (used for catalog, sliders, suggested)
- `phones.json` — detailed phone data
- `tablets.json` — detailed tablet data
- `accessories.json` — detailed accessories data