import React from 'react';
import { Product } from '../types/Product';

export const MainContext = React.createContext<{
  products: Product[],
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setPhones: React.Dispatch<React.SetStateAction<Product[]>>;
  setTablets: React.Dispatch<React.SetStateAction<Product[]>>;
  setAccessories: React.Dispatch<React.SetStateAction<Product[]>>;
}>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  setProducts: () => {},
  setPhones: () => {},
  setTablets: () => {},
  setAccessories: () => {},
});
