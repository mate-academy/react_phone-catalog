import { Product } from './Product';

export type Cart = {
  id: number;
  quantity: number;
  product: Product;
};
