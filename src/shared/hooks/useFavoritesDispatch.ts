import { useContext } from 'react';
import { FavoritesDispatchContext } from '../contexts/FavoritesContext';

export const useFavoritesDispatch = () => {
  const favoritesDispatch = useContext(FavoritesDispatchContext);

  if (!favoritesDispatch) {
    throw new Error(
      'useFavoritesDispatch must be used within a FavoritesProvider',
    );
  }

  return favoritesDispatch;
};
