import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import { Product } from '../types/product';

type FavouritesContextType = {
  favItems: Product[];
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (id: string) => void;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const FavouritesProvider = ({ children }: Props) => {
  const [favItems, setFavItems] = useState<Product[]>(() => {
    const savedFavItems = localStorage.getItem('favourites');

    if (!savedFavItems) {
      return [];
    }

    return JSON.parse(savedFavItems);
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favItems));
  }, [favItems]);

  const addToFavourites = (product: Product) => {
    setFavItems(prev => [...prev, product]);
  };

  const removeFromFavourites = (id: string) => {
    setFavItems(prev => prev.filter(item => item.itemId !== id));
  };

  return (
    <FavouritesContext.Provider
      value={{ favItems, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFav = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFav must be used inside FavouritesProvider');
  }

  return context;
};
