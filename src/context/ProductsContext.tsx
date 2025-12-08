import React, { FC } from 'react';
import { createContext, useContext } from 'react';

import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import productsAll from '../../public/api/products.json';

type Props = {
  children: React.ReactNode;
};
const ProductsContext = createContext({
  phones: [] as typeof phones,
  tablets: [] as typeof tablets,
  accessories: [] as typeof accessories,
  productsAll: [] as typeof productsAll,
});

export const ProductsProvider: FC<Props> = ({ children }) => {
  const value = {
    phones,
    tablets,
    accessories,
    productsAll,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
