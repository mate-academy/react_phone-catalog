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
    const canonicalId = String(product.itemId ?? product.id);
    const normalized = { ...product, id: canonicalId };

    setFavourites(prev => {
      // Prevent duplicates (normalize id to string to handle numeric ids from products.json)
      if (prev.some(p => String(p.id) === canonicalId)) {
        return prev;
      }

      return [...prev, normalized];
    });
  };

  const removeFromFavourites = (productId: string) => {
    setFavourites(prev => prev.filter(p => String(p.id) !== String(productId)));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const isInFavourites = (productId: string) => {
    return favourites.some(p => String(p.id) === String(productId));
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
