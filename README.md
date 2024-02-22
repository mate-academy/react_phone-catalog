# React Phone catalog
The project was created according to the layout: [this design](https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2).

# Technologies
The following technologies were used to create the project:
  -HTML,
  -SCSS,
  -Js,
  -React,
  -TypeScript;

# Project Structure
App Features:
  -Structured using folders for pages, components, and helpers.
  -SCSS files used per component.
  -BEM methodology applied for component naming.
  -Header with links to all pages, aligned left for Logo and Nav, and right for Favorites and Cart.
  -NavLink used to highlight the current page in the header.
  -Footer with limited width.
  -Back to top button implemented.
  -Integration with GitHub repo.
  -Dynamic picture slider on the homepage.
  -Infinite picture scrolling.
  -Product fetching from API.
  -Sorting and filtering options for product pages.
  -Pagination functionality.
  -Ability to save sort order and pagination state in URL.
  -Cart functionality with add/remove items and quantity adjustment.
  -Favorites functionality with add/remove favorite products.
  -Search component with filtering and debounce functionality.
  -Handling of page not found scenarios.

Pages:
  Home Page:
    -Title: Home page.
    -Fetches products from API.
    -Displays products in sliders.
    -Ability to change pictures with buttons.
    -"Brand new" block.
    -"Shop by category" block.
    -Picture slider with infinite scrolling.

  Phones Page:
    -Title: Mobile phones.
    -Fetches phone products from API.
    -Displays phones with sorting and pagination.
    -Loader while fetching data.

  Tablets Page:
    -Title: Tablets.
    -Fetches tablet products from API.
    -Displays tablets with sorting and pagination.
    -Loader while fetching data.

  Accessories Page:
    -Title: Accessories.
    -Fetches accessory products from API.
    -Displays accessories with sorting and pagination.
    -Loader while fetching data.

  Product Details Page:
    -URL: /product/:productId
    -Fetches product details from API.
    -Displays product details including description and tech specs.
    -Ability to choose a picture.
    -"You may also like" block with randomly chosen products.
    -Back button and breadcrumbs.

  Cart Page:
    -Displays the list of cart items.
    -Ability to remove items and adjust quantity.
    -Total amount calculation.
    -Checkout button.

  Favorites Page:
    -Displays the list of favorite products.
    -Ability to add/remove favorites.
    -Favorites count displayed in the header.

Search:
  -Search component with input field.
  -Clears search with 'x' button.
  -Debounce functionality.
  -Displays "No search results" message if no products match the query.

Other Tasks:
  -NotFoundPage for handling invalid URLs.
  -Phone not found state on ProductDetailsPage if the phone is not available.
  -Local storage used for saving cart state.

Link to the finished project: [Demo](https://RomanOstrous.github.io/react_phone-catalog);
