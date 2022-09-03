# React Phone catalog

## Description
Products catalog was implemented 

Used [products](https://mate-academy.github.io/react_phone-catalog/api/products.json)
and [product details](https://mate-academy.github.io/react_phone-catalog/api/products/motorola-xoom.json)
for fetch data.

- Folders `pages`, `components`, `images`, `api` and  `store` were created for better structuring my app
- `Scss` files were used for every component
-  Component names were called as BEM block names with all the other BEM rules applied

### App
1. Routing was implemented at App component

### Home page
1. `HomePage` is available at `/` 
1. `HomePage` contains  `Header `, `Main` and `Footer`
    -  `Header ` includes links to all the pages
    -  The `Logo` and the `Nav` were aligned left
    -  The `Favorites` and the `Cart` were aligned right
    -  `Main` includes  `TopBanners`, `HotPrices`, `ShopCategory`, `NewModels`
1. Products are fetched from API
    -  Each product has a `type`: `phone`, `tablet` or `accessory`
    - `price` is given before `discount`
    - `discount` is give in percents `%`
    - `age` is used to sort by `Newest`
    - `id` is required to fetch product details
1. `Hot prices` block was implemented like slider  of product`s cards
    -  All the filtering and sorting do on client side
    - `Card` component is used everywhere where it is need
    -  Was added ability to use `<` and `>` buttons to scroll products.
1. Block `NewModels` and `MayLike` also are using slider such as in `Hot prices` block
1. Was added `ShopCategory` block with the links to `/phones`, `/tablets` and `/accessories`. 

### Phones page
1. Was created `PhonesPage` available at `/phones` with a `<h1>` title `Mobile phones`
    - Was implemented `getPhones` API call fetching the products with the `type`: `phone`
1. Was created `ProductsList` which can showing all the `phones`
1. Was implemented a `Loader` to show it while waiting for the data from server
1. Added ability to sort the products by `age` (`Newest`, `value="age"`), `name` (`Alphabetically`, `value="name"`) and `price` (`Cheapest`, `value="price"`) using `<select>` element.
1. `Pagination` was created using for it's components container and `Items on page` using `<select>` element with `4`, `8`, `16` and `all` options. 
    - all the pagination elements are hidden if there are a few items (less than 1 smallest page size)

### Tablets and accessories
1. Was created `TabletsPage` page with `<h1>` title `Tablets` available at `/tablets` working the same way as `PhonesPage`
1. Was created `AccessoriesPage` with `<h1>` title `Accessories` page available at `/accessories` working the same way as `PhonesPage`
    - Was implemented `NoResults` component displayed if there are no products available containing text `<Category name> not found`

### Product details page
1. `ProductDetailsPage` was created  available at `/product/:productId`
    - `ProductCard` has link to the details page
1. Was added ability to choose a picture
1. Implemented `You may also like` block with products chosen randomly

### Cart
1. Was implemented `CartPage` storing an array of `CartItems`
    - Each item has `id`, `quantity` and a `product`
1. `Add to cart` button in `ProductCart` is adding a product to the `Cart`
1. If the product is already in the `Cart` the button shows `Added to cart`
1. Was added ability to remove items from the `Cart` with a `x` button.
1. Was added ability to show message `Your cart is empty` when there are no products in the `Cart`
1. Was added ability to change the quantity in the `Cart` with buttons containing symbols `-` and `+` around the quantity.
1. Total amount and quantity are calculating automatically. 
1. `Checkout` button is showing the message `We are sorry, but this feature is not implemented yet` after clicking.
1.  The total quantity is showing near the `Cart` icon in the header.

### Favorites
1. `FavoritesPage` was created and it has ability to show the `ProductsList` with all the favorite products
1.  Was added ability to add/remove favorite products by pressing a hart.
1.  The favorites count is showing near the `Favorites` icon in the header

### Search
1.  `Search` component was added with an input into the `<header>` to filter products
1.  It has ability to show only at `/phones`, `/tablets`, `/accessories` and `/favorites` with an appropriate text
1.  The `x` sign appears when the query is not empty and clears the search
1.  It works with pagination and sorting
1. `NoSearchResults` component was implemented and show it when there are no products matching the query

## Local development
* VS Code
* ESlint
* Stylelint

### Dependencies
- redux
- react-router-dom
- typescript
- react-dom
- fetch-request
- JS
- API
- HTML
- SASS
- AsyncThunk
- redux-toolkit
- styled-components
- jest
- material ui  
- Node v14.18.2 and higher
- NPM v6.14.12 and higher

### Installing
* Fork and clone this repository
* Run `npm install` in your terminal
* Run `npm start`
