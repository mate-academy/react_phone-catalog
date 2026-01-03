import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { createContext, useContext } from 'react';

import {
  ProductAllType,
  ProductType,
  ProductTypeForAccessory,
} from '../types/Product';
import { nameProducts } from '../types/NameProducts';

type Props = {
  children: React.ReactNode;
};

type CombinedProductType =
  | ProductType
  | ProductTypeForAccessory
  | ProductAllType;

type ProductsContextType = {
  phones: ProductType[];
  tablets: ProductType[];
  accessories: ProductTypeForAccessory[];
  productsAll: ProductAllType[];
  addToDB: (params: nameProducts, data: CombinedProductType[]) => void;
};

const ProductsContext = createContext<ProductsContextType>({
  phones: [],
  tablets: [],
  accessories: [],
  productsAll: [],
  addToDB: () => {},
});

// type ProductCategory = 'phones' | 'tablets' | 'accessories';

export const ProductsProvider: FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [tablets, setTablets] = useState<ProductType[]>([]);
  const [accessories, setAccessories] = useState<ProductTypeForAccessory[]>([]);
  const [productsAll, setProductsAll] = useState<ProductAllType[]>([]);

  function addToDB(params: nameProducts, data: CombinedProductType[]) {
    switch (params) {
      case 'phones':
        setPhones(data as ProductType[]);
        return;
      case 'tablets':
        setTablets(data as ProductType[]);
        return;
      case 'accessories':
        setAccessories(data as ProductTypeForAccessory[]);
        return;
      case 'allProducts':
        setProductsAll(data as ProductAllType[]);
        return;
      default:
        return;
    }
  }

  function findNessesaryItem(category: nameProducts, itemId: string) {
    switch (category) {
      case 'phones':
        return phones.find(item => item.id === itemId)!;
      case 'tablets':
        return tablets.find(item => item.id === itemId)!;
      case 'accessories':
        return accessories.find(item => item.id === itemId)!;
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
