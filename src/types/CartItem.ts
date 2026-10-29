import { Product } from './Product';

export type CartItem = {
  product: Product;
  id: Product['itemId'];
  quantity: number;
};
