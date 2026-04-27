🛍️ Product Catalog App

A modern and responsive product catalog web application built with React and TypeScript.
The app allows users to browse products, view detailed information, manage a shopping cart, and save favorite items.

🔗 Live Demo

👉 https://berezandiana.github.io/product_catalog/

• ⚙️ Technologies Used
• ⚛️ React + TypeScript
• 🧠 Redux Toolkit (state management)
• 🌐 React Router
• 🎨 SCSS Modules
• 🌙 CSS Variables (theme support)
• 🌍 i18next (localization)
• 🎞 Swiper (sliders)
• 🔔 Sonner (notifications)


🚀 Features
🏠 Home Page
Main banner slider with:
• auto-play (every 5 seconds)
• navigation arrows
• pagination indicators

Product sliders:
• 🔥 Hot Prices — sorted by biggest discount
• 🆕 Brand New Models — newest products

📂 Category section with navigation to:
• Phones
• Tablets
• Accessories


📱 Catalog Pages

Available routes:

• /phones
• /tablets
• /accessories

Features:

• Dynamic product loading
• Sorting:
  ○ Newest
  ○ Alphabetically
  ○ Cheapest
• Pagination with URL sync
• Items per page selection
• 🔍 Search with debounce
• Empty state & error handling
• Loading indicators


📄 Product Details Page

Route: /product/:productId

• Full product information
• Image gallery with preview selection
• Available:
  ○ Colors
  ○ Capacities
• Tech specifications & description
• 🔙 Back button (browser-like behavior)
• 🧭 Breadcrumbs navigation
• 🎯 Suggested products block


🛒 Cart Page

Route: /cart

• Add/remove products
• Change quantity (+ / -)
• Total price and item count calculation
• Persisted via localStorage
• Checkout modal (simulation)


❤️ Favorites Page

Route: /favorites

• Add/remove items using heart icon
• Favorites counter in header
• Data stored in localStorage


🎨 UI & UX
• Sticky header with:
  ○ navigation
  ○ cart & favorites counters
• Smooth hover animations
• Image scale effect on hover
• Fully responsive layout
• Dark theme support 🌙
• Clean modular architecture


🔎 Search
• Search input appears on catalog pages
• Query stored in URL (?query=...)
• Debounced input for better performance
• Custom "no results" state


⚠️ Error Handling
• Global error states for API requests
• Retry functionality
• Custom 404 Not Found page

🧩 Additional Features
• 🌐 Language switching
• 🎨 Theme switching
• 🔄 State persistence (cart & favorites)
• ⚡ Optimized rendering with memoization
