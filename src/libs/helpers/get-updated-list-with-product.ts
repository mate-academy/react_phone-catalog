import { ProductType } from '../types';

export const getUpdatedListWithProduct = <T extends ProductType>(
  list: T[],
  item: T,
  shouldRemove: boolean,
) => {
  return shouldRemove
    ? list.filter(existingItem => existingItem.id !== item.id)
    : [...list, item];
};
