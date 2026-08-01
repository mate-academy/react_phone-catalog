import { CartProduct } from './cartProduct';
import { Product } from './productTypes';

export type State = {
  cart: CartProduct[];
  favourites: Product[];
  products: Product[];
  theme: 'light' | 'dark';
};

export type Action =
  | { type: 'TOOGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: CartProduct }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CHANGE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'RESET_CART' }
  | { type: 'ADD_TO_FAVOURITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVOURITES'; payload: string };
