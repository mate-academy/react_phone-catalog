import { useContext } from 'react';

import { FavoritesContext } from '../context';

export const useFavorites = () => {
  const value = useContext(FavoritesContext);

  if (!value) {
    throw new Error('FavoritesProvider is missing');
  }

  return value;
};
