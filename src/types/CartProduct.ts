import { Product } from './Product';

export interface CartProduct {
  id: string,
  quantity: number,
  product: Product,
}
