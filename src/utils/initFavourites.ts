import { Product } from '../types/Product';

export const initFavourites = (key: string): Product[] => {
  const loadedItems = localStorage.getItem(key);

  return loadedItems
    ? JSON.parse(loadedItems)
    : [];
};
