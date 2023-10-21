import { Product } from './Product';

export interface CartItem {
  itemId: string;
  quantity: number;
  product: Product;
}
