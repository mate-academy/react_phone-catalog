import { useContext } from 'react';
import { FavoritesContext } from '../../../store/FavoritesContext';

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error(
      'useFavoritesContext must be used within FavoritesProvider',
    );
  }

  return ctx;
};
