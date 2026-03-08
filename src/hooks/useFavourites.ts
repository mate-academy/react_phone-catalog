import { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
