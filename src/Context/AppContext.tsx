/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useRef,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  getCartProducts,
  getFavouriteProducts,
  getTheme,
  getLanguage,
  saveLanguage,
  saveCartProducts,
  saveFavouriteProducts,
  saveTheme,
} from '../modules/Base/services/LocalStorage';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../types/Card';
import { getProducts } from '../modules/Base/services/ProductService';

type AppStateType = {
  favouriteProducts: string[];
  cartProducts: Record<string, number>;
  isMenuOpen: boolean;
  products: Card[];
  searchParams: URLSearchParams;
  isLoadingProducts: boolean;
  theme: 'light' | 'dark';
  language: 'uk' | 'en';
};

type AppDispatchType = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setFavouriteProducts: Dispatch<SetStateAction<string[]>>;
  setCartProducts: Dispatch<SetStateAction<Record<string, number>>>;
  setProducts: Dispatch<SetStateAction<Card[]>>;
  setIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<'uk' | 'en'>>;
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
  setSearchParams: (
    params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
  ) => void;
  toggleFavouriteCard: (cardId: string) => void;
  toggleAddToCart: (cardId: string) => void;
  fetchProducts: () => void;
  refCardWidth: React.RefObject<HTMLAnchorElement>;
  refSliderWidth: React.MutableRefObject<HTMLDivElement | null>;
};

export const AppStateContext = createContext<AppStateType | null>(null);
export const AppDispatchContext = createContext<AppDispatchType | null>(null);

type Props = {
  children: ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProducts, setFavouriteProducts] =
    useState<string[]>(getFavouriteProducts);
  const [cartProducts, setCartProducts] =
    useState<Record<string, number>>(getCartProducts);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Card[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [language, setLanguage] = useState<'uk' | 'en'>(getLanguage);
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme);
  const [searchParams, setSearchParams] = useSearchParams();

  const refCardWidth = useRef<HTMLAnchorElement>(null);
  const refSliderWidth = useRef<HTMLDivElement>(null);

  function fetchProducts() {
    setIsLoadingProducts(true);
    getProducts()
      .then(setProducts)
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => setIsLoadingProducts(false));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  useEffect(() => {
    saveFavouriteProducts(favouriteProducts);
  }, [favouriteProducts]);

  useEffect(() => {
    saveCartProducts(cartProducts);
  }, [cartProducts]);

  const dispatchValue = useMemo(
    () => ({
      setIsMenuOpen,
      setFavouriteProducts,
      setCartProducts,
      setProducts,
      setIsLoadingProducts,
      setLanguage,
      setTheme,
      setSearchParams,
      toggleFavouriteCard: (cardId: string) => {
        setFavouriteProducts(prev =>
          prev.includes(cardId)
            ? prev.filter(id => id !== cardId)
            : [...prev, cardId],
        );
      },
      toggleAddToCart: (cardId: string) => {
        setCartProducts(prev =>
          Object.keys(prev).includes(cardId)
            ? Object.fromEntries(
                Object.entries(prev).filter(([id]) => id !== cardId),
              )
            : { ...prev, [cardId]: 1 },
        );
      },
      fetchProducts,
      refCardWidth,
      refSliderWidth,
    }),
    [setSearchParams],
  );

  const stateValue = useMemo(
    () => ({
      favouriteProducts,
      cartProducts,
      isMenuOpen,
      products,
      searchParams,
      isLoadingProducts,
      theme,
      language,
    }),
    [
      favouriteProducts,
      cartProducts,
      isMenuOpen,
      products,
      searchParams,
      isLoadingProducts,
      theme,
      language,
    ],
  );

  return (
    <AppDispatchContext.Provider value={dispatchValue}>
      <AppStateContext.Provider value={stateValue}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }

  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);

  if (!context) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }

  return context;
};
