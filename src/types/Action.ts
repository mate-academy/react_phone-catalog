import { CartItemType } from './CartItemType';
import { Product } from './Product';

export type Action =
  | { type: 'ADD_FAV'; payload: Product }
  | { type: 'REMOVE_FAV'; payload: string }
  | { type: 'ADD_TO_CART'; payload: CartItemType }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; delta: number } }
  | { type: 'CLEAR_CART' };
