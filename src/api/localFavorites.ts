const STORAGE_KEY = 'favorites';

export const getStoredFavorites = (): number[] => {
  const favorites = localStorage.getItem(STORAGE_KEY);

  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavoritesLocalStorage = (favorites: number[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const getFavorites = async (): Promise<number[]> => {
  return getStoredFavorites();
};

export const setFavorites = async (favorites: number[]) => {
  return saveFavoritesLocalStorage(favorites);
};
