/* eslint-disable max-len */
import { createContext, ReactNode } from 'react';
import { useFavoritesStorage } from '../utils/hooks/Storage/useFavoritesStorage';

type FavoritesContextType = ReturnType<typeof useFavoritesStorage>;

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const data = useFavoritesStorage();

  return (
    <FavoritesContext.Provider value={data}>
      {children}
    </FavoritesContext.Provider>
  );
};
