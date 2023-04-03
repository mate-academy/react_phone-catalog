import { Product } from './Product';

export interface CartProduct {
  id: string,
  product: Product,
  quantity: number,
}
