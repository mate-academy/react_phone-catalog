import { Product } from './Product';

export type CartItemDetails = Product & {
  quantity: number;
  totalPrice: number;
};
