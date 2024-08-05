import { CartProducts } from '../../types/CartProducts';

export const getNewId = (cart: CartProducts[]) => {
  return cart.length ? Math.max(...cart.map(item => item.id)) + 1 : 1;
};
