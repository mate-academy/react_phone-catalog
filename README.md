React phone catalog

Application implemented according to nest Products catalog: (https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2).

Data fetched from [products](https://mate-academy.github.io/react_phone-catalog/api/products.json)
and [product details](https://mate-academy.github.io/react_phone-catalog/api/products/motorola-xoom.json)

Cart and favorites store in the local storage

Header has links to all pages

Hot prices slider on Home page filter products with discount and sorts by absolut discount
Brand new slider displays products without discount

Ability to use `<` and `>` buttons to scroll products added

Phones page displays all the products with the `type`: `phone`
Ability to sort the products by `age` (`Newest`), `name` (`Alphabetically`) and `price` (`Cheapest`) added
Pagination elements if there are more than a few items (less than 1 smallest page size) added

Tablets and accessories pages display appropriate products 

Product details page fetches detail data about specific product 
Ability to choose a picture added
`You may also like` block with products chosen randomly added
`Back` working the same way as a Browser `Back` button added

Ability to add product to cart or favorite implemented on every place, where user can interact with product
Ability to remove items from the `Cart` with a `x` button added
Ability to change the quantity in the `Cart` with `-` and `+` buttons around the quantity added
Total amount and quantity calculated automatically
`Checkout` button shows the message that this functionality is not implemented yet
`Cart` icon and `Favorite` in the header shows total quantity of products

`Search` component with an input in the `Header` filters products by product name
The `x` sign appears when the query is not empty and clears the search
`debounce` added to the search field

Used technology stack: React / HTML / CSS / SASS / BEM
