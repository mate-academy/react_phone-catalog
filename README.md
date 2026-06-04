# React Product Catalog

A comprehensive, high-performance e-commerce application designed for browsing, filtering, and purchasing tech gadgets (smartphones, tablets, and accessories). The application features advanced client-side routing, query-string based filtering, a persistent shopping cart and wishlist system, comprehensive translation capabilities, and a robust architecture.

The standout feature of this project is its **advanced design customizability**, offering 5 distinct color themes backed by dynamic SCSS token management and interactive micro-interactions.

---

## 🌐 Live Preview

Experience the live version of the application here:
👉 **[Launch Live Demo](https://Bukavyna.github.io/react-phone-catalog/)**

---

## 🎨 Design Reference & Themes

The application's interface is based on the professional Phone Catalog design concept. Going beyond standard specifications, this project implements full runtime UI palette shifting across **5 distinct visual configurations**:

1. ⚪ **Original Light** — Clean, content-focused corporate layout.
2. ⚫ **Original Dark** — Deep charcoal background with sharp purple accents.
3. ❄️ **Ice Cap** — Crisp off-white foundation paired with vibrant blue-violet triggers.
4. ⚡ **Electric Cyan** — Neon-infused dark interface with cyan and purple contrasts.
5. 🍑 **Apricot Sorbet** — Soft pastel peach workspace with high-contrast warm accents.

*All themes are fully mapped to structural CSS/SCSS design tokens to ensure immediate color, border, and text adjustments globally.*

---

## 🛠️ Technologies & Project Architecture

The architecture relies on strict type safety and a highly modular structure to guarantee ease of scaling and smooth performance:

* **Core Framework:** React 18 (Functional Components & Hooks)
* **Language:** TypeScript (Strict Mode)
* **State Management:** React Context API & Custom Storage Hooks (Cart, Favorites, and Theme tracking)
* **Routing:** React Router v6 (HashRouter with deep URL state management)
* **Styling:** SCSS / SASS using CSS Modules (`*.module.scss`) for isolated component styles
* **Localization:** i18next (Seamless runtime transition between English & Ukrainian)
* **Animations:** Lordicon React Player (Interactive, state-driven Lottie vector profiles)
* **Build Automation:** Parcel Bundler

### 📁 Architecture & Folder Layout
The codebase follows an enterprise-ready architecture:
* `src/modules/` — Split into isolated page modules (`Home`, `Catalog`, `Cart`, `ProductDetails`, `Favorites`, `NotFound`).
* `src/components/` — Shared, reusable UI layout components (`Button`, `ArrowButton`, `Skeleton`, `Spinner`).
* Each component directory strictly groups its own `.tsx` view, `.module.scss` stylesheets, and local type interfaces.

---

## ✨ Features

### 🌟 Advanced Requirements Met
* **🎨 Dual-Theme Switching:** Comprehensive implementation of runtime Dark Mode and Light Mode switching mapped to global SCSS variables.
* **🌐 Full i18n Localization:** In-app language toggle translating systemic strings between Ukrainian (UK) and English (EN) instantly.
* **🦴 Structural Skeletons:** Premium placeholder blocks utilizing simulated loading states for high-end perceived speed.
* **✨ Micro-Interactions & Animated UI:** Replaced generic static icons with stateful **Lordicon Lottie animations** (e.g., `paletteFlower`, `wiredTrolley`). These icons dynamically track mouse engagement (`onMouseEnter`) via specialized hooks and adapt their internal vector color properties (`primary`/`secondary` parameters) in real-time to match the active color theme configurations.

### 🏠 Home Page
* **Dynamic Hero Banner:** An automated, infinite loop image slider updating every 5 seconds, complete with manual indicator dots and side-scrolling arrows.
* **Curated Product Carousels:** Specialized dynamic shelves capturing `Hot Prices` (ranked by absolute discount values) and `Brand New Models` (ranked by release year).
* **Category Navigation:** High-fidelity responsive links splitting inventory into Phones, Tablets, and Accessories.

### 📱 Catalog Management (`/phones`, `/tablets`, `/accessories`)
* **Asynchronous Loading UX:** Smooth content staging driven by dedicated spinner icons and highly structural **CSS Skeletons** simulating data shapes.
* **Persistent URL States:** Complex sorting values (`Newest`, `Alphabetically`, `Cheapest`) and pagination caps (`4`, `8`, `16`, `all`) sync inside browser query parameters (`?page=2&perPage=8&sort=age`).
* **Resilient Boundaries:** Built-in error retry boundaries alongside user-friendly "Something went wrong" or empty inventory state panels.

### 🔍 Global Debounced Search
* **Context-Aware Inputs:** Search textbars mount within the navigation layout, evaluating data queries inside local product lists via custom debouncing.
* **Deep Linking:** Lookups are bound directly to `?query=value` parameters to allow straightforward page link shares.

### 🛍️ Shopping Cart & Wishlist Ecosystem
* **Persistent Session Storage:** Cart items, total pricing metadata, and favorited states serialize directly into `localStorage` on every user engagement.
* **Granular Cart Modifiers:** Supports bulk removal, incremental item counts, and dynamic item counter indicators over header navbar icons.
* **Simulated Checkout Flow:** Triggering checkout launches an interactive window prompting order confirmation and cart clearance.

---

## 🚀 Getting Started

To run this project locally, execute the following commands in your terminal:

```bash
# 1. Clone the repository
git clone [https://github.com/Bukavyna/react-phone-catalog.git](https://github.com/Bukavyna/react-phone-catalog.git)
cd react-phone-catalog

# 2. Install package dependencies
npm install

# 3. Spin up the local development server
npm start
