import { useContext } from 'react';
import { FavoritesStateContext } from '../contexts/FavoritesContext';

export const useFavoritesState = () => {
  const favoritesState = useContext(FavoritesStateContext);

  if (!favoritesState) {
    throw new Error(
      'useFavoritesState must be used within a FavoritesProvider',
    );
  }

  return favoritesState;
};
