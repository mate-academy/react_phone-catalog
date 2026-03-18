import { Product } from './Product';

export type CartEntry = {
  id: string;
  qty: number;
  product: Product;
};
