import { CartItem } from './CartItem';

export type CartProducts = {
  [productId: string]: CartItem;
};
