import React from 'react';
import { Product } from './Product';

export interface ContextType {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  isLoading: boolean,
}
