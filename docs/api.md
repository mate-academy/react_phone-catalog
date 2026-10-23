# API and Data Access

The API helper functions are located in `src/api/`. They use the browser `fetch` API to retrieve JSON files from `public/api/`.

## Category data

| Function           | Data source              | Return type                 |
| ------------------ | ------------------------ | --------------------------- |
| `getProducts()`    | `./api/products.json`    | `Promise<Product[]>`        |
| `getPhones()`      | `./api/phones.json`      | `Promise<PhoneDetails[]>`   |
| `getTablets()`     | `./api/tablets.json`     | `Promise<TabletDetails[]>`  |
| `getAccessories()` | `./api/accessories.json` | `Promise<ProductDetails[]>` |

Each function checks `response.ok`. If the response is not successful, it throws a category-specific error. Otherwise, it returns `response.json()`.

## Product details

`productDetails.ts` defines these types:

- `DetailedProduct` — union of `PhoneDetails`, `ProductDetails`, and `TabletDetails`.
- `DetailedProductWithNumericId` — a `DetailedProduct` extended with `numericId: number`.

### `getProductById(productId)`

1. Fetches phones, tablets, and accessories concurrently with `Promise.all`.
2. Combines the returned arrays into one list.
3. Searches for the product whose `id` matches `productId`.
4. Returns `undefined` if no matching product is found.
5. Otherwise, returns the product with a `numericId` set to its position in the combined list plus one.

If the combined data cannot be fetched, the function throws `Error('Failed to fetch product details')`.

### `getSibling(product, changes)`

Finds a variation of the given product using the same `namespaceId`, the selected capacity, and a normalized color.

- `changes.color` is optional; if omitted, the current product color is used.
- `changes.capacity` is optional; if omitted, the current product capacity is used.
- Color comparison uses `normalizeColor`, imported from `src/utils/productColors`.

Returns the matching product, or `undefined` if no matching variation is found. If fetching the category data fails, it throws `Error('Failed to fetch product details')`.

## Error handling

The category functions throw errors when `response.ok` is false. The detail helpers catch errors while loading or searching the combined catalog and throw a new `Failed to fetch product details` error.

## Data files

The code references these JSON files:

- `public/api/products.json`
- `public/api/phones.json`
- `public/api/tablets.json`
- `public/api/accessories.json`

The JSON contents and the product type definitions have not been reviewed yet, so this document does not describe their full schemas.
