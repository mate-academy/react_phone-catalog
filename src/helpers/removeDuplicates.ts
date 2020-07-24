import { Basket } from '../interfaces';
import { Phone } from '../interfaces';

export const removeDuplicates = (list: Basket[], goodItem: Phone) => {
  const index = list.findIndex(item => item.id === goodItem.id);
  const listWithoutDuplicates = [...list];
  const newGoodItem = {
    id: goodItem.id,
    quantity: findQuantity(goodItem.id, list),
    goodItem: goodItem,
  }
  if (index !== -1) {
    listWithoutDuplicates.splice(index, 1,newGoodItem )
  }
  return listWithoutDuplicates;
}

export const findQuantity = (id: string, basketItems: Basket[]) => {
  const quantity = basketItems.filter(good => good.id === id)[0].quantity + 1;
  return quantity;
}
