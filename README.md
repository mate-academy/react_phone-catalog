# React Phone Catalog

A modern, responsive e-commerce application for browsing, searching, and buying smartphones, tablets, and accessories. Built with React and TypeScript, it features product filtering, sorting, pagination, interactive sliders, a shopping cart, and a favorites list with persistent storage.

## Live Preview

[View Live Demo](https://kseniiavasylenko.github.io/react_phone-catalog)

## Design Reference

This project is built following the responsive Figma design kit:
- [Figma Design - Original Style](https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original)

## Technologies Used

* **React** (with React Router v6)
* **TypeScript**
* **SCSS / CSS Modules**
* **HTML5 & CSS3**
* **JavaScript (ES6+)**
* **Vite / Webpack**
* **LocalStorage API** (for persisting Cart & Favorites)

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

Make sure you have Node.js (version 16.x or higher) and npm installed on your machine.

1. Clone the repository:
   git clone https://github.com/your-username/react_phone-catalog.git
   cd react_phone-catalog

2. Install dependencies:
   npm install

3. Run the project locally:
   npm start (or npm run dev if using Vite)

4. Open http://localhost:3000 (or the port indicated in terminal) in your browser.

## Features

* Home Page: Interactive auto-sliding picture banner, "Hot Prices" discount slider, category links, and "Brand New" models block.
* Product Catalog Pages: Separate views for Phones, Tablets, and Accessories.
* Dynamic Sorting & Pagination: Sort items by price, age, or title, with URL query parameter synchronization (?sort=age&page=2&perPage=8).
* Search Functionality: Live search with debounced input and URL state retention (?query=value).
* Product Details Page: Full specifications, color and capacity pickers, gallery image selector, and "You may also like" suggestions.
* Shopping Cart: Add/remove items, adjust quantity, automatic price calculation, modal checkout confirmation, and persistent state using localStorage.
* Favorites List: Save favorite products with quick toggle buttons and header indicators.
* Responsive Design: Fully responsive navigation with sticky header, breadcrumbs, and smooth scrolling.
