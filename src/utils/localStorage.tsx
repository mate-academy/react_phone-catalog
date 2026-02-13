import { ProductAllType } from '../types/Product';

// Вынесите функцию за пределы хука

type NameLocalStorage = 'favorite' | 'cart';

export function getLocalStorage(name: NameLocalStorage) {
  const data = localStorage.getItem(name);

  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  return [];
}

export function setLocalStorage(
  name: NameLocalStorage,
  products: ProductAllType[],
) {
  localStorage.setItem(name, JSON.stringify(products));

  return [];
}
