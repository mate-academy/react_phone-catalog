import { CartType } from '../types/cart';

export type StorageKey = 'favourites' | 'cart' | 'products';

type StorageUtils = {
  get: <T>(key: StorageKey) => T | null;
  set: <T>(key: StorageKey, value: T) => void;
  addToArray: <T>(key: StorageKey, item: T) => void;
  smartAddToArray: <T>(key: StorageKey, item: T) => boolean;
  removeFromArray: <T>(key: StorageKey, item: T) => void;
  clear: (key: StorageKey) => void;
  getAllItems: <T>(key: StorageKey) => T[] | null;
  getCartById: (id: string) => CartType | null;
};

const isArrayCheck = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const storage: StorageUtils = {
  get: <T>(key: StorageKey): T | null => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  },

  set: <T>(key: StorageKey, value: T): void => {
    try {
      const dispatchEvent = (action: 'add' | 'remove') => {
        window.dispatchEvent(
          new CustomEvent('localStorageChange', {
            detail: { key, action },
          }),
        );
      };

      localStorage.setItem(key, JSON.stringify(value));
      dispatchEvent('add');
    } catch (error) {}
  },

  addToArray: <T>(key: StorageKey, item: T): void => {
    const currentValue = storage.get<unknown>(key);

    const dispatchEvent = (action: 'add' | 'remove') => {
      window.dispatchEvent(
        new CustomEvent('localStorageChange', {
          detail: { key, action },
        }),
      );
    };

    if (currentValue === null) {
      storage.set(key, [item]);
      dispatchEvent('add');

      return;
    }

    if (!isArrayCheck(currentValue)) {
      storage.set(key, [item]);
      dispatchEvent('add');

      return;
    }

    if (
      !currentValue.some(
        existingItem => JSON.stringify(existingItem) === JSON.stringify(item),
      )
    ) {
      storage.set(key, [...currentValue, item]);
      dispatchEvent('add');
    }
  },

  smartAddToArray: <T>(key: StorageKey, item: T): boolean => {
    const currentValue = storage.get<unknown>(key);

    const dispatchEvent = (action: 'add' | 'remove') => {
      window.dispatchEvent(
        new CustomEvent('localStorageChange', {
          detail: { key, action },
        }),
      );
    };

    if (currentValue === null) {
      storage.set(key, [item]);
      dispatchEvent('add');

      return true;
    }

    if (!isArrayCheck(currentValue)) {
      storage.set(key, [item]);
      dispatchEvent('add');

      return true;
    }

    if (
      !currentValue.some(
        existingItem => JSON.stringify(existingItem) === JSON.stringify(item),
      )
    ) {
      storage.set(key, [...currentValue, item]);
      dispatchEvent('add');

      return true;
    } else {
      storage.removeFromArray(key, item);
      dispatchEvent('remove');

      return false;
    }
  },

  removeFromArray: <T>(key: StorageKey, item: T): void => {
    const currentValue = storage.get<unknown>(key);

    const dispatchEvent = (action: 'add' | 'remove') => {
      window.dispatchEvent(
        new CustomEvent('localStorageChange', {
          detail: { key, action },
        }),
      );
    };

    if (isArrayCheck(currentValue)) {
      const updatedArray = currentValue.filter(
        existingItem => JSON.stringify(existingItem) !== JSON.stringify(item),
      );

      storage.set(key, updatedArray);

      dispatchEvent('remove');
    }
  },

  clear: (key: StorageKey): void => {
    const dispatchEvent = (action: 'add' | 'remove') => {
      window.dispatchEvent(
        new CustomEvent('localStorageChange', {
          detail: { key, action },
        }),
      );
    };

    localStorage.removeItem(key);
    dispatchEvent('remove');
  },

  getAllItems: <T>(key: StorageKey): T[] | null => {
    const items = storage.get<T[]>(key);

    return items && isArrayCheck(items) ? items : null;
  },

  getCartById: (id: string): CartType | null => {
    const items = storage.getAllItems<CartType>('cart');

    return items && isArrayCheck(items)
      ? items.find(el => el.id === id) || null
      : null;
  },
};
