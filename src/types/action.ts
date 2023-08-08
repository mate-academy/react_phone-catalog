import { CartItem } from './cartItem';
import { Phone } from './phone';

export type Action = (
  { type: 'UPDATE_QUANTITY', payload: CartItem[] }
  | { type: 'ADD_TO_CART', payload: CartItem[] }
  | { type: 'REMOVE_FROM_CART', payload: CartItem[] }
  | { type: 'UPDATE_PRICE', payload: number }
  | { type: 'UPDATE_FAVORITES', payload: Phone[] }
);
