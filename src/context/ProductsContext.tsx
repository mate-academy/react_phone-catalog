import { createContext, useContext } from 'react';
import type { Product } from '../types/Product';

export const ProductsContext = createContext<Product[]>([]);

export const useProducts = () => useContext(ProductsContext);
