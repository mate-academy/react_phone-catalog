import { Product } from './Product';

export interface CartProduct extends Product {
  cartQuantity: number,
}
