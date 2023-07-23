import { createContext, useContext } from 'react';
import { Product, ProductInCart } from '../types/Product';

export type AppContextType = {
  favorites: Product[],
  cart: ProductInCart[],
  toggleToFavorites: (product: Product) => void,
  toggleToCart: (product: Product | ProductInCart) => void,
  isProductSelected: (productId: string, products: Product[]) => boolean,
  updateCountInCart: (id: string, newCount: number) => void,
};

export const AppContext = createContext<AppContextType>({
  favorites: [],
  cart: [],
  toggleToFavorites: () => {},
  toggleToCart: () => {},
  isProductSelected: () => false,
  updateCountInCart: () => {},
});

export const AppProvider = AppContext.Provider;

export const useAppContext = () => {
  const data = useContext(AppContext);

  return data;
};
