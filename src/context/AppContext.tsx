import React, { createContext, useContext, useState } from 'react';
import { LimitedProduct } from '../types/Product';


type SortMethodTypes = "newest" | "alpha" | "price";
type AppContextType = {
  handleNotReady: () => void;
  numberOfProductsPerPage: number;
  setNumberOfProductsPerPage: (pages: number) => void;
  clickedProduct: LimitedProduct | undefined;
  setClickedProduct: (product: LimitedProduct | undefined) => void;
  previousCurrentPage: string[];
  setPreviousCurrentPage: (page: string[]) => void;
  favoriteProducts: LimitedProduct[];
  setFavoriteProducts: (products: LimitedProduct[]) => void;
  productsInCart: LimitedProduct[];
  setProductsInCart: (products: LimitedProduct[]) => void;
  theme: 'light' | 'dark';
  setTheme: (products: 'light' | 'dark') => void;
  productsInCartCount: number[];
  setProductsInCartCount: (products: number[]) => void;
  sortMethod: SortMethodTypes;
  setSortMethod: (method: SortMethodTypes) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [numberOfProductsPerPage, setNumberOfProductsPerPage] = useState<number>(8);
  const [clickedProduct, setClickedProduct] = useState<LimitedProduct | undefined>(undefined);
  const [favoriteProducts, setFavoriteProducts] = useState<LimitedProduct[]>([]);
  const [previousCurrentPage, setPreviousCurrentPage] = useState<string[]>(['nothing','nothing']);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [productsInCartCount, setProductsInCartCount] = useState<number[] | []>([])
  const [productsInCart, setProductsInCart] = useState<LimitedProduct[] | []>([]);
  const [sortMethod, setSortMethod] = useState<"newest" | "alpha" | "price">('newest')


  const handleNotReady = () => {
    alert('Feature has not been implemented!');
  };

  return (
    <AppContext.Provider value={{ handleNotReady, numberOfProductsPerPage, setNumberOfProductsPerPage, clickedProduct, setClickedProduct, previousCurrentPage, setPreviousCurrentPage, setFavoriteProducts, favoriteProducts, productsInCart, setProductsInCart, theme, setTheme, productsInCartCount, setProductsInCartCount, sortMethod, setSortMethod}}>
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
