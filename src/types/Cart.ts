import { Product } from './Product';

export type Cart = {
  id: string;
  quantity: number;
  product: Product;
};
