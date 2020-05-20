# React Phone catalog
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_phone-catalog/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Description
Implement Phone catalog following [this design](https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2).

Use [phones](https://mate-academy.github.io/react_phone-catalog/api/phones.json)
and [phone details](https://mate-academy.github.io/react_phone-catalog/api/phones/motorola-xoom.json)
tо fetch data (use actual `phoneId` as a last part of the URL before `.json`).

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
    - (*) Implement `Back to top` button

### Home page
1. Create `HomePage` available at `/` with just a title `Home page`
1. Fetch phones from API
    - Each item has a `type`: `phone`, `tablet` or `accessory`
    - A `price` is given before `discount`
    - A `discount` is give in percents `%`
    - `age` is used to sort by `Newest`
    - `id` is required to fetch details
1. Add `HotPrices` block showing phones with a discount sorted by discount value (absolute not percentage)
    - Create `getHotPrice` API call
    - Create `PhoneCard` to use it everywhere
1. Add ability to use `<` and `>` buttons to scroll phones
1. Add `BrandNew` block using the same component as for `HotPrices`
  but showing only the phones without a discount starting from the most expensive
    - create `getBrandNew` API call
1. Add `Shop by category` block with the links to `/phones`, `/tablets` and `/accessories`.
1. Replace the `Home page` title with slider
    - User can change pictures with buttons infinitely
    - (*) Swipe pictures every 5 seconds

### Phones page
1. Create `PhonesPage` available at `/phones` with just a title `Mobile phones`
    - Create `getPhones` API call
1. Implement a `Loader` to show it while waiting for the data from server
1. Add `PhonesList` showing all the phones
    - Show the spinner instead while loading the data
1. Add ability to sort the phones by `age` (`Newest`), `name` (`Alphabetically`) and `price` (`Cheapest`)
    - (*) save sort order in the URL `?sort=age` and apply it after the page reload
1. Add `Pagination` and `Items on page` with `4`, `8`, `16` and `all` options.
    - It should limit the phones you show to the user
    - Read [the description](https://github.com/mate-academy/react_pagination#react-pagination) for more detailed explanation
    - (*) save `?page=2&perPage=8` in the URL and apply them after the page reload

## Tablets and accessories
1. Create `TabletsPage` page available at `/tablets` working the same way as `PhonesPage`
    - Create `getTablets` API call
1. Create `AccessoriesPage` page available at `/accessories` working the same way as `PhonesPage`
    - Create `getAccessories` API call
    - Implement `NoResults` component displayed if there is no data available

### Phone details page
1. Create `PhoneDetailsPage` available at `/phones/:phoneId`
    - `PhonesCard` should be a link to details page
1. Fetch phone details from API taking the `phoneId` from the URL
    - Use `Loader` when fetching the details
1. Show the details on the page
    - Hide `Available colors` and `Select capacity` for now
    - `About` section should contain just a description (without any subheaders)
    - Choose `Tech specs` you want to show
1. Add ability to choose a picture
1. Implement `You may also like` block with phones chosen randomly
    - create `getSuggested` API call
1. Add `Back` working the same way as a Browser `Back` button
1. Add `Breadcrumbs` at the top
    - The last part is a plain text all the other ones are links

### Cart
1. Implement `CartPage` storing an array of `BasketItems`
    - Each item should have `id`, `quantity` and `phone` - a link to a phone from `phones` array
1. Make `Add to cart` button adding a phone to the `Cart`
1. When you add a phone again its quantity should increase in `Cart`
1. Add ability to remove items from the `Basket` with a `x` button
1. Add ability to change the quantity in the `Basket` with `-` and `+` buttons around the quantity
1. (*) Save the `Cart` to the `localSotrage` and read it on page load

### Favorites

### Search
1. Add a `Search` component with an input into the `Header` to filter phones
    - It should work with pagination and sorting
    - (*) Save `Search` params in the URL using `queryParams` (`?query=moto`) and apply it on page load

### Other tasks
1. Add `NotFoundPage` for all the other URLs with the link to `HomePage`
1. Implement `Phone was not found` state for the `PhoneDetailsPage` if there is no phone with a given `phoneId` on the server
