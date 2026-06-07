import React, { useContext, useState, createContext } from 'react';
import { Product } from '../types/Product';

type ContextType = {
  favoritesIds: number[];
  setFavoritesIds: React.Dispatch<React.SetStateAction<number[]>>;
  cartIds: number[];
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
  newPhonesModels: Product[];
  setNewPhoneModels: React.Dispatch<React.SetStateAction<Product[]>>;
};

const AppContext = createContext<ContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
  const [cartIds, setCartIds] = useState<number[]>([]);
  const [newPhonesModels, setNewPhoneModels] = useState<Product[]>([]);

  return (
    <AppContext.Provider
      value={{
        favoritesIds,
        setFavoritesIds,
        cartIds,
        setCartIds,
        newPhonesModels,
        setNewPhoneModels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
