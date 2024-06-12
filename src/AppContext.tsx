import React, { createContext, useContext, useState } from 'react';
import { PageSection } from './types/PageSection';
import { Products } from './types/Products';
import productsFromServer from './api/products.json';

interface AppContextInterface {
  currentPage: PageSection;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageSection>>;
  favourites: Products[];
  setFavourites: React.Dispatch<React.SetStateAction<Products[]>>;
  cart: Products[];
  setCart: React.Dispatch<React.SetStateAction<Products[]>>;
  phones: Products[];
  tablets: Products[];
  accessories: Products[];
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(PageSection.Home);
  const [favourites, setFavourites] = useState<Products[]>([]);
  const [cart, setCart] = useState<Products[]>([]);
  const phones = productsFromServer.filter(
    product => product.category === 'phones',
  );

  const tablets = productsFromServer.filter(
    product => product.category === 'tablets',
  );

  const accessories = productsFromServer.filter(
    product => product.category === 'accessories',
  );

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        favourites,
        setFavourites,
        cart,
        setCart,
        phones,
        tablets,
        accessories,
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
