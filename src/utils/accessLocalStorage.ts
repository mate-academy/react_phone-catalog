import { Product } from '../types/Product';
import { LocalAccessKeys } from './LocalAccessKeys';

function addProduct(data: Product[], target: Product) {
  return [...data, target];
}

function removeProduct(data: Product[], target: Product) {
  return [...data.filter(item => item.itemId !== target.itemId)];
}

export const accessLocalStorage = {
  get(key: LocalAccessKeys) {
    const data = localStorage.getItem(key);

    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  set(data: Product[], key: LocalAccessKeys) {
    try {
      localStorage.setItem(key, JSON.stringify(data));

      return this.get(key);
    } catch {
      return [];
    }
  },

  toggle(product: Product | undefined, key: LocalAccessKeys) {
    const inMemory = this.get(key);
    let newList = [];

    if (product) {
      if (!inMemory.find((prod: Product) => prod.itemId === product.itemId)) {
        newList = addProduct(inMemory, product);
      } else {
        newList = removeProduct(inMemory, product);
      }

      this.set(newList, key);
    }

    return this.get(key);
  },

  append(product: Product | undefined, key: LocalAccessKeys) {
    if (product) {
      const newList = addProduct(this.get(key), product);

      this.set(newList, key);

      return newList;
    }

    return;
  },

  remove(product: Product | undefined, key: LocalAccessKeys) {
    if (product) {
      const newList = removeProduct(this.get(key), product);

      this.set(newList, key);

      return newList;
    }

    return;
  },

  clearKey(key: LocalAccessKeys) {
    localStorage.removeItem(key);
  },
};
