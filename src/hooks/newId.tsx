import { CartProducts } from '../types/CartProducts';

export const getNextId = (cart: CartProducts[]) => {
  if (cart.length === 0) {
    return 1;
  }

  const maxId = Math.max(...cart.map(item => item.id));

  return maxId + 1;
};
