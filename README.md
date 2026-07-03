# Gadgets - Responsive Phone & Tablet Catalog

A premium, feature-rich, and fully responsive product catalog web application for modern gadgets (phones, tablets, and accessories). Built with React, TypeScript, and Vite, featuring an interactive shopping cart, favorites management, dark/light theme options, multi-language localization (i18n), and live URL sync for sorting and pagination.

## 🚀 Live Demo

Check out the live application here:  
**[Gadgets Live Demo](https://xapg6acc.github.io/react_phone-catalog/)**

---

## ✨ Features

- **Dynamic Homepage**: Includes a custom auto-sliding promotional banner (5s intervals), a "Hot prices" section, category navigation, and a "Brand new" gadgets section.
- **Product Listing & Filtering**: 
  - Individual pages for **Phones**, **Tablets**, and **Accessories**.
  - Advanced sorting (by Newest, Alphabetical order, and Cheapest).
  - Customizable pagination controls (4, 8, 16, or all items per page).
  - Real-time debounced product search.
  - Full state synchronization with URL query parameters for shareable search/filtering results.
- **Product Details Page**:
  - Interactive photo gallery with preview switcher.
  - Capacity and color selectors.
  - Comprehensive technical specifications and descriptions.
  - "You may also like" product suggestions section.
  - Breadcrumbs and browser-history-friendly navigation.
- **Shopping Cart**:
  - Add/remove items with automatic total item and price calculation.
  - Persistent storage using browser LocalStorage.
  - Custom checkout confirmation modal to process orders.
- **Favorites Page**: Bookmark favorite gadgets with persistent local storage.
- **Interactive UI/UX**:
  - Dynamic **Light & Dark Mode** switching.
  - **Multi-language Support (i18n)** for internationalization.
  - Premium micro-interactions, smooth hover transitions, and skeleton loading states.

---

## 🛠️ Technologies & Tools

- **Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Styling**: [Bulma CSS](https://bulma.io/), [Sass (SCSS Modules)](https://sass-lang.com/), [FontAwesome](https://fontawesome.com/)
- **State & Routing**: [React Router v6](https://reactrouter.com/) (using HashRouter), React Context API
- **Internationalization**: [i18next](https://www.i18next.com/) & `react-i18next`
- **Testing**: [Cypress](https://www.cypress.io/)
- **Code Quality**: ESLint, Prettier, Stylelint, Husky

---

## 💻 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 20 or higher is recommended) and `npm`.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xapg6acc/react_phone-catalog.git
   cd react_phone-catalog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   *Note: This starts the Vite local server. You can view the app at `http://localhost:5173` (or the port specified in terminal).*

### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production in the `dist` folder.
- `npm test`: Runs automated Cypress end-to-end tests.
- `npm run lint`: Formats, lints code (JS/TS), and lints styling (SCSS).
- `npm run format`: Prettifies the TypeScript and TSX source files.

---

## 📁 Repository Structure

```
├── cypress/               # Cypress End-to-End test suites
├── public/                # Static assets (images, product mock APIs)
└── src/                   # Source code
    ├── components/        # Reusable UI components (Header, Footer, ProductCard, etc.)
    ├── context/           # React Context providers (Theme, Cart, Favorites, Language)
    ├── locales/           # i18n localization translation JSON files
    ├── pages/             # Page components (HomePage, CartPage, ProductsPage, etc.)
    ├── types/             # TypeScript interfaces and type definitions
    ├── utils/             # Helper utilities and custom hooks
    ├── App.tsx            # Main application layout and routes
    └── index.tsx          # Application entry point
```

---

## 📄 License

This project is licensed under the GPL-3.0 License.
