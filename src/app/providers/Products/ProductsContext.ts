import { Product } from '@/shared/type';
import {
  createContext,
  useContext,
} from 'react';

type ProductsContextType = {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<Product[]>;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);




export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('usePhones must be used inside PhonesProvider');
  }

  return context;
}
