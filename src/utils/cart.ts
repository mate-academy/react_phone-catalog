import { CartItem } from '../contexts/CartContext';

export const getTotalCartItems = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => acc + item.qty, 0);
};
