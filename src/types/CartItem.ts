import { Product } from './Product';

export type CartItem = {
  product: Product | undefined;
  amount: number;
};
