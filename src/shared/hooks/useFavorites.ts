import { useContext } from 'react';
import { FavoritesContext } from '../../modules/FavoritesPage/FavoritesContext';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
