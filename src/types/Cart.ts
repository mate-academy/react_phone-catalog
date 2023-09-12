import { Product } from './product';

export type Cart = {
  product: Product
  id: string
  quantity: number
};
