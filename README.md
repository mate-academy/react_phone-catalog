# React Phone catalog
- If you work alone follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- If you work in a team follow the [Work in a team guideline](https://github.com/mate-academy/react_task-guideline/blob/master/team-flow.md#how-to-work-in-a-team)

## Description
Implement Products catalog following [this design](https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2).

Use [products](https://mate-academy.github.io/react_phone-catalog/api/products.json)
and [product details](https://mate-academy.github.io/react_phone-catalog/api/products/motorola-xoom.json)
tо fetch data (use actual `productId` as a last part of the URL before `.json`).

Store the Cart in the `localStorage`

## Tasks
- Create `pages`, `components` and `helpers` folders to structure your app
- Use `scss` files per component
- Use component names as BEM block names with all the other BEM rules applied

### App
1. Add a `Header` with links to all the pages
    - The `Logo` and the `Nav` are aligned left
    - The `Favorites` and the `Cart` are aligned right
1. Use `NavLink`s to highlight current page in `Header`
1. Add `Footer`
    - Footer content is limited the same width as the page content
    - Add the link to the Github repo
    - (*) Implement `Back to top` button

### Home page
1. Create `HomePage` available at `/` with just a title `Home page`
1. Fetch products from API
    - Each product has a `type`: `phone`, `tablet` or `accessory`
    - `price` is given before `discount`
    - `discount` is give in percents `%`
    - `age` is used to sort by `Newest`
    - `id` is required to fetch product details
1. Create `ProductsSlider` component and use it in `Hot prices` block
    - Create `getHotPriceProducts` method fetching products with discount from API
      sorted by absolute discount value (not percentage given in API)
    - For now do all the filtering and sorting on client side
    - Create `ProductCard` component to use it everywhere
    - Add ability to use `<` and `>` buttons to scroll products
1. Add `Brand new` block using `ProductsSlider`
    - Create `getBrandNewProducts` method fetching products without a discount from the API starting from the most expensive
1. Add `Shop by category` block with the links to `/phones`, `/tablets` and `/accessories`.
1. Replace the `Home page` title with slider
    - User can change pictures with buttons infinitely
    - (*) Swipe pictures every 5 seconds

### Phones page
1. Create `PhonesPage` available at `/phones` with just a title `Mobile phones`
    - Create `getPhones` API call fetching the products with the `type`: `phone`
1. Add `ProductsList` showing all the `phones`
1. Implement a `Loader` to show it while waiting for the data from server
1. Add ability to sort the products by `age` (`Newest`), `name` (`Alphabetically`) and `price` (`Cheapest`)
    - (*) save sort order in the URL `?sort=age` and apply it after the page reload
1. Add `Pagination` and `Items on page` with `4`, `8`, `16` and `all` options.
    - It should limit the products you show to the user
    - Read [the description](https://github.com/mate-academy/react_pagination#react-pagination) for more detailed explanation
    - Hide all the pagination elements if there are a few items (less than 1 smallest page size)
    - (*) Save `?page=2&perPage=8` in the URL and apply them after the page reload

## Tablets and accessories
1. Create `TabletsPage` page available at `/tablets` working the same way as `PhonesPage`
    - Create `getTablets` method fetching the products with `type`: `tablet`
1. Create `AccessoriesPage` page available at `/accessories` working the same way as `PhonesPage`
    - Create `getAccessories` method fetching the products with `type`: `accessory`
    - Implement `NoResults` component displayed if there are no products available

### Product details page
1. Create `ProductDetailsPage` available at `/product/:productId`
    - `ProductCard` should be a link to the details page
1. Fetch phone details from API taking the `phoneId` from the URL
    - Use `Loader` when fetching the details
1. Show the details on the page
    - Hide `Available colors` and `Select capacity` for now
    - `About` section should contain just a description (without any subheaders)
    - Choose `Tech specs` you want to show
1. Add ability to choose a picture
1. Implement `You may also like` block with products chosen randomly
    - create `getSuggestedProducts` method fetching the suggested products
1. Add `Back` working the same way as a Browser `Back` button
1. Add `Breadcrumbs` at the top
    - The last part is a plain text all the other ones are links

### Cart
1. Implement `CartPage` storing an array of `CartItems`
    - Each item should have `id`, `quantity` and a `product`
1. `Add to cart` button in `ProductCart` should add a product to the `Cart`
1. If the product is already in the `Cart` the button should say `Added to cart`
1. Implement `cart` helper storing the items in memory and having all the required methods.
  Later on it will interact with the API
1. Add ability to remove items from the `Cart` with a `x` button
1. Add ability to change the quantity in the `Cart` with `-` and `+` buttons around the quantity
1. Total amount and quantity should be calculated automatically
1. `Checkout` button should show the message that this functionality is not implemented yet
1. (*) Show the total quantity near the `Cart` icon in the header
1. (*) Save the `Cart` to the `localSotrage` on each change and read it on page load

### Favorites
1. Create `FavoritesPage` it should show the `ProductsList` with all the favorite products
1. Add ability to add/remove favorite products by pressing a hart
1. (*) Show the favorites count near the `Favorites` icon in the header

### Search
1. Add a `Search` component with an input into the `Header` to filter products
1. It should be shown only at `/phones`, `/tablets`, `/accessories` and `/favorites` with an appropriate text
1. The `x` sign appears when the query is not empty and clears the search
1. It should work with pagination and sorting
1. (*) Add `debounce` to the search field
1. (*) Save `Search` params in the URL using `queryParams` (`?query=moto`) and apply them on page load
1. (*) Implement `NoSearchResults` component and show it when there are no products matching the query

### Other tasks
1. Add `NotFoundPage` for all the other URLs with the link to `HomePage`
1. Implement `Phone was not found` state for the `PhoneDetailsPage` if there is no phone with a given `phoneId` on the server

[DEMO LINK](https://ZhupanovOlexii.github.io/react_phone-catalog/)
