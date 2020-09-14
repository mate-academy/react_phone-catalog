import { Product } from '../interfaces';

export const addFavorite = (list: Product[], item: Product) => {
  const isDuplicate = list.find(listItem => listItem.id === item.id);

  if (!isDuplicate) {
    return [...list, item];
  }

  return list.filter(listItem => listItem.id !== item.id);
};
