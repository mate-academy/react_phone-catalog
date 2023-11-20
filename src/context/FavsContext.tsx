/* eslint-disable max-len */
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { Product } from '../types/Product';

export interface Favourite {
  id: string;
  product: Product;
}

interface FavsType {
  favItems: Favourite[];
  addToFavs: (productToAdd: Favourite) => void;
  removeFromFavs: (productToRemove: Favourite) => void;
  checkFav: (id: string) => boolean;
  toggleFav: (prod: Favourite) => boolean;
}

export const FavouritesContext = createContext<FavsType>({
  favItems: [],
  addToFavs: () => { },
  removeFromFavs: () => { },
  checkFav: () => false,
  toggleFav: () => false,
});

interface FavsProviderProps {
  children: ReactNode;
}

const FavouritesProvider: React.FC<FavsProviderProps> = ({ children }) => {
  const [favItems, setFavItems] = useState<Favourite[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem('favouriteItems');

    if (storedFavs) {
      setFavItems(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favouriteItems', JSON.stringify(favItems));
  }, [favItems]);

  const addToFavs = (favToAdd: Favourite) => {
    setFavItems([...favItems, { ...favToAdd }]);
  };

  const removeFromFavs = (favToRemove: Favourite) => {
    setFavItems(favItems.filter(i => favToRemove.id !== i.id));
  };

  const toggleFav = (product: Favourite) => {
    if (favItems.some(item => item.id === product.id)) {
      removeFromFavs(product);

      return false;
    }

    addToFavs(product);

    return true;
  };

  const checkFav = (id: string) => {
    return favItems.some(item => item.id === id);
  };

  const value: FavsType = {
    favItems,
    addToFavs,
    removeFromFavs,
    toggleFav,
    checkFav,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
