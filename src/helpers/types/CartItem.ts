import { Product } from './Product';

export type CartItem = {
  phoneId: string,
  quantity: number,
  product: Product,
};
