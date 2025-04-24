import { ProductType } from './ProductType';

export type CartItem = {
  id: number;
  product: ProductType;
  quantity: number;
};
