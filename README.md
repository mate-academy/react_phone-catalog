
[DEMO LINK](https://liliya-dev.github.io/react_phone-catalog/#/)

## Description
Implemented Products catalog following [this design](https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2).

Used [products](https://mate-academy.github.io/react_phone-catalog/api/products.json)
and [product details](https://mate-academy.github.io/react_phone-catalog/api/products/motorola-xoom.json)
tо fetch data (used actual `productId` as a last part of the URL before `.json`).

the Cart is stored in the `localStorage`

## Tasks
- Created `pages`, `components` and `helpers` folders to structure your app
- Used `scss` files per component
- Used component names as BEM block names with all the other BEM rules applied

### App
1. Added a `Header` with links to all the pages
    - The `Logo` and the `Nav` are aligned left
    - The `Favorites` and the `Cart` are aligned right
1. Used `NavLink`s to highlight current page in `Header`
1. Added `Footer`
    - Footer content is limited the same width as the page content
    - Added the link to the Github repo
    - (*) Implemented `Back to top` button

### Home page
1. Created `HomePage` available at `/` with just a title `Home page`
1. Created `ProductsSlider` component and use it in `Hot prices` block
    - Created `getHotPriceProducts` method fetching products with discount from API
      sorted by absolute discount value (not percentage given in API)
    - Created `ProductCard` component to use it everywhere
    - Added ability to use `<` and `>` buttons to scroll products
1. Added `Brand new` block using `ProductsSlider`
    - Created `getBrandNewProducts` method fetching products without a discount from the API starting from the most expensive
1. Added `Shop by category` block with the links to `/phones`, `/tablets` and `/accessories`.


### Phones, Tablets and accessories page
1. Created `PhonesPage` available at `/phones`
    - Created `getPhones` API call fetching the products with the `type`: `phone`
1. Added `ProductsList` showing all the `phones`
1. Implemented a `Loader` to show it while waiting for the data from server
1. Added ability to sort the products by `age` (`Newest`), `name` (`Alphabetically`) and `price` (`Cheapest`)
    - sort order is saved  in the URL `?sort=age` vs after the page reload
1. Added `Pagination` and `Items on page` with `4`, `8`, `16` and `all` options.
    - Saved `?page=2&perPage=8` in the URL and apply them after the page reload

### Product details page
1. Created `ProductDetailsPage` available at `/product/:productId`
    - `ProductCard` is a link to the details page
1. Added ability to choose a picture
1. Implemented `You may also like` block with products chosen randomly
    - create `getSuggestedProducts` method fetching the suggested products
1. Added `Back` working the same way as a Browser `Back` button


### Cart
1. Implemented `CartPage` storing an array of `CartItems`
  The cart is saved `Cart` to the `localSotrage` on each change and read it on page load

### Favorites
1. Created `FavoritesPage` it should show the `ProductsList` with all the favorite products
1. Added ability to add/remove favorite products by pressing a hart

### Search
1. Added a `Search` component with an input into the `Header` to filter products
1. It is shown only at `/phones`, `/tablets`, `/accessories` and `/favorites` with an appropriate text
1. The `x` sign appears when the query is not empty and clears the search
1. It should work with pagination and sorting
1. Added `debounce` to the search field

### Other tasks
1. Added `NotFoundPage` for all the other URLs with the link to `HomePage`
1. Implemented `Phone was not found` state for the `PhoneDetailsPage` if there is no phone with a given `phoneId` on the server
