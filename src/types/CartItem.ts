import { Product } from './Product';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}
