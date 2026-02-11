# 📱 React Phone Catalog

Welcome to the **React Phone Catalog**! This project is a fully responsive, feature-rich product catalog built with **React** and **TypeScript**. It includes pages for browsing products, viewing product details, managing a shopping cart, and saving favorites. 🚀

---

## 🌟 Features

- **Dynamic Routing**: Powered by `react-router-dom` for seamless navigation.
- **Favorites & Cart**: State management using React Context and localStorage for persistence.
- **Product Pages**: Sorting, pagination, and search functionality with debounced input for better performance.
- **Product Details**: Image gallery, specifications, and related product suggestions.
- **Skeleton Loading**: Smooth user experience with skeleton loaders while fetching data.
- **Responsive Design**: Fully optimized for mobile and desktop devices.
- **Reusable Components**: Modular and reusable UI components for scalability.

---

## 🛠️ Tech Stack

This project is built using modern technologies and best practices:

- **React**: Component-based UI development.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Vite**: Lightning-fast development and build tool.
- **SCSS Modules**: Scoped and maintainable styles.
- **React Router**: For dynamic and nested routing.
- **Local JSON API**: Mock data for development without a backend.
- **ESLint & Prettier**: Enforced code quality and formatting standards.


---

## 🗂️ Project Structure
Here's an overview of the project's structure:
src/
├── components/       # Reusable UI components (Header, Footer, etc.)
├── modules/          # Page-specific modules (HomePage, CartPage, etc.)
├── shared/           # Shared utilities, hooks, contexts, and constants
├── styles/           # Global SCSS styles and variables
├── types/            # TypeScript type definitions
├── index.tsx         # App entry point

---

## ✨ Features in short details
# 🏠 Home Page (/)
- **Hero Slider**: Rotating images with navigation controls.
- **Hot Prices**: A slider showcasing discounted products.
- **Shop by Category**: Links to /phones, /tablets, and /accessories.

## 📦 Product Pages (/phones, /tablets, /accessories)
- **Product List**: Displays products with sorting and pagination.
- **Search**: Search functionality with debounced input.
- **Loader**: Skeleton loaders for a better user experience.

## 🔍 Product Details Page (/product/:productId)
- **Image Gallery**: View product images.
- **Specifications**: Detailed product specs.
- **Related Products**: Randomly suggested products.

## 🛒 Cart Page (/cart)
- **Add to Cart**: Add products to the cart from any page.
- **Quantity Management**: Increase or decrease product quantities.
- **Checkout**: Simulated checkout process.

## ❤️ Favorites Page (/favorites)
- **Save Favorites**: Add/remove products to/from favorites.
- **Persistent State**: Favorites are saved in localStorage.

---

## 🏆 Best Practices
This project follows modern development best practices:

- **Component Reusability:** Modular components like Header, Footer, and ProductCard are reusable across the app.
- **State Management:** Context API is used for managing cart and favorites, ensuring a clean and scalable state management solution.
- **Debounced Search:** Optimized search functionality to reduce unnecessary API calls.
- **Skeleton Loaders:**Improves user experience by showing placeholders while data is being fetched.
- **Type Safety:** TypeScript ensures type safety and reduces runtime errors.
- **Responsive Design:** Fully responsive layout using SCSS and media queries.
- **Code Quality:**Enforced with ESLint and Prettier for consistent formatting and linting.

## 🙌 Acknowledgments
Thanks for checking out this project! Feel free to contribute or share your feedback. 😊 ``````
