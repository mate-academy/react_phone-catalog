import { Cart } from '../../../types/Cart';

export type CartTotals = {
  totalPrice: number;
  totalItems: number;
};

export type CartItemProps = {
  cartProduct: Cart;
};
