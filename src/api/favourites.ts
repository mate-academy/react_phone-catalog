const KEY = 'favourites';

export const getFavourites = (): string[] => {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
};

export const saveFavourites = (favourites: string[]): void => {
  localStorage.setItem(KEY, JSON.stringify(favourites));
};
