import { createContext } from 'react';

import { ProductsContextType } from './types/ProductsContextType';

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  suggestedProducts: [],
  suggestedProductsCache: {},
  phones: [],
  tablets: [],
  accessories: [],
  categories: {},
  currentProduct: null,
  comebackLocations: [],
  IMAGE_PARAM: '',
  searchImageParam: null,
  currentImage: '',
  setCurrentImage: () => {},
  setComebackLocations: () => {},
  setCurrentProduct: () => {},
  getCardWidth: () => '232px',
  getTitle: () => '',
});
