import { CartItem } from './CartItem';

export interface Cart {
  [key: string]: CartItem,
}
