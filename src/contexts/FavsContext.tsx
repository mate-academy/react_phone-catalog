import React from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavsContextType = {
  favs: Product[];
  setFavs: (value: Product[]) => void;
};

export const FavsContext = React.createContext<FavsContextType>({
  favs: [],
  setFavs: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const FavsProvider: React.FC<Props> = ({ children }) => {
  const [favs, setFavs] = useLocalStorage<Product>('favs', []);

  return (
    <FavsContext.Provider
      value={{
        favs,
        setFavs,
      }}
    >
      {children}
    </FavsContext.Provider>
  );
};
