import { Product } from './Product';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  cartItems: CartItem[];
};
