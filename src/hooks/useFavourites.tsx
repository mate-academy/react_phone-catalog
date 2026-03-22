import { useContext } from 'react';
import { FavouritesContext } from '../store/favourites/FavouritesProvider';

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }

  return context;
};
