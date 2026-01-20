import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { createContext, useContext } from 'react';

import {
  CombinedProductType,
  ProductAllType,
  ProductType,
} from '../types/Product';
import { NameProducts } from '../types/NameProducts';

type Props = {
  children: React.ReactNode;
};

type ProductsContextType = {
  phones: ProductType[];
  tablets: ProductType[];
  accessories: ProductType[];
  productsAll: ProductAllType[];
  addToDB: (params: NameProducts, data: CombinedProductType[]) => void;
  findNessesaryItem: (
    category: NameProducts,
    itemId: string,
  ) => ProductType | undefined;
};

const ProductsContext = createContext<ProductsContextType>({
  phones: [],
  tablets: [],
  accessories: [],
  productsAll: [],
  addToDB: () => {},
  findNessesaryItem: () => undefined,
});

// type ProductCategory = 'phones' | 'tablets' | 'accessories';

export const ProductsProvider: FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [tablets, setTablets] = useState<ProductType[]>([]);
  const [accessories, setAccessories] = useState<ProductType[]>([]);
  const [productsAll, setProductsAll] = useState<ProductAllType[]>([]);

  function addToDB(params: NameProducts, data: CombinedProductType[]) {
    switch (params) {
      case 'phones':
        setPhones(data as ProductType[]);
        return;
      case 'tablets':
        setTablets(data as ProductType[]);
        return;
      case 'accessories':
        setAccessories(data as ProductType[]);
        return;
      case 'allProducts':
        setProductsAll(data as ProductAllType[]);
        return;
      default:
        return;
    }
  }

  function findNessesaryItem(category: NameProducts, itemId: string) {
    switch (category) {
      case 'phones':
        return phones.find(item => item.id === itemId);
      case 'tablets':
        return tablets.find(item => item.id === itemId);
      case 'accessories':
        return accessories.find(item => item.id === itemId);
      default:
        return undefined;
    }
  }

  const value = {
    phones,
    tablets,
    accessories,
    productsAll,
    addToDB,
    findNessesaryItem,
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
