# React Cloth catalog (PET Project) [Link](https://vo7kov.github.io/react_cloth-catalog/)

## Description
I have my own **UI design ([Link](https://www.figma.com/file/xejFOilkG3UWJZcGlZTUiT/Kuroso.ee?type=design&node-id=0%3A1&mode=design&t=pdYLMT5ezAqbwqIc-1))** and I've decided to compare pleasure with useful. I'll make my own `cloth` catalog in this project.
<br>
I have my own server where I'll fetch all data **([Link](https://gosyanich.cloudns.nz:9353/kuroso/goods.json))**. I can't update the data, because I haven't learn how to write my own `API` yet.
<br>
<sub>Also, at this moment there is only one good to test (may be I'll need more fields to good).</sub>
<br>
<sub>Last thing I want to add is that I made arrangements with my coordinator.</sub>

## Tasks
There is a checklist for all pages, that I'm going to implement:

### App
1. There is wiil be a custom cursor
1. The app will have next pages:
    - `Home` page
    - `Catalog` page
    - `Filter` modal
    - `Product card` page
    - `Look Book` page
    - `Advanced photo view` modal
    - `Search`
    - `Delivering` page
    - `Bag` modal
    - `Wish list` modal
    - `User Registration` modal
    - `Buy` modal
    - `Contact us` modal
    - `404` page
    - `Develop` page
1. I'm going to use next libraries:
    - `React router`
    - `React hook forms`
    - `i18 next`
    - `Local storage`
    - `React transition group`

### Home page
Will be available at `/`

1. There is will be a header with `Nav` bar
1. `Video` with button `View more` which will redirect to `Catalog` page with already sorted goods by `collection`
1. A small part `Goods` to show for user and button `View more` which will redirect to `Catalog` page with already sorted goods by `collection`
1. A small part of `Photos` to show for user and another button `View more` which will redirect to `Look Book` page
1. Footer which will have links to repo, `Nav` bar links and `multilang` select

### Nav links
- `New arrivals` which will redirect to `Catalog` page with already sorted goods by collection
- `All gender` which will redirect to `Catalog` page
- `Look Book` which will redirect to `Look Book` page
- `Search` which will be implemented by using `debounce`
- `Logo` which will redirect to `Home page`
- `Delivering` which will redirect to `Delivering page`
- `Bag` which will redirect to `Bag modal`
- `Wishlist` which will redirect to `Wish list modal`
- `Profile` which will redirect to `Develop page` because as I've understand, the `User profile` page is a part of `CMS`

### `Catalog` page
`Url` will be available at `/catalog`
<br>
`Catalog` page will contain some pattern for each resolution of `Goods` per `1` page. After user will scroll to the bottom the page will show new `Goods` in a same pattern. And `url` will have search param `?page=` which will be hidden by default. Also, at the bottom of the page will be button `Filter` which will open `Filter` modal

### `Filter` modal
`Url` will have search param `/catalog/?=name-of-collection/?sortBy=`
<br>
With `Filter` modal user could sort `Goods` by:
- `Collection`
- `Size`
- `Color`
- `Price`

### `Product card` page
`Url` will have search param `/catalog/?=name-of-collection/?=seoUrl`
<br>
`Product card` page will contain:
- Images of the `Good`
- Main info (`name`, price, product code)
- `Select size` Dropdown
- Buttons `Buy` and `Add to wish list`
- The `Wish list` button will be active if `Good` already added
- Accordion with `Description` of the `Good`

### `Look book` page
`Look Book` page will be available at `lookBook`
<br>
Page will have same logic with `Catalog`, but instead of `Goods` will be all `Photos` available at [this](https://gosyanich.cloudns.nz:9353/kuroso/goods.json) link

### `Advanced photo view` modal
`Advanced photo view` modal will open a modal after click on some photo

### `Search`
`Url` will have search param `?=query`
<br>
`Search` will be implemented using `debounce`

### `Delivering`
`Delivering` page will be available at `/delivering`
<br>
`Delivering` will be a simple page just with text using `GPT`, because it's `PET` project

### `Bag` modal
`Bag` modal will be available at `/bag`
<br>
`Bag` modal will contain:
- short information of `Goods`
- `Price` info
- `Pay now` button which will open `User Registration` modal

### `Wish list` modal
`Wish list` modal will be available at `/wishList`
<br>
`Wish list` modal is the same with `Bag` modal, but without `Price info`

### `User Registration` modal
`User Registration` modal will be available at `/userRegistration`
<br>
`User Registration` modal will have next fields:
- `First name`
- `Last name`
- `Email name`
- `Select country`
- `Address`
- `ZIP code`
- `State/City`
- `Phone number`

Also, this modal will have `Continue` or `Checkout` buttons. It depends what kind of `Payment` user will choose. If user choose `Pay now` - `Continue` button will appears. Else the `Checkout` button will appears and it's will be the last step to make order

### `Buy` modal
`Buy` modal will be available at `/buy`
<br>
`Buy` modal will have next fields:
- `Card` where user can see his data
- `Card number`
- `Card name`
- `Expire date`
- `CVC`
- `Month` and `Year` selects

### `Contact us` modal
`Contact us` modal will be available at `/contactUs`
<br>
`Contact us` modal will have next fields:
- `Name` and `Surname`
- `Email`
- `Your message` textarea

Button `Send message`

### `404` page
`404` page will contain:
- `Svg` 404
- `Go Home` button

### `Develop` page
`Develop` page will contain:
- Text `This page is developing at this moment`
- `Go Home` button
