import { Cart } from '../types/Cart';

export const getLengthItems = (products: Cart[]) => {
  let length = 0;

  for (const item of products) {
    length += item.quantity;
  }

  return length;
};
