import { Product } from './Product';

export type CartProduct = Product & {
  quantity: number;
};
