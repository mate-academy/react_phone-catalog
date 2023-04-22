import { createContext } from 'react';
import { Product } from '../types/Product';

type Context = {
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
};

export const ProductsContext = createContext<Context>({
  phones: [],
  tablets: [],
  accessories: [],
});
