import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';
import { LocaleStorageTypes } from '../types/LocaleStorageTypes';

export const setCartItemsToLocaleStorage = (
  name: LocaleStorageTypes,
  value: CartProduct[],
) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getCartItemsFromLocaleStorage = (name: LocaleStorageTypes) => {
  return (
    JSON.parse(
      localStorage.getItem(name) as LocaleStorageTypes,
    ) as CartProduct[]
  ) || [];
};

export const setFavouritesTolocaleStorage = (
  name: LocaleStorageTypes,
  value: Product[],
) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getFavouritesFromLocaleStorage = (name: LocaleStorageTypes) => {
  return (
    JSON.parse(
      localStorage.getItem(name) || '',
    ) as Product[]
  ) || [];
};
