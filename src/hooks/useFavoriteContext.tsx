import { useContext } from 'react';

import { FavoriteContext } from '../context/FavoriteProvider';

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useFavorite must be used inside FavoriteProvider');
  }

  return context;
};
