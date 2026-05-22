import { Product } from '../../types/products';

export const saveToLocalStorage = (key: string, items: Product[]) => {
  localStorage.setItem(key, JSON.stringify(items));
};
