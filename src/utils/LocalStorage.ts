import { Product } from '../types/Product';

export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

export const setDataToLocalStorage = (key: string, data: Product[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
