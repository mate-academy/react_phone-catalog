import { Product } from './Product';

export interface CartItemType {
  id: string;
  product: Product;
  quantity: number;
}
