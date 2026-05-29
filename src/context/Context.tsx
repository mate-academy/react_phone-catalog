import React, { useContext, useState, createContext } from 'react';

type ContextType = {
  favoritesIds: number[];
  setFavoritesIds: React.Dispatch<React.SetStateAction<number[]>>;
  addBtnIds: number[];
  setAddBtnIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const AppContext = createContext<ContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
  const [addBtnIds, setAddBtnIds] = useState<number[]>([]);

  return (
    <AppContext.Provider
      value={{
        favoritesIds,
        setFavoritesIds,
        addBtnIds,
        setAddBtnIds,
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
