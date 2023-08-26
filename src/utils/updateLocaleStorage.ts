import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';

export const setCartItemsToLocaleStorage = (
  name: string,
  value: CartProduct[],
) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getCartItemsFromLocaleStorage = (name: string) => {
  return (
    JSON.parse(localStorage.getItem(name) as string) as CartProduct[]
  ) || [];
};

export const setFavouritesTolocaleStorage = (
  name: string,
  value: Product[],
) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getFavouritesFromLocaleStorage = (name: string) => {
  return (
    JSON.parse(localStorage.getItem(name) as string) as Product[]
  ) || [];
};
