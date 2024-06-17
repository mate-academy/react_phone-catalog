import React, { createContext, useEffect, useState } from 'react';
import { getGadgets, getPhones, getTablets } from '../utils/fetchMethods';
import { Products } from '../types/ContextType/Products';
import { Phone } from '../types/ContextType/Phones';
import { Tablets } from '../types/ContextType/Tablets';
import { Accessories } from '../types/ContextType/Accessories';

type ContextType = {
  products: Products[];
  setProducts: (v: Products[]) => void;
  phones: Phone[];
  setPhones: (v: Phone[]) => void;
  tablets: Tablets[];
  setTablets: (v: Tablets[]) => void;
  accessories: Accessories[];
  setAccessories: (v: Accessories[]) => void;
};

export const ProductsContext = createContext<ContextType>({
  products: [],
  setProducts: () => {},
  phones: [],
  setPhones: () => {},
  tablets: [],
  setTablets: () => {},
  accessories: [],
  setAccessories: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablets[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);

  useEffect(() => {
    getGadgets('/products.json').then(response => setProducts(response));
    getPhones('/phones.json').then(response => setPhones(response));
    getTablets('/tablets.json').then(response => setTablets(response));
    getTablets('/accessories.json').then(response => setAccessories(response));
  }, []);

  useEffect(() => {}, []);

  const gadgetsTools = {
    products,
    setProducts,
    phones,
    setPhones,
    tablets,
    setTablets,
    accessories,
    setAccessories,
  };

  return (
    <ProductsContext.Provider value={gadgetsTools}>
      {children}
    </ProductsContext.Provider>
  );
};
