import { Product } from './Product';

export interface CartItemInfo {
  id: string;
  product: Product;
  quantity: number;
}
