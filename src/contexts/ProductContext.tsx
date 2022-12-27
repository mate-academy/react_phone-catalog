import React from 'react';
import { Product } from 'src/types/Product';

interface Context {
  products: Product[],
  currentProducts: Product[],
  setCurrentProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  visibleProducts: Product[],
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>,
}

export const ProductContext = React.createContext<Context>({
  products: [],
  currentProducts: [],
  setCurrentProducts: () => {},
  visibleProducts: [],
  setVisibleProducts: () => {},
});
