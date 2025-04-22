const FAVORITES_KEY = 'favourites';

export const getFavorites = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);

  return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (id: string) => {
  const favorites = getFavorites();

  if (!favorites.includes(id)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, id]));
  }
};

export const removeFavorite = (id: string) => {
  const favorites = getFavorites().filter(favId => favId !== id);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id: string): boolean => {
  return getFavorites().includes(id);
};
