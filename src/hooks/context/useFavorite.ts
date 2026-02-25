import { useContext } from 'react';
import { ContextFavorite } from '../../store/ProviderFavorite';

export const useFavorite = () => {
  const ctx = useContext(ContextFavorite);

  if (!ctx) {
    throw new Error('Favorite context error');
  }

  return ctx;
};
