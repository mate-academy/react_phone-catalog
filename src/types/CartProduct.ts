import { Product } from './Product';

export type CartProduct = Product & {
  amount: number;
};
