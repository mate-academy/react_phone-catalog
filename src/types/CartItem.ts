import { Product } from './Product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}
