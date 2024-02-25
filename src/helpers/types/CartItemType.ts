import { Product } from './Product';

export interface CartItemType {
  id: string,
  quantity: number,
  product: Product
}
