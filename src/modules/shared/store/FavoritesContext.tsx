import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';

interface Favorite {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

function getInitialState() {
  const localData = localStorage.getItem('favorites');

  return localData ? JSON.parse(localData) : [];
}

export const FavoritesContext =
  React.createContext<Favorite>(getInitialState());

interface Props {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(getInitialState());

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev => {
      const isExist = prev.some(fav => fav.itemId === product.itemId);

      if (isExist) {
        return prev.filter(fav => fav.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some(fav => fav.itemId === productId);
    },
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
