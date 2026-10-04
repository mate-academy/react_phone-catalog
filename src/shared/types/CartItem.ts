import { Product } from './Product';

export type CartItem = {
  id: string | number;
  quantity: number;
  product: Product;
};
