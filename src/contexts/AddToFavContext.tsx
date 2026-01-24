import React, { useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AddToFavContextType {
  fav: Product[];
  setFav: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const AddToFavContext = React.createContext<AddToFavContextType>({
  fav: [],
  setFav: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AddToFavProvider: React.FC<Props> = ({ children }) => {
  const [fav, setFav] = useLocalStorage<Product[]>('fav', []);

  const value = useMemo(
    () => ({
      fav,
      setFav,
    }),
    [fav],
  );

  return (
    <AddToFavContext.Provider value={value}>
      {children}
    </AddToFavContext.Provider>
  );
};
