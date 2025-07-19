import { createContext } from 'react';
import { Products } from '../types/Products';
import { Phones } from '../types/Phones';
import { Tablets } from '../types/Tablets';
import { Accessories } from '../types/Accessories';

type ProductsContextType = {
  products: Products[];
  phones: Phones[];
  tablets: Tablets[];
  accessories: Accessories[];
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
});
