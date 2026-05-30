import { CartProduct } from './Cart';

export interface CartItem {
  id: string;
  quantity: number;
  product: CartProduct;
}
