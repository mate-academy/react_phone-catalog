import { Products } from '../Products';

export type CartItem = {
  id: number;
  product: Products;
  quantity: number;
};
