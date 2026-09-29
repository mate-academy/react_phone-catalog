import { Product } from './Product';

export type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};
