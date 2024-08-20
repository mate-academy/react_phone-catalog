import { Product } from './Product';

export type CartProducts = {
  id: number;
  quantity: number;
  product: Product;
};
