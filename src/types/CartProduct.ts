import { Product } from './Product';

export type CartProduct = {
  id: string;
  quantity: number;
  product: Product;
};
