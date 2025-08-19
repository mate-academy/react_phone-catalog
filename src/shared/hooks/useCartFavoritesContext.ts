import { useContext } from 'react';
import { CartFavoritesContext } from '../contexts/CartFavoritesContext';

export const useCartFavoritesContext = () => {
  const context = useContext(CartFavoritesContext);

  if (!context) {
    throw new Error('useCartFavoritesContext must be within the AppProvider');
  }

  return context;
};
