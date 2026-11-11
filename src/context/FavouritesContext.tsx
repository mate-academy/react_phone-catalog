// context/FavouritesContext.tsx
import { createContext, useContext, useState } from 'react';
import { NormalizedProduct } from '../interfaces/Product';

type FavouritesContextType = {
  favourites: NormalizedProduct[];
  toggleFavourite: (product: NormalizedProduct) => void;
  isFavourite: (id: string) => boolean;
};

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<NormalizedProduct[]>(() => {
    try {
      const stored = localStorage.getItem('favourites');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavourite = (product: NormalizedProduct) => {
    setFavourites(prev => {
      const updated = prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];

      localStorage.setItem('favourites', JSON.stringify(updated));

      return updated;
    });
  };

  const isFavourite = (id: string) => favourites.some(p => p.id === id);

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
    throw new Error('useFavourites must be used within FavouritesProvider');
  }

  return context;
};
