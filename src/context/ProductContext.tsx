import React, { createContext } from 'react';
import { Product } from '../types/Product';

type ProductContextType = {
  products: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProduct: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});
