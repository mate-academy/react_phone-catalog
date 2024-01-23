import { ProductDetails } from '../types/ProductDetails';

export const localStorageUtil = {
  read: (key: string) => {
    const data = window.localStorage.getItem(key);

    try {
      return data && JSON.parse(data);
    } catch (error) {
      return null;
    }
  },

  write: (key: string, data: ProductDetails) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
};
