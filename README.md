# Phone Catalog

A responsive online storefront for browsing phones, tablets, and accessories. Built with React and TypeScript, the app includes product catalogs, detailed product pages, favourites, a shopping cart, and Supabase-powered account features.

## Live Preview

[Phone Catalog Demo](https://frontend-i9xqged7v-five-ends.vercel.app)

## Design Reference

[Phone Catalog (Figma)](https://www.figma.com/design/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog--V2--Original?node-id=0-1&p=f&t=4mH0qu1SPI1O13FX-0)

## Technologies Used

**Core**

- React 19 – Component-based interface and interactive product pages
- TypeScript – Typed application logic and product data
- Vite – Development server and production bundling
- Tailwind CSS – Responsive utility-first styling
- React Router – Client-side navigation between catalog, product, cart, and favourites pages
- Zustand – Shared product, cart, rating, and account state

**Services & UI**

- Supabase – Product data, authentication, favourites, and product reviews
- Embla Carousel – Responsive promotional and product carousels
- Radix UI – Accessible interface primitives
- Motion – UI animations

**Deployment & Hosting**

- Vercel – Public hosting and live preview deployment

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/VladyslavL02/Phone_Catalog.git
   cd Phone_Catalog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Vite prints the local URL in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` – Start the local Vite development server
- `npm run build` – Run the TypeScript project build and create a production bundle
- `npm run preview` – Preview the production build locally
- `npm test` – Run the TypeScript check and ESLint

## Features

- **Product catalog:** Browse phones, tablets, and accessories with product cards, images, prices, and specifications.
- **Search, filtering, and sorting:** Find products by model or capacity and sort by price, newest releases, or customer rating. Catalog filters and pagination are reflected in the URL.
- **Product details:** View product images, descriptions, technical specifications, available colors and capacities, and recommended products.
- **Shopping cart:** Add products, change quantities, remove items, and view the item count and total. A checkout form is available from the cart.
- **Favourites:** Save products to a favourites list. Signed-in users can sync their favourites with Supabase.
- **Accounts:** Sign in with Supabase authentication.
- **Product ratings:** Submit product ratings and view aggregated ratings.
- **Responsive storefront:** Adapt the layout, product grids, and carousels to mobile, tablet, and desktop screens.
