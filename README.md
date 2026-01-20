# React Product Catalog

## Project Description

This project is a Single Page Application built with React for working with a product catalog. It implements a typical e-commerce flow: browsing products, filtering, sorting, and page navigation. The application focuses on predictable state management, clear component structure, and proper handling of UI edge cases.

The project can be used as a learning example, a portfolio project, or a base for further extension into a full-featured commercial application.

## Implemented Features

* Product list display
* Parameter-based filtering with **debounced input handling**
* Sorting (by name, price, etc.)
* Pagination
* State synchronization via **URL search parameters**
* **Skeleton loading** during data fetching
* UI placeholders and edge-case handling:

  * “No products found”
  * Empty filter results
  * 404 page
* **Theme switching (light / dark)** with persistence
* User preferences stored in **localStorage**
* Multilingual support (i18n)
* Responsive layout
* Client-side data caching

## Technologies Used

* **React**
* **TypeScript**
* **React Router**
* **SCSS / CSS Modules**
* **i18next**
* **Swiper**
* **ESLint**
* **Debonced**

## Architectural Decisions

* Filtering and sorting logic is extracted into reusable utility functions
* Debounce is used to reduce unnecessary re-renders and computations
* Theme and language state are persisted in `localStorage` and restored on reload
* Skeleton components are used instead of spinners to provide a more stable UX
* Empty states and error states are implemented as dedicated UI components rather than inline conditional text

## Local Setup

1. Clone the repository:
   git clone <repo-url>

2. Install dependencies:
   npm install

3. Run the project in development mode:
   npm run dev


## Deployment

The project is compatible with GitHub Pages. To ensure correct behavior, configure the `base` option (Vite) or the `homepage` field (CRA) and use relative paths for static assets.

## Notes

* Product data is loaded from static JSON files
* No backend is used; all logic is implemented on the client side
* The architecture allows easy integration of an API or a state management library in the future

## Author

**Artem Yakhno**
