import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '../types';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.find(fav => fav.itemId === product.itemId)) {
        return prevFavorites; // Already favorite
      }

      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(fav => fav.itemId !== id),
    );
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.itemId === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
