import React, { FC } from 'react';
import { createContext, useContext } from 'react';

import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import productsAll from '../../public/api/products.json';
import { ProductType } from '../types/Product';

type Props = {
  children: React.ReactNode;
};

const ProductsContext = createContext({
  phones: [] as typeof phones,
  tablets: [] as typeof tablets,
  accessories: [] as typeof accessories,
  productsAll: [] as typeof productsAll,
  findNessesaryItem: (category: string, itemId: string) => {},
});

type ProductCategory = 'phones' | 'tablets' | 'accessories';

const findNessesaryItem = (category: ProductCategory, itemId: string) => {
  switch (category) {
    case 'phones':
      return phones.find(item => item.id === itemId)!;
    case 'tablets':
      return tablets.find(item => item.id === itemId)!;
    case 'accessories':
      return accessories.find(item => item.id === itemId)!;
    default:
      throw new Error('Unknown category');
  }
};

export const ProductsProvider: FC<Props> = ({ children }) => {
  const value = {
    phones,
    tablets,
    accessories,
    productsAll,
    findNessesaryItem: () => {},
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
