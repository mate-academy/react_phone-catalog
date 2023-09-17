import { Product } from '../types/Product';

export const getFavourites = (): Product[] => {
  const favourites: string | null = localStorage.getItem('favourites');

  if (favourites) {
    return JSON.parse(favourites);
  }

  return [];
};

export const addToFavourites = (item: Product): void => {
  const favourites: Product[] = JSON.parse(
    localStorage.getItem('favourites') || '[]',
  );

  const hasItem = favourites.some(favItem => (
    favItem.id === item.id
  ));

  if (hasItem) {
    return;
  }

  favourites.push(item);
  localStorage.setItem('favourites', JSON.stringify(favourites));
};

export const removeFromFavourites = (item: Product): void => {
  let favourites: Product[] = JSON.parse(
    localStorage.getItem('favourites') || '[]',
  );

  favourites = favourites.filter(product => product.id !== item.id);
  localStorage.setItem('favourites', JSON.stringify(favourites));
};
