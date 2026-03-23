import { createContext } from 'react';
import { Product, Products } from '../types/Product';

type Favorite = {
  id: string;
  active: boolean;
};

type CartItem = {
  id: string;
};

type ProductsContextType = {
  products: Product[];
  phones: Products[];
  tablets: Products[];
  accessories: Products[];
  isLoading: boolean;

  cart: CartItem[];
  favorites: Favorite[];

  toggleCart: (id: string) => void;
  toggleFavorite: (id: string, active: boolean) => void;
  deletCard: (id: string) => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  isLoading: false,

  cart: [],
  favorites: [],

  toggleCart: () => {},
  toggleFavorite: () => {},
  deletCard: () => {},
});
