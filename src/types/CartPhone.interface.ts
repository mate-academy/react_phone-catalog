import { IProduct } from './Product.interface';

export interface ICartProduct extends IProduct {
  quantity: number,
}
