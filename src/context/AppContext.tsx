import { createContext, useContext } from 'react';
import { Product } from '../types/Product';

type AppContextData = {
  favorites: Product[];
  favCount: number;
  handleToggleLike: (product: Product) => void;
  inCart: Product[];
  inCartCount: number;
  handleToggleAddToCart: (product: Product) => void;
  isSelectedProduct: (itemId: string, poducts: Product[]) => boolean;
  query: string;
  isShowResSearch: boolean;
  productsToSearch: Product[];
  updateCount: (newCount: number, itemId: string) => void;
};

export const AppContext = createContext<AppContextData>({
  favorites: [],
  favCount: 0,
  handleToggleLike: () => {},
  inCart: [],
  inCartCount: 0,
  handleToggleAddToCart: () => {},
  isSelectedProduct: () => false,
  query: '',
  isShowResSearch: false,
  productsToSearch: [],
  updateCount: () => {},
});

export const AppProvider = AppContext.Provider;

export const useAppContext = () => {
  const data = useContext(AppContext);

  return data;
};
