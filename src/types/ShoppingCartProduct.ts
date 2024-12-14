import { Product } from './Product';

export type ShoppingCartProduct = {
  id: string;
  quantity: number;
  product: Product;
};
