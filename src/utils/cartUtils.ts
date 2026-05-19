import { CartItem } from '../providers/CartReducer';

export const getTotalPrice = (cart: CartItem[]) =>
  cart.reduce(
    (sum, item) => sum + item.quantity * item.product.priceRegular,
    0,
  );

export const getCartCount = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);
