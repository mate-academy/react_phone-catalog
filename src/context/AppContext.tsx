import React, { useEffect, useState } from 'react';
import { ProductItem } from '../types/ProductItem';
import { getAccessories, getPhones, getProduct, getTablets } from '../api';
import { Product } from '../types/Product';

interface AppContextType {
  phones: ProductItem[];
  tablets: ProductItem[];
  accessories: ProductItem[];
  products: Product[];
}

export const AppContext = React.createContext<AppContextType>({
  phones: [],
  tablets: [],
  accessories: [],
  products: [],
});

type Props = {
  children: React.ReactNode;
};
export const AppProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<ProductItem[]>([]);
  const [tablets, setTablets] = useState<ProductItem[]>([]);
  const [accessories, setAccessories] = useState<ProductItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getPhones().then(setPhones);
    getTablets().then(setTablets);
    getAccessories().then(setAccessories);
    getProduct().then(setProducts);
  }, []);

  return (
    <AppContext.Provider value={{ phones, tablets, accessories, products }}>
      {children}
    </AppContext.Provider>
  );
};
