import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../shared/interfaces/Product';

interface FavouritesContextType {
  favourites: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (id: number) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  const toggleFavourite = (product: Product) => {
    setFavourites(prev => {
      const exists = prev.some(p => p.id === product.id);

      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const isFavourite = (id: number) => {
    return favourites.some(p => p.id === id);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  return context;
};
