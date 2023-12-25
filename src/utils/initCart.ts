import { CartItemType } from '../types/CartItem';

export const initCart = (key: string): CartItemType[] => {
  const loadedItems = localStorage.getItem(key);

  return loadedItems
    ? JSON.parse(loadedItems)
    : [];
};
