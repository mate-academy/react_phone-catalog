import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';

interface FavouritesContextType {
  favourites: Product[];
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (productId: string) => void;
  clearFavourites: () => void;
  isInFavourites: (productId: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

const FAVOURITES_STORAGE_KEY = 'phone-catalog-favourites';

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Product[]>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync to localStorage whenever favourites changes
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    } catch (e) {
      // Ignore errors
    }
  }, [favourites]);

  const addToFavourites = (product: Product) => {
    setFavourites(prev => {
      // Prevent duplicates
      if (prev.some(p => p.id === product.id)) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromFavourites = (productId: string) => {
    setFavourites(prev => prev.filter(p => p.id !== productId));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const isInFavourites = (productId: string) => {
    return favourites.some(p => p.id === productId);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
        isInFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }

  return context;
};
