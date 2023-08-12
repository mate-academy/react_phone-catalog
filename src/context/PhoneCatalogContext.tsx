import { createContext } from 'react';
import { Product } from '../types/Product';

interface PhoneCatalogContextType {
  width: number;
  products: Product[];
  isLoading: boolean;
  isMobile: boolean;
}

export const PhoneCatalogContext = createContext<PhoneCatalogContextType>({
  width: window.innerWidth,
  products: [],
  isLoading: true,
  isMobile: false,
});
