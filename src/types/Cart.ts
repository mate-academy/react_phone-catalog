import { Product } from './Product';

export type Cart = {
  id: string;
  product: Product;
  quantity: number;
};
