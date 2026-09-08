import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Product } from '../../types/Product';
import { Theme } from '../../types/types';
import { Cart } from '../../types/Cart';

export interface GlobalContextType {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;

  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearShoppingCart: () => void;

  favorites: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
  toggleFavorites: (product: Product) => void;

  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  toggleMenu: () => void;

  theme: Theme;
  toggleTheme: () => void;
}

export interface GlobalProviderProps {
  children: ReactNode;
}
