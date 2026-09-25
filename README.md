# Nice Gadgets — E-Commerce Product Catalog

Welcome to **Nice Gadgets**, a fully functional e-commerce product catalog for smartphones, tablets, and accessories. This is my **first large-scale frontend development project**, built from scratch to demonstrate modern web development practices, complex state management, and strict architectural patterns.

[Live Demo](https://yevhen-srdk.github.io/react_phone-catalog/) • [Design Figma](https://www.figma.com/design/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog--V2--Original?node-id=0-1&p=f&t=1qBFWfT8LGZC58q0-0)

---

## 🚀 Technologies & Tools Used

* **Core Framework:** React (with Vite for fast bundling)
* **Language:** TypeScript (for type safety and robust code structure)
* **Styling:** SCSS Modules (scoped styles, BEM methodology, and custom mixins)
* **State Management:** React Context API (integrated with `localStorage` persistence)
* **Routing:** React Router DOM (with complex URL search query management)

---

## ✨ Key Features

### 📱 Core Pages & Routing
* **Home Page (`/`):** Features an automated promotional banner slider (5s interval), responsive category navigation, "Hot Prices" block (sorted by discount value), and "Brand New" block (sorted by release year).
* **Product Categories (`/phones`, `/tablets`, `/accessories`):** Dynamic data fetching based on the section, customized loaders, custom error states, and a "No items" fallback.
* **Product Details Page (`/product/:category/:productId`):** Full tech specs, dynamic image switcher, interactive radio buttons for color/capacity selection, breadcrumbs navigation, and a "You may also like" randomized suggestions section.
* **Shopping Cart (`/cart`):** Fully interactive quantity controls, automated subtotal and item counter calculations, `localStorage` persistence, and an interactive checkout confirmation system.
* **Favorites Page (`/favorites`):** One-click heart toggle integration across all product cards to save items for later.
* **NotFoundPage:** Global 404 handler for invalid routes with an explicit fallback to the home page.

### ⚙️ Advanced Functionality
* **URL-Driven State:** Sorting (`?sort=newest|hottest|price`), pagination (`?page=X&perPage=Y`), and global search queries are synchronized with the browser URL for bookmarkable filtering states.
* **Micro-interactions:** Smooth CSS transitions for all interactive elements and a `10%` scale effect on hover for image links.
* **Smooth Scroll:** "Back to top" button built into a responsive footer.

---

## 📂 Project Architecture

The project follows an advanced modular architecture to ensure clean separation of concerns, high maintainability, and scaling efficiency:

```text
src/
├── context/             # Global React Contexts (e.g., Cart, Favorites)
├── hooks/               # Custom hooks (e.g., usePagination, useCatalogParams)
├── modules/             # Page-based modules (Feature-driven approach)
│   ├── HomePage/        # Logic, styles, and assets for the Home page
│   │   └── components/  # Local subcomponents (e.g., Slider, NewModels, HotPrices, Categories)
│   ├── CartPage/        # Logic and styles for the Shopping Cart
│   │   └── components/  # Local subcomponents (e.g., CartCard, Modal for checkout)
│   ├── ProductDetailsPage/
│   ├── ...              # Other page modules (Phones, Tablets, Accessories, etc.)
│   └── shared/          # Content and components shared globally between modules
│       └── components/  # Global UI elements and layouts:
│           ├── Catalog/         # Reusable catalog grid views
│           ├── Footer/          # Global footer with links and smooth scroll
│           ├── Header/          # Sticky header with search, cart, and favorites counters
│           ├── Layout/          # Main page wrapper defining consistent spacing
│           ├── Loader/          # Global async data fetch indicators
│           ├── ProductCard/     # Reusable product item block with standard controls
│           └── ProductCarousel/ # Interactive slider components for products
├── styles/              # Global styles, variables, and SCSS mixins
├── types/               # TypeScript interfaces and type definitions
├── utils/               # Helper functions and API fetchers
├── App.tsx              # Root component handling layout structure and routing
└── index.tsx            # Application entry point
```

🛠️ **Installation & Setup:**

**1. Clone the repository:** `git clone` [https://github.com/Yevhen-Srdk/react_phone-catalog](https://github.com/Yevhen-Srdk/react_phone-catalog)

**2. Navigate to the project directory:** `cd` react_phone-catalog

**3. Install dependencies:** `npm install`

**4. Start the development server:** `npm run dev`

🧑‍💻 Author

Developed with 💻 by Yevhen as a student at Mate Academy. Feel free to connect with me or review my code!
GitHub: [@Yevhen-Srdk](https://github.com/Yevhen-Srdk)
