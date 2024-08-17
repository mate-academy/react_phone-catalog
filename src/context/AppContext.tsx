import React, { createContext, useContext, useState } from 'react';
import { ProductAccessory, ProductPhone, ProductTablet } from '../types/Product';

type AppContextType = {
  handleNotReady: () => void;
  numberOfProductsPerPage: number;
  setNumberOfProductsPerPage: (pages: number) => void;
  clickedProduct: ProductPhone | ProductTablet | ProductAccessory | undefined;
  setClickedProduct: (product: ProductPhone | ProductTablet | ProductAccessory | undefined) => void;
  previousCurrentPage: string[];
  setPreviousCurrentPage: (page: string[]) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {

  const [numberOfProductsPerPage, setNumberOfProductsPerPage] = useState<number>(8);
  const [clickedProduct, setClickedProduct] = useState<ProductPhone | ProductTablet | ProductAccessory | undefined>(undefined);
  const [previousCurrentPage, setPreviousCurrentPage] = useState<string[]>(['nothing','nothing']);

  // Definiujemy funkcję
  const handleNotReady = () => {
    alert('Feature has not been implemented!');
  };

  return (
    <AppContext.Provider value={{ handleNotReady, numberOfProductsPerPage, setNumberOfProductsPerPage, clickedProduct, setClickedProduct, previousCurrentPage, setPreviousCurrentPage}}>
      {children}
    </AppContext.Provider>
  );
};

// Hook do korzystania z kontekstu
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
