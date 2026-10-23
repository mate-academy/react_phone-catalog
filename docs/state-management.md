# State Management

The application uses React Context to share cart and favorites state across components. Both contexts are registered in `src/main.tsx`.

## Cart

`CartProvider` exposes the following state and actions through `CartContext`:

- `cartIds` — IDs of products in the cart
- `cartQuantities` — quantity indexed by product ID
- `addToCart(id)` — adds a product ID if it is not already present
- `removeFromCart(id)` — removes a product and its saved quantity
- `isInCart(id)` — checks whether a product is in the cart
- `increaseQuantity(id)` — increases the product quantity
- `decreaseQuantity(id)` — decreases quantity, with a minimum of 1
- `clearCart()` — clears cart IDs and quantities

### Persistence

The provider initializes its state from these `localStorage` keys:

- `cartIds`
- `cartQuantities`

A `useEffect` writes each state value back to `localStorage` when it changes. `clearCart()` also removes both keys directly.

## Favorites

`FavoritesProvider` exposes:

- `favoriteIds` — IDs of favorite products
- `toggleFavorite(id)` — adds an ID if it is not present, or removes it if it is
- `isFavorite(id)` — checks whether an ID is a favorite

### Persistence

Favorites are initialized from and saved to the `localStorage` key `favoriteIds`.

## Custom hooks

The hooks in `src/hooks/` provide convenient access to each context:

- `useCart()` returns the cart context.
- `useFavorites()` returns the favorites context.

Each hook throws an error if called outside its corresponding Provider. This helps identify incorrect Provider usage during development.

## Provider hierarchy

The current setup is:

```tsx
<Router>
  <CartProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </CartProvider>
</Router>
```

Because the Providers wrap `App`, components rendered inside the application can access the relevant context.

## Notes

Cart and favorites IDs are typed as `number | string`. The values loaded from `localStorage` are parsed with `JSON.parse`; the current implementation does not validate the parsed data before using it.
