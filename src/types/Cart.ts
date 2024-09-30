import { Product } from './Product';

export interface Cart {
  id: string;
  quantity: number;
  product: Product;
  price: number;
  totalPrice?: number;
}
