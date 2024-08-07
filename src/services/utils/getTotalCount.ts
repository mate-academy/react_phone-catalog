import { CartProducts } from '../../types/CartProducts';

export const getTotalCount = (cart: CartProducts[]) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);
