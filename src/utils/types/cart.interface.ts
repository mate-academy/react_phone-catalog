import { TProduct } from './product.type';

export interface ICartItem {
  product: TProduct;
  quantity: number;
}
