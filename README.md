<p align="center">
  <img src="https://raw.githubusercontent.com/bcheban/react_phone-catalog/master/public/img/banner-phones.png" alt="Nice Gadgets Store Banner" width="600" />
</p>

<h1 align="center">Nice Gadgets — Phone Catalog</h1>

<p align="center">
  <strong>A multilingual, theme-switchable e-commerce catalog for phones, tablets, and accessories — built with React 18, TypeScript, Redux Toolkit, and SCSS.</strong>
</p>

<p align="center">
  <a href="https://bcheban.github.io/react_phone-catalog/">🔗 Live Demo</a> |
  <a href="https://github.com/bcheban/react_phone-catalog">💻 GitHub Repo</a>
</p>

---

## 📌 Project Overview

**Nice Gadgets** is a full-featured product catalog single-page application built with **React 18** and **TypeScript**, modeled after a real e-commerce storefront.
Users can browse phones, tablets, and accessories, view per-product detail pages with color and capacity variants, manage a shopping cart and favourites list, and switch between **English** and **Ukrainian** translations as well as **light** and **dark** themes — all with state persisted to **localStorage**.

The app uses **Redux Toolkit** for global state (cart, favourites, products, theme, i18n), **React Router v6** for navigation, and **i18next** for localization. The UI follows an **atomic design** structure (atoms / molecules / organisms) under `src/modules/`, styled with **SCSS modules** on top of **Bulma**. Built as part of the **Mate Academy** React course.

---

## 🌐 Live Preview

👉 **[https://bcheban.github.io/react_phone-catalog/](https://bcheban.github.io/react_phone-catalog/)**

---

## 🎨 Design Reference

The UI follows the official **Mate Academy** Figma design — **Original Dark** variant with custom theme switching.

- 🎨 [Original Design](https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original)
- 🌑 [Original Dark Design](https://www.figma.com/design/WMdJ24eHk4EkSr25mrt7Y2/Phone-catalog--V2--Original-Dark)

---

## 🛠 Technologies Used

### Core Framework & Build Tools
<p>
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

### State Management
<p>
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/React_Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="React Redux" />
</p>

### Routing
<p>
  <img src="https://img.shields.io/badge/React_Router_6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router DOM 6" />
</p>

### Internationalization
<p>
  <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white" alt="i18next" />
  <img src="https://img.shields.io/badge/react--i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white" alt="react-i18next" />
</p>

### Styling
<p>
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS" />
  <img src="https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=bulma&logoColor=white" alt="Bulma" />
  <img src="https://img.shields.io/badge/classnames-1A1A1A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="classnames" />
  <img src="https://img.shields.io/badge/normalize--scss-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="normalize-scss" />
</p>

### UI & Interaction
<p>
  <img src="https://img.shields.io/badge/Swiper-0066FF?style=for-the-badge&logo=swiper&logoColor=white" alt="Swiper" />
  <img src="https://img.shields.io/badge/React_Select-1A1A1A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Select" />
  <img src="https://img.shields.io/badge/React_Transition_Group-1A1A1A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Transition Group" />
  <img src="https://img.shields.io/badge/Sonner-000000?style=for-the-badge&logo=react&logoColor=white" alt="Sonner" />
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
</p>

### Utilities
<p>
  <img src="https://img.shields.io/badge/lodash.debounce-3492FF?style=for-the-badge&logo=lodash&logoColor=white" alt="lodash.debounce" />
</p>

### Testing
<p>
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
</p>

### Linting & Formatting
<p>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier" />
  <img src="https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white" alt="Stylelint" />
</p>

### CI / CD
<p>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
</p>

### Deployment
<p>
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages" />
</p>

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 📋 Prerequisites

- **Node.js** `v20.x` (see `mateAcademy.nodejsMajorVersion` in `package.json`)
- **npm** `v10.x` or higher
- **Git**

### 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bcheban/react_phone-catalog.git
   cd react_phone-catalog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

### 🧰 Available Scripts

| Script              | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `npm start`         | Start the local dev server                             |
| `npm run build`     | Create a production build in `/build`                  |
| `npm test`          | Run Cypress E2E tests                                  |
| `npm run lint`      | Run Stylelint, Prettier, ESLint, and CSS lint together |
| `npm run lint-js`   | Run ESLint on `.ts` / `.tsx` files                     |
| `npm run lint-css`  | Run Stylelint on `.scss` files                         |
| `npm run format`    | Format source files with Prettier                      |
| `npm run deploy`    | Build and deploy to GitHub Pages                       |

---

## 🚀 Features

- **🏠 Home Page** – Hero slideshow (Swiper), brand-new products, hot prices, and category cards.
- **📱 Phones / 💻 Tablets / 🎧 Accessories Catalogs** – Dedicated catalog pages with sorting, filtering, and pagination.
- **🔍 Product Detail Pages** – Image gallery, color and capacity variant switching, full specs, and "About" section.
- **🛒 Shopping Cart** – Add/remove items, adjust quantity, total price calculation, with confirmation modal on checkout.
- **❤️ Favourites** – Save products to a wishlist with persistent state.
- **🔎 Search with Debounce** – Filtered search via `lodash.debounce` across catalog pages.
- **📑 Pagination** – Configurable items-per-page with navigable page controls.
- **🍞 Breadcrumbs** – Atomic-design breadcrumb navigation across detail pages.
- **🌗 Light / Dark Theme** – Theme toggle with sun/moon icons, persisted to localStorage.
- **🌐 i18n (EN / UA)** – Full localization via `react-i18next` with English and Ukrainian dictionaries.
- **🔔 Toast Notifications** – User feedback via **Sonner**.
- **🎬 Smooth Transitions** – Page and component animations via **React Transition Group**.
- **🚫 Custom 404 / Not Found Pages** – Dedicated "Page Not Found" and "Product Not Found" screens.
- **💾 LocalStorage Persistence** – Cart, favourites, theme, and language survive page reloads.
- **🧪 E2E Tested** – Cypress integration tests (`cypress/integration/page.spec.js`).
- **🤖 CI Workflows** – Automated lint & test runs via GitHub Actions.
- **🔤 Custom Typography** – Bundled Mont font (Bold / Regular / SemiBold).
- **📱 Fully Responsive** – Mobile-first design, optimized for all screen sizes.

---

## ✅ README Checklist

- [x] **Project Name** with a clear, descriptive title
- [x] **Project Overview** with a short description of what the app does
- [x] **Live Preview** link to the deployed version
- [x] **Design Reference** with links to the Figma mockups
- [x] **Technologies Used** with all major tools and libraries listed
- [x] **Getting Started** with prerequisites, installation, and run instructions
- [x] **Available Scripts** documented for local development
- [x] **Features** described in a readable, scannable list
- [x] **Responsive design** verified on mobile, tablet, and desktop
- [x] **Deployed** to GitHub Pages and link verified to work
- [x] **Linted & formatted** — `npm run lint` passes cleanly
- [x] **CI workflows** pass on the `develop` branch

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/bcheban">@bcheban</a> · Mate Academy React Course
</p>
