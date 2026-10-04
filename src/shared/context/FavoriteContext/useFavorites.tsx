import { useContext } from 'react';
import { FavoriteContext } from './FavoriteContext';

export const useFavorites = () => {
  return useContext(FavoriteContext);
};
