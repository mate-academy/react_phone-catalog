import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Products';

type FavoritesContextType = {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites === null) {
      return [];
    }

    return JSON.parse(storedFavorites);
  });

  const addFavorite = (product: Product) => {
    setFavorites(prev => {
      const alreadyExist = prev.some(item => item.itemId === product.itemId);

      if (alreadyExist) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.itemId !== productId));
  };

  const isFavorite = (productId: string) =>
    favorites.some(item => item.itemId === productId);

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.itemId)) {
      removeFavorite(product.itemId);
    } else {
      addFavorite(product);
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
