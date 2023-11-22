import type { ProductType } from './ProductType';

export type CartItem = {
  id: string;
  quantity: number;
  product: ProductType;
};
