import { Product } from './Product';

export interface ProductInCart extends Product {
  quantity: number,
}
