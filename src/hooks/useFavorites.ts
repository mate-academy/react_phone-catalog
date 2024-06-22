import { useContext } from 'react';
import { FavoritesContext } from '../store/FavoritesProvider';

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
