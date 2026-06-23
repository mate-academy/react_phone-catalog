import React, { useContext, useState, createContext, useEffect } from 'react';

type ContextType = {
  favoritesIds: number[];
  setFavoritesIds: React.Dispatch<React.SetStateAction<number[]>>;
  cartIds: number[];
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const AppContext = createContext<ContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoritesIds, setFavoritesIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('favoritesIds');

    return saved ? JSON.parse(saved) : [];
  });
  const [cartIds, setCartIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('cartIds');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartIds', JSON.stringify(cartIds));
  }, [cartIds]);

  useEffect(() => {
    localStorage.setItem('favoritesIds', JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  return (
    <AppContext.Provider
      value={{
        favoritesIds,
        setFavoritesIds,
        cartIds,
        setCartIds,
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
