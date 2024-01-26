import { ProductType } from './product.interface';

export interface ProductInCartType extends ProductType {
  quantity: number,
}
