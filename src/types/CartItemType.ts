import { Product } from './Product';

export type CartItemType = {
  id: string;
  quantity: number;
  product: Product;
};
