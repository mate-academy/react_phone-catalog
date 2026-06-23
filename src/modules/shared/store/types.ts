import { CartState } from './cart/cart.types';
import { FavoritesState } from './favorites/favorites.types';

export interface GlobalState {
  cart: CartState;
  favorites: FavoritesState;
}
