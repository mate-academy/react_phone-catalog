import { Product } from './Product';

export interface CartItemType {
  item: Product;
  quantity: number;
  id: number | string;
}
