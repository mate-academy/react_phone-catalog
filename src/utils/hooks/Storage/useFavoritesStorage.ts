/* eslint-disable @typescript-eslint/indent */
import { FAVORITES_KEY } from '../../../constants/localStorages';
import { Product } from '../../../types/Product';
import { useLocalStorage } from './useLocalStorage';

export function useFavoritesStorage() {
  const {
    value: favorites,
    setValue: setFavorites,
    error,
  } = useLocalStorage<Product[]>(FAVORITES_KEY, []);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  };

  return {
    favorites,
    error: error?.code,
    toggleFavorite,
    clearFavorites: () => setFavorites([]),
  };
}
