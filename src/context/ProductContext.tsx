import React, { createContext } from 'react';
import { Product } from '../types/Product';

type QuantitiesMap = { [key: string]: number };

type ProductContextType = {
  products: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  filteredProductsCategory: Product[];
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  filteredCart: Product[];
  getQuantity: (itemId: string, operation: string) => void;
  getFinalPrice: (
    product: {
      year: number;
      price: number;
      fullPrice: number;
    },
    count: number,
  ) => number;
  totalPrice: number;
  totalItems: number;
  quantities: {
    [key: string]: number;
  };

  setQuantities: React.Dispatch<React.SetStateAction<QuantitiesMap>>;
  clearCart: () => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProduct: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  openMenu: false,
  setOpenMenu: () => {},
  category: '',
  setCategory: () => {},
  filteredProductsCategory: [],
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  filteredCart: [],
  getQuantity: () => {},
  getFinalPrice: () => 0,
  totalPrice: 0,
  totalItems: 0,
  quantities: { ['']: 0 },
  setQuantities: () => {},
  clearCart: () => {},
});
