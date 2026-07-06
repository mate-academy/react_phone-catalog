import { CartItemProduct } from './CartItemProduct';

export type CartItem = {
  id: string;
  quantity: number;
  product: CartItemProduct;
};
