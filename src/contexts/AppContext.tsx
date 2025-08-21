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
  saveCartProducts,
  saveFavouriteProducts,
  saveTheme,
} from '../modules/shared/services/localStorage';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../types/Card';
import { getProducts } from '../modules/shared/services/productService';

type AppStateType = {
  favouriteProductsIds: string[];
  cartProductsIds: string[];
  isMenuOpen: boolean;
  products: Card[];
  searchParams: URLSearchParams;
  isLoading: boolean;
  theme: 'light' | 'dark';
  language: 'uk' | 'en';
};

type AppDispatchType = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setFavouriteProductsIds: Dispatch<SetStateAction<string[]>>;
  setCartProductsIds: Dispatch<SetStateAction<string[]>>;
  setProducts: Dispatch<SetStateAction<Card[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<'uk' | 'en'>>;
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
  setSearchParams: (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void;
  toggleFavouriteCard: (cardId: string) => void;
  toggleAddToCart: (cardId: string) => void;
  handleThemeChange: (newTheme: 'light' | 'dark') => void;
  refCardWidth: React.RefObject<HTMLAnchorElement>;
  refSliderWidth: React.MutableRefObject<HTMLDivElement | null>;
};

export const AppStateContext = createContext<AppStateType | null>(null);
export const AppDispatchContext = createContext<AppDispatchType | null>(null);

type Props = {
  children: ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProductsIds, setFavouriteProductsIds] = useState<string[]>(getFavouriteProducts);
  const [cartProductsIds, setCartProductsIds] = useState<string[]>(getCartProducts);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<'uk' | 'en'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme);
  const [searchParams, setSearchParams] = useSearchParams();

  const refCardWidth = useRef<HTMLAnchorElement>(null);
  const refSliderWidth = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch((err) => { throw new Error(err); })
      .finally(() => { setIsLoading(false); });
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveFavouriteProducts(favouriteProductsIds);
  }, [favouriteProductsIds]);

  useEffect(() => {
    saveCartProducts(cartProductsIds);
  }, [cartProductsIds]);

  const dispatchValue = useMemo(() => ({
    setIsMenuOpen,
    setFavouriteProductsIds,
    setCartProductsIds,
    setProducts,
    setIsLoading,
    setLanguage,
    setTheme,
    setSearchParams,
    toggleFavouriteCard: (cardId: string) => {
      setFavouriteProductsIds(prev =>
        prev.includes(cardId)
          ? prev.filter(id => id !== cardId)
          : [...prev, cardId]
      );
    },
    toggleAddToCart: (cardId: string) => {
      setCartProductsIds(prev =>
        prev.includes(cardId)
          ? prev.filter(id => id !== cardId)
          : [...prev, cardId]
      );
    },
    handleThemeChange: (newTheme: 'light' | 'dark') => {
      setTheme(newTheme);
    },
    refCardWidth,
    refSliderWidth,
  }), [setSearchParams]);

  const stateValue = useMemo(() => ({
    favouriteProductsIds,
    cartProductsIds,
    isMenuOpen,
    products,
    searchParams,
    isLoading,
    theme,
    language,
  }), [favouriteProductsIds, cartProductsIds, isMenuOpen, products, searchParams, isLoading, theme, language]);

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