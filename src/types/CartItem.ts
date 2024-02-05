import { Product } from './Product';

export interface CartItem {
  id: number;
  qnty: number;
  product: Product;
}
