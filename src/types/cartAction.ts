import { ProductCard } from './productCard';

export type CartAction =
  | { type: 'HYDRATE_CART'; payload: ProductCard[] }
  | { type: 'ADD_PRODUCT'; payload: ProductCard }
  | { type: 'DELETE_PRODUCT'; payload: { id: string } }
  | { type: 'TOGGLE_PRODUCT'; payload: { id: string } };
