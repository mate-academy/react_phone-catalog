import { useContext, Context } from 'react';
import { CartContext } from '../shared/components/CartContext/CartContext';
import { FavoritesContext } from '../shared/components/FavoritesContext/FavoritesContext';

function useSafeContext<T>(context: Context<T | null>, name: string): T {
  // React.createContext<CartContextType | null>(null);
  const value = useContext(context);

  if (!value) {
    throw new Error(`use${name} must be used within a ${name}Provider`);
  }

  return value;
}

export const useCart = () => useSafeContext(CartContext, 'Cart');

export const useFavorites = () => useSafeContext(FavoritesContext, 'Favorites');
