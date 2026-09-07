import { Product } from '../types/Product';

export type CartProduct = Product & {
  amount: number;
};
