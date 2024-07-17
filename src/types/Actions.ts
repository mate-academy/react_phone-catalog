import { Product } from './Product';

export type CartAction =
  | { type: 'add'; payload: Product }
  | { type: 'deleteProduct'; payload: string }
  | { type: 'deleteItem'; payload: number }
  | { type: 'clear' };

export type LikedAction = { type: 'toggle'; payload: Product };
