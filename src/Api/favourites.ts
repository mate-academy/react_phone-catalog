import { getFromLocalStorage, setInLocalStorage } from './api';

const FAVOURITES_KEY = 'favourites';

export const addFavourite = (itemId: string): void => {
  const favourites = getFromLocalStorage(FAVOURITES_KEY);

  if (favourites.includes(itemId)) {
    return;
  }

  favourites.push(itemId);

  setInLocalStorage(FAVOURITES_KEY, favourites);
};

export const removeFavourite = (itemId: string): void => {
  let favourites = getFromLocalStorage(FAVOURITES_KEY);

  favourites = favourites.filter((id: string) => id !== itemId);

  setInLocalStorage(FAVOURITES_KEY, favourites);
};

export const isFavourite = (itemId: string): boolean => {
  const favourites = getFromLocalStorage(FAVOURITES_KEY);

  return favourites.includes(itemId);
};

export const getFavourites = () => {
  return getFromLocalStorage(FAVOURITES_KEY);
};
