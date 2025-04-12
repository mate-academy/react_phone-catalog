export type StorageKey = 'favourites' | 'cart';

type StorageUtils = {
  get: <T>(key: StorageKey) => T | null;
  set: <T>(key: StorageKey, value: T) => void;
  addToArray: <T>(key: StorageKey, item: T) => void;
  smartAddToArray: <T>(key: StorageKey, item: T) => boolean;
  removeFromArray: <T>(key: StorageKey, item: T) => void;
  clear: (key: StorageKey) => void;
  getAllItems: <T>(key: StorageKey) => T[] | null;
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
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  },

  addToArray: <T>(key: StorageKey, item: T): void => {
    const currentValue = storage.get<unknown>(key);

    window.dispatchEvent(
      new CustomEvent('localStorageChange', {
        detail: { key, action: 'add' },
      }),
    );

    if (currentValue === null) {
      storage.set(key, [item]);

      return;
    }

    if (!isArrayCheck(currentValue)) {
      storage.set(key, [item]);

      return;
    }

    if (
      !currentValue.some(
        existingItem => JSON.stringify(existingItem) === JSON.stringify(item),
      )
    ) {
      storage.set(key, [...currentValue, item]);
    }
  },

  smartAddToArray: <T>(key: StorageKey, item: T): boolean => {
    const currentValue = storage.get<unknown>(key);

    if (currentValue === null) {
      storage.set(key, [item]);

      return true;
    }

    if (!isArrayCheck(currentValue)) {
      storage.set(key, [item]);

      return true;
    }

    if (
      !currentValue.some(
        existingItem => JSON.stringify(existingItem) === JSON.stringify(item),
      )
    ) {
      storage.set(key, [...currentValue, item]);
      window.dispatchEvent(
        new CustomEvent('localStorageChange', {
          detail: { key, action: 'add' },
        }),
      );

      return true;
    } else {
      storage.removeFromArray(key, item);

      return false;
    }
  },

  removeFromArray: <T>(key: StorageKey, item: T): void => {
    const currentValue = storage.get<unknown>(key);

    if (isArrayCheck(currentValue)) {
      const updatedArray = currentValue.filter(
        existingItem => JSON.stringify(existingItem) !== JSON.stringify(item),
      );

      storage.set(key, updatedArray);

      window.dispatchEvent(
        new CustomEvent('localStorageChange', {
          detail: { key, action: 'remove' },
        }),
      );
    }
  },

  clear: (key: StorageKey): void => {
    window.dispatchEvent(
      new CustomEvent('localStorageUpdate', { detail: key }),
    );
    localStorage.removeItem(key);
  },

  getAllItems: <T>(key: StorageKey): T[] | null => {
    const items = storage.get<T[]>(key);

    return items && isArrayCheck(items) ? items : null;
  },
};
