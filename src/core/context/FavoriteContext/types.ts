export interface FavoriteContextValue {
  basket: { id: string; price: number; quantity: number }[];
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addToBasket: (productId: string) => void;
  removeFromBasket: (productId: string) => void;
  removeFromAllBasket: (productId: string) => void;
  favoritesLength: number;
  basketLength: number;
  changeQuantity: (productId: string, path: number) => void
}
