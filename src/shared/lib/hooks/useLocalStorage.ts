import { useState } from 'react';

export interface ICartItemsLocalStorage {
  itemId: string;
  count: number;
}

function setLocalStorageItem(key: string, value: any) {
  const event = new CustomEvent('localStorageChange', {
    detail: { key, value },
  });

  window.dispatchEvent(event);
}

export const useLocalStorage = <T>(
  key: string,
  startValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);

    setLocalStorageItem(key, newValue);
  };

  return [value, save];
};
