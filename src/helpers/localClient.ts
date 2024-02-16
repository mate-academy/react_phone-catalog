import { ProductItem } from '../types/ProductItem';

export const localClient = {
  read: (key: string) => {
    const data = window.localStorage.getItem(key);

    try {
      return data && JSON.parse(data);
    } catch (error) {
      return [];
    }
  },

  write: (key: string, data: ProductItem[]) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
};
