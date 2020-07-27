import { Basket, Product } from '../interfaces';

export const findQuantity = (id: string, basketItems: Basket[], option: string) => {
  const product = basketItems.find(good => good.id === id);
  const quantity = product ? product.quantity : 0;
  const newQuantity = option === 'add' ? quantity + 1 : quantity - 1;

  return newQuantity;
};

export const removeDuplicates = (list: Basket[], goodItem: Product, option: string) => {
  const index = list.findIndex(item => item.id === goodItem.id);
  const listWithoutDuplicates = [...list];
  const quantity = findQuantity(goodItem.id, list, option);
  const newGoodItem = {
    id: goodItem.id,
    quantity,
    goodItem,
  };

  if (index !== -1) {
    if (quantity < 1) {
      listWithoutDuplicates.splice(index, 1);
    } else {
      listWithoutDuplicates.splice(index, 1, newGoodItem);
    }
  } else {
    listWithoutDuplicates.splice(0, 0, newGoodItem);
  }

  return listWithoutDuplicates;
};

export const deleteItemFromBasket = (list: Basket[], id: string) => {
  const index = list.findIndex(item => item.id === id);
  const listWithoutItem = [...list];

  listWithoutItem.splice(index, 1);

  return listWithoutItem;
};
