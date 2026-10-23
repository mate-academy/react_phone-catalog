# TypeScript Types

The type definitions are located in `src/types/`.

## `Product`

Represents a product in the catalog listing.

| Property | Type |
|---|---|
| `id` | `number` |
| `category` | `string` |
| `itemId` | `string` |
| `name` | `string` |
| `fullPrice` | `number` |
| `price` | `number` |
| `screen` | `string` |
| `capacity` | `string` |
| `color` | `string` |
| `ram` | `string` |
| `year` | `number` |
| `image` | `string` |

## `ProductDetails`

Represents detailed product information.

| Property | Type |
|---|---|
| `id` | `string` |
| `category` | `string` |
| `namespaceId` | `string` |
| `name` | `string` |
| `capacityAvailable` | `string[]` |
| `capacity` | `string` |
| `priceRegular` | `number` |
| `priceDiscount` | `number` |
| `colorsAvailable` | `string[]` |
| `color` | `string` |
| `images` | `string[]` |
| `description` | `ProductDescription[]` |
| `screen` | `string` |
| `resolution` | `string` |
| `processor` | `string` |
| `ram` | `string` |
| `cell` | `string[]` |

### `ProductDescription`

A description section containing a title and a list of text strings.

- `title: string`
- `text: string[]`

## Specialized product types

`PhoneDetails` and `TabletDetails` both extend `ProductDetails` and add:

- `camera: string`
- `zoom: string`

## Type exports

`src/types/index.ts` re-exports `Product`, `ProductDetails`, `PhoneDetails`, and `TabletDetails`, allowing other modules to import types from the shared types entry point.

## Note

`Product.id` is numeric, while `ProductDetails.id` is a string. Keep this distinction in mind when using listing data versus detailed product data.
