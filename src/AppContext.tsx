import React, { createContext, useContext, useState } from 'react';
import { PageSection } from './types/PageSection';

interface AppContextInterface {
  currentPage: PageSection;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageSection>>;
  favourites: number[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  cart: number[];
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(PageSection.Home);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        favourites,
        setFavourites,
        cart,
        setCart,
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
