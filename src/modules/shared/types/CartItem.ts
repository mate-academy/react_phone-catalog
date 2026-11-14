import { Product } from './Product';

export interface CartItem {
  id: number | string;
  quantity: number;
  product: Product;
}
