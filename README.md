**BookCatalog** is a sophisticated, full-featured online bookstore designed to provide a seamless and cinematic shopping experience. Built with **React 19** and **TypeScript**, the platform integrates real-time data management via **Firebase**, secure payment processing, and advanced GSAP-driven interactivity.

---

##  Project Capabilities & Features

This ecosystem represents a modern approach to e-commerce, featuring high-end engineering across all modules:

### Advanced Discovery & Search
* **Global Search Engine**: A debounced, high-performance search powered by **TanStack React Query**, grouping results by authors, publishers, and titles with intelligent deduplication.
* **Smart Catalog**: Multi-field filtering (language, book format, category) and dynamic sorting (alphabetical, price, newest) using **Firestore composite queries**.

###Seamless Shopping Experience
* **Multi-Format Support**: Users can purchase books as **Paperback, Kindle, or Audiobooks**.
* **Full Checkout Pipeline**: A multi-step delivery flow integrated with **Stripe Elements** and **LiqPay** via Firebase Cloud Functions.
* **Automated Logistics**: Real-time generation of downloadable **PDF invoices** and order history with status badges.
* **Cart & Wishlist**: Persistent storage via localStorage with Context API, featuring currency conversion (USD/UAH).

###  Cinematic UI & Performance
* **GSAP Animations**: Fluid "fly-to-target" effects for the cart, hero clip-path transitions, and interactive 3D-card elements.
* **Adaptive Design**: A mobile-first 24-column CSS Grid system with a flash-free **Dark Mode** toggle.
* **Global Reach**: Full multilingual support (English/Ukrainian) with automatic language detection.
* **Optimized Architecture**: Code-splitting across 15+ routes, custom lazy-loading, and skeleton loading states for near-instant perceived speed.

---

##  Technical Stack

| **Frontend** | React 19, TypeScript 5.9, Vite 7 |
| **Styling** | Tailwind CSS 4, shadcn/ui, Radix UI |
| **State Management** | React Context API, TanStack React Query 5 |
| **Backend & Data** | Firebase (Auth, Firestore, Cloud Functions) |
| **Payments** | Stripe Elements, LiqPay |
| **Infrastructure** | ImageKit CDN, GitHub Actions, Husky + lint-staged |

---

##  Getting Started

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/dianakerekesha/BookFlow.git](https://github.com/dianakerekesha/BookFlow.git)
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run in development mode**:
    ```bash
    npm run dev
    ```

---
*Created for educational purposes as part of the Mate Academy Full-stack program.*
