import { Product } from './Product';

export interface ProductOfCart {
  id: string,
  quantity: number,
  product: Product,
}
