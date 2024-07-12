import { IProduct } from './product.interface';

export interface ICartItem {
  id: string;
  quantity: number;
  product: IProduct;
}
