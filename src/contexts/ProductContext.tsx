import React from 'react';
import { Product } from 'src/types/Product';
import { ProdcutDetails } from 'src/types/ProductDetails';

interface Context {
  products: Product[],
  currentProducts: Product[],
  setCurrentProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  visibleProducts: Product[],
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  selectedProductDetails: ProdcutDetails | null,
  setSelectedProductDetails:
  React.Dispatch<React.SetStateAction<ProdcutDetails | null>>,
  isProductsFetched: boolean,
  setIsProductsFetched: React.Dispatch<React.SetStateAction<boolean>>,
}

export const ProductContext = React.createContext<Context>({
  products: [],
  currentProducts: [],
  setCurrentProducts: () => {},
  visibleProducts: [],
  setVisibleProducts: () => {},
  selectedProductDetails: null,
  setSelectedProductDetails: () => {},
  isProductsFetched: false,
  setIsProductsFetched: () => {},
});
