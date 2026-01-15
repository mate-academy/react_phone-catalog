import { Product } from './Product';

export type CartProduct = Pick<Product, 'id' | 'price' | 'fullPrice'>;

export interface CartItem {
  product: CartProduct;
  count: number;
}
