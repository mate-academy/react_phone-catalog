import { useState } from 'react';

export const getItemFromLocalStorage = (key: string):string[] => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return [];
};

export const writeToLocalStorage = (key:string, itemId: string) => {
  const item = getItemFromLocalStorage(key);

  item.push(itemId);
  localStorage.setItem(key, JSON.stringify(item));
};

export const isLocalStoragehas = (key:string, value: string | string[]) => {
  const item = getItemFromLocalStorage(key);

  if (typeof value === 'string') {
    return item.includes(value);
  }

  return value.map(curr => item.includes(curr));
};

export const resetLocalStorage = () => {
  localStorage.clear();
};

export const useLocalStorage = (key:string) => {
  const [count, setCount] = useState(getItemFromLocalStorage(key));

  const save = (value:string) => {
    setCount(curr => [...curr, value]);
    writeToLocalStorage(key, value);
  };

  const returnData: [string[], CallableFunction] = [count, save];

  return returnData;
};
