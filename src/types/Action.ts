import { CartProduct, Product } from './Product';

export type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'START_LOADER' }
  | { type: 'STOP_LOADER' }
  | { type: 'ERROR_MESSAGE'; payload: string }
  | { type: 'SET_FAVOURITE'; payload: Product }
  | { type: 'ADD_TO_CART'; payload: CartProduct }
  | { type: 'DELETE_PRODUCT'; payload: CartProduct }
  | { type: 'UPDATE_AMOUNT'; payload: CartProduct[] }
  | { type: 'DELETE_FROM_CART'; payload: CartProduct };
