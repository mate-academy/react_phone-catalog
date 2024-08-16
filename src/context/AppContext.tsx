import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  handleNotReady: () => void;
  numberOfProductsPerPage: number;
  setNumberOfProductsPerPage: (pages: number) => void;
  clickedProductId: string | undefined;
  setClickedProductId: (pages: string | undefined) => void;
  previousCurrentPage: string[];
  setPreviousCurrentPage: (page: string[]) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {

  const [numberOfProductsPerPage, setNumberOfProductsPerPage] = useState<number>(8);
  const [clickedProductId, setClickedProductId] = useState<string | undefined>(undefined);
  const [previousCurrentPage, setPreviousCurrentPage] = useState<string[]>(['nothing','nothing']);

  // Definiujemy funkcję
  const handleNotReady = () => {
    alert('Feature has not been implemented!');
  };

  return (
    <AppContext.Provider value={{ handleNotReady, numberOfProductsPerPage, setNumberOfProductsPerPage, clickedProductId, setClickedProductId, previousCurrentPage, setPreviousCurrentPage }}>
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
