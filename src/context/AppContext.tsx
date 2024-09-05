import React, { createContext, useContext, useState, useEffect } from 'react';
import { LimitedProduct, Product } from '../types/Product';

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
  productDetails: Product | undefined;
  setProductDetails: (product: Product | undefined) => void;
  fetchedCategory: Product[] | undefined;
  setFetchedCategory: (product: Product[] | undefined) => void;
  products: LimitedProduct[];
  setProducts: (products: LimitedProduct[]) => void;
  isClickedProdyctInFavs: boolean;
  setIsClickedProdyctInFavs: (status: boolean) => void;
  isClickedProdyctInCart: boolean;
  setIsClickedProdyctInCart: (status: boolean) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<LimitedProduct[]>(() => {
    const storedFavorites = localStorage.getItem('favoriteProducts');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [productsInCartCount, setProductsInCartCount] = useState<number[]>(() => {
    const storedCartItemsCount = localStorage.getItem('productsInCartCount');
    return storedCartItemsCount ? JSON.parse(storedCartItemsCount) : [];
  });

  const [productsInCart, setProductsInCart] = useState<LimitedProduct[]>(() => {
    const storedCartItems = localStorage.getItem('productsInCart');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [numberOfProductsPerPage, setNumberOfProductsPerPage] = useState<number>(8);
  const [clickedProduct, setClickedProduct] = useState<LimitedProduct | undefined>(undefined);
  const [previousCurrentPage, setPreviousCurrentPage] = useState<string[]>(['nothing','nothing']);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sortMethod, setSortMethod] = useState<"newest" | "alpha" | "price">('newest');
  const [productDetails, setProductDetails] = useState<Product | undefined>(undefined);
  const [fetchedCategory, setFetchedCategory] = useState<Product[] | undefined>(undefined);
  const [products, setProducts] = useState<LimitedProduct[]>([]);
  const [isClickedProdyctInFavs, setIsClickedProdyctInFavs] = useState<boolean>(false);
  const [isClickedProdyctInCart, setIsClickedProdyctInCart] = useState<boolean>(false);

  useEffect(() => {
    alert('You’re welcome to explore the site, but please note that MOBILE and TABLET versions are still under development. Thank you for your understanding!')
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  useEffect(() => {
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    localStorage.setItem('productsInCartCount', JSON.stringify(productsInCartCount));
  }, [productsInCart, productsInCartCount]);

  const handleNotReady = () => {
    alert('Feature has not been implemented!');
  };

  return (
    <AppContext.Provider value={{
      handleNotReady,
      numberOfProductsPerPage,
      setNumberOfProductsPerPage,
      clickedProduct,
      setClickedProduct,
      previousCurrentPage,
      setPreviousCurrentPage,
      favoriteProducts,
      setFavoriteProducts,
      productsInCart,
      setProductsInCart,
      theme,
      setTheme,
      productsInCartCount,
      setProductsInCartCount,
      sortMethod,
      setSortMethod,
      productDetails,
      setProductDetails,
      fetchedCategory,
      setFetchedCategory,
      products,
      setProducts,
      isClickedProdyctInFavs,
      setIsClickedProdyctInFavs,
      isClickedProdyctInCart,
      setIsClickedProdyctInCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
