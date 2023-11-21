import { Product } from './Product';

export type CartProduct = {
  id: number;
  quantity: number;
  product: Product;
};
