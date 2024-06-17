import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { getProducts } from '../api/products';
import { ProductGeneral } from '../types/ProductGeneral';
import { useLocalStorage } from '../hooks/useLocalStorage';

type InitialContext = {
  products: ProductGeneral[];
  likedItems: string[];
  setLikedItems: Dispatch<SetStateAction<string[]>>;
  addedItems: string[];
  setAddedItems: Dispatch<SetStateAction<string[]>>;
};

const initialContext: InitialContext = {
  products: [],
  likedItems: [],
  setLikedItems: () => {},
  addedItems: [],
  setAddedItems: () => {},
};

export const ProductContext =
  React.createContext<InitialContext>(initialContext);

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<ProductGeneral[]>(
    'products',
    [],
  );
  const [likedItems, setLikedItems] = useLocalStorage<string[]>(
    'likedItems',
    [],
  );
  const [addedItems, setAddedItems] = useLocalStorage<string[]>(
    'addedItems',
    [],
  );

  useEffect(() => {
    getProducts().then(newProducts => {
      setProducts(() => newProducts);
    });
  }, []);

  const value = useMemo(() => {
    return {
      products,
      likedItems,
      setLikedItems,
      addedItems,
      setAddedItems,
    };
  }, [products, likedItems, setLikedItems, addedItems, setAddedItems]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
