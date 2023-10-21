import { createContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type FavouritesContextType = {
  favourites: Product[],
  setFavourites: (value: Product[]) => void,
};

type Props = {
  children: React.ReactNode,
};

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  setFavourites: () => {},
});

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    const savedfavourites = localStorage.getItem('favourites');

    if (savedfavourites === null) {
      return;
    }

    try {
      setFavourites(JSON.parse(savedfavourites));
    } catch {
      localStorage.removeItem('favourites');
    }
  }, []);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};
