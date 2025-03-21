/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoriteContext = createContext([] as Product[]);
const SetFavoriteContext = createContext((v: Product[]) => {});

export const useFavorite = () => useContext(FavoriteContext);
export const useSetFavorite = () => useContext(SetFavoriteContext);

type Props = {
  children: React.ReactNode;
};

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favorite, setFavorite] = useLocalStorage<Product[]>('favorite', []);

  return (
    <SetFavoriteContext.Provider value={setFavorite}>
      <FavoriteContext.Provider value={favorite}>
        {children}
      </FavoriteContext.Provider>
    </SetFavoriteContext.Provider>
  );
};
