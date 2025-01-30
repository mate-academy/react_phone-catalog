import { Product } from '../features/types/Product';

export enum LocaleStorageKeys {
  FAVORITES = 'favorites',
  CART = 'cart',
  LANGUAGE = 'language',
  THEME = 'theme',
}

export function saveProductsToStorage(
  storageKey: LocaleStorageKeys,
  productsToSave: Product[],
) {
  localStorage.setItem(storageKey, JSON.stringify(productsToSave));
}

export function getProductsFromStorage(
  storageKey: LocaleStorageKeys,
): Product[] | null {
  const productData = localStorage.getItem(storageKey);

  return productData ? (JSON.parse(productData) as Product[]) : null;
}
