import { Product } from './Product';

export type Cart = {
  itemId: string;
  product: Product;
  quantity: number;
};
