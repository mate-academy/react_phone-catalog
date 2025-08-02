# 📦 Product Catalog

A responsive and feature-rich product catalog application built with **React** (with **Typescript**), featuring shopping cart and favorites functionality and smooth animations. The project supports sorting, pagination, and detailed product views, all styled with SCSS modules and structured using advanced modular architecture.

## 🔗 Demo

Check out the live demo here: [Link](https://fromjkeee16.github.io/product_catalog/)

## 🛠 Stack

- **React** with **TypeScript**
- **React Select** for dropdown component
- **i18n** for language switching
- **React Swiper** for slider components
- **Sonner** for notifications
- **Redux Toolkit** for state management
- **React Router** for navigation
- **SCSS Modules** for styling
- **CSS variables** for theme switching

## 📄 Features

### 🏠 Home Page (`/`)

- Hero image slider with automatic rotation and manual controls
- Product sliders:
  - **Hot Prices** (products with highest discount)
  - **Brand New Models** (newest expensive products)
- Shop by Category: links to Phones, Tablets, Accessories

### 📱 Catalog Pages (`/phones`, `/tablets`, `/accessories`)

- Load products dynamically by category
- Sorting: Newest, Alphabetically, Cheapest
- Pagination with URL parameters
- Items per page selection
- Real-time search with debouncing
- Error and empty states handled gracefully
- Loader while fetching data

### 🛒 Cart Page (`/cart`)

- Add/remove products
- Modify quantity
- Real-time total calculation
- Cart state persisted in `localStorage`
- Checkout simulation with confirmation modal

### ❤️ Favorites Page (`/favorites`)

- Add/remove favorite items with heart button
- Favorites state persisted in `localStorage`

### 📄 Product Details (`/product/:productId`)

- Dynamic detail rendering based on ID
- Image gallery with selectable thumbnails
- Tech specs and description
- Breadcrumbs and Back button
- Suggested products carousel

### 🧭 Navigation & UI

- Sticky header with navigation, settings menu, cart and favorites counters
- Smooth hover transitions and image scaling
- Main accent-colored outlines on focus-visible elements
- Dark & light themes
- Responsive layout
- Custom 404 page (`/not-found`)
- Footer with GitHub link and Back-to-top button
