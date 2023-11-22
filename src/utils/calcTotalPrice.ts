/* eslint-disable no-restricted-syntax */
import { Product } from '../types/product';
import { Item } from '../types/storageItem';

export function calcTotalPrice(items: Item<Product>[]) {
  let totalPrice = 0;
  let itemsQuantity = 0;

  for (const item of items) {
    totalPrice += item.value.price * item.quantity;
    itemsQuantity += item.quantity;
  }

  return [totalPrice, itemsQuantity];
}
