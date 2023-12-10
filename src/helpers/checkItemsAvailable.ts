import { Item } from '../types/Item';

export const checkItemsAvailable = (
  itemsList: Item[],
  currentItems: Item[],
) => {
  const ids = currentItems.map(item => item.id);

  return itemsList.filter(item => ids.includes(item.id));
};
