import { createContext, useContext, ReactNode, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (itemId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const addToFavorites = (product: Product) => {
    if (!favorites.find(item => item.itemId === product.itemId)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites(favorites.filter(item => item.itemId !== itemId));
  };

  const toggleFavorite = (product: Product) => {
    if (favorites.find(item => item.itemId === product.itemId)) {
      removeFromFavorites(product.itemId);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(item => item.itemId === itemId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      getFavoritesCount,
    }),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
