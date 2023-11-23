import { Product } from './productType';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
