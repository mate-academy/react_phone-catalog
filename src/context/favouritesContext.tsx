import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../types/product';

type DefaultValue = {
  favourites: Product[];
  setFavourites: Dispatch<SetStateAction<Product[]>>;
  numberOfFavourites: number;
};

export const FavouritesContext = createContext<DefaultValue>({
  favourites: [],
  setFavourites: () => {},
  numberOfFavourites: 0,
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const savedFavourites = localStorage.getItem('favourites');
  const initialFavourites = savedFavourites ? JSON.parse(savedFavourites) : [];

  const [favourites, setFavourites] = useState<Product[]>(initialFavourites);

  const numberOfFavourites = favourites.length;

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const value = {
    favourites,
    setFavourites,
    numberOfFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
