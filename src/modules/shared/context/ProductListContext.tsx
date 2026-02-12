import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { Product } from '../types/Product';
import products from '../../../../public/api/products.json';

type ProductListContextType = {
  productList: Product[];
  setProductList: Dispatch<SetStateAction<Product[]>>;

  phonesAmount: number;
  tabletsAmount: number;
  accessoriesAmount: number;

  isAside: boolean;
  setIsAside: Dispatch<SetStateAction<boolean>>;
};

export const ProductListContext = createContext<ProductListContextType>({
  productList: [],
  setProductList: () => {},
  phonesAmount: 0,
  tabletsAmount: 0,
  accessoriesAmount: 0,
  isAside: false,
  setIsAside: () => {},
});

export const ProductListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [productList, setProductList] = useState<Product[]>(products);
  const phonesAmount = productList.filter(p => p.category === 'phones').length;
  const tabletsAmount = productList.filter(
    p => p.category === 'tablets',
  ).length;
  const accessoriesAmount = productList.filter(
    p => p.category === 'accessories',
  ).length;

  const [isAside, setIsAside] = useState(false);

  return (
    <ProductListContext.Provider
      value={{
        productList,
        setProductList,
        phonesAmount,
        tabletsAmount,
        accessoriesAmount,
        isAside,
        setIsAside,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};
