import { CartItem } from '../types/cartItem';

export const getCartItems = (itemsInCart: CartItem[]) => {
  return (
    itemsInCart
      .map((el) => el.quantity)
      .reduce((sum, n) => sum + n, 0)
  );
};
