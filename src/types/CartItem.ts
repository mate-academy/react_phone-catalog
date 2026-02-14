import { Product } from './Product';

export type CartItem = {
  id: number;
  quantity: number;
  item: Product;
};
