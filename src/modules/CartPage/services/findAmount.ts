import { ItemsQuantity } from './../../../types/PageDetails';
import { Product } from './../../../types/Product';

export const amount = (
  itemsQuantity: ItemsQuantity,
  cart: Product[],
  itemsOrMoney: string,
) => {
  let count = 0;

  Object.entries(itemsQuantity).forEach(([key, value]) => {
    for (const item of cart) {
      if (item.id === +key) {
        if (itemsOrMoney === 'money') {
          count = count + item.price * value;
        } else if (itemsOrMoney === 'items') {
          count = count + value;
        }
      }
    }
  });

  return `${count}`;
};
