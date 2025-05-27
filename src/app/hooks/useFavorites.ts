import { Product } from '../../types/Product';
import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      const isInFavorites = prevFavorites.some(
        p => p.itemId === product.itemId,
      );

      if (isInFavorites) {
        return prevFavorites;
      }

      return [...prevFavorites, { ...product, quantity: 1 }];
    });
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(p => p.itemId !== itemId),
    );
  };

  const toggleFavoritesItem = (product: Product) => {
    setFavorites(prevFavorites => {
      const isInFavorites = prevFavorites.some(
        p => p.itemId === product.itemId,
      );

      return isInFavorites
        ? prevFavorites.filter(p => p.itemId !== product.itemId)
        : [...prevFavorites, { ...product, quantity: 1 }];
    });
  };

  const clearFavorites = () => setFavorites([]);

  const totalFavoritesItems = favorites.reduce((acc, p) => acc + p.quantity, 0);
  const totalFavoritesPrice = favorites.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0,
  );

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavoritesItem,
    clearFavorites,
    totalFavoritesItems,
    totalFavoritesPrice,
  };
}
