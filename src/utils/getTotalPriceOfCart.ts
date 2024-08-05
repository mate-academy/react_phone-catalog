import { Cart } from '../types/Cart';

export const getTotalPriceOfCart = (cart: Cart[]) => {
  let total = 0;

  for (const item of cart) {
    const { quantity, product } = item;
    const result = quantity * product.price;

    total += result;
  }

  return total;
};
