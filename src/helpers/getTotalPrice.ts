import { Item } from '../types/Item';

export const getTotalPrice = (items: Item[]) => {
  return items.reduce((acc, item) => {
    return acc + (item.price - ((item.price * item.discount) / 100));
  }, 0);
};
