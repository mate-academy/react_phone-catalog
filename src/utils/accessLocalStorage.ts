// import { MenuItems } from '../types/MenuItems';
import { Product } from '../types/Product';
import { ProductItem } from '../types/ProductItem';

// type Keys = keyof typeof MenuItems | 'favorites' | 'cart';
type Keys = 'favorites' | 'cart';

export const accessLocalStorage = {
  get(key: Keys) {
    const data = localStorage.getItem(key);

    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  set(data: Product[] | ProductItem[], key: Keys) {
    try {
      localStorage.setItem(key, JSON.stringify(data));

      return this.get(key);
    } catch {
      return [];
    }
  },
};
