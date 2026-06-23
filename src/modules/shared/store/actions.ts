import { Product } from '../types/Product';

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'CHANGE_QUANTITY'; payload: { id: number; quantity: number } };

export type FavoritesAction = { type: 'TOGGLE_FAVORITE'; payload: Product };

export type GlobalAction = CartAction | FavoritesAction;
