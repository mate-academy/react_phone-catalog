import { Product } from './Product';

export interface CartItem {
  good: Product,
  quantity: number,
  itemTotalPrice: number,
}
