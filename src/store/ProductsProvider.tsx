import React, { useEffect, useState } from 'react';
import { ProductGeneral } from '../types/ProductGeneral';
import { getProducts } from '../api/products';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type AddedProduct = {
  id: string;
  img: string;
  title: string;
  price: number;
  count: number;
};

interface State {
  products: ProductGeneral[];
  setProducts: (v: ProductGeneral[]) => void;
  productsError: boolean;
  setProductsError: (v: boolean) => void;
  likedProducts: string[];
  setLikedProducts: (v: string[]) => void;
  addedProducts: AddedProduct[];
  setAddedProducts: (v: AddedProduct[]) => void;
}

const initialState: State = {
  products: [],
  setProducts: () => {},
  productsError: false,
  setProductsError: () => {},
  likedProducts: [],
  setLikedProducts: () => {},
  addedProducts: [],
  setAddedProducts: () => {},
};

export const ProductsContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductGeneral[]>(
    initialState.products,
  );

  const [productsError, setProductsError] = useState<boolean>(
    initialState.productsError,
  );

  const [likedProducts, setLikedProducts] = useLocalStorage<string[]>(
    'likedProducts',
    initialState.likedProducts,
  );

  const [addedProducts, setAddedProducts] = useLocalStorage(
    'addedProducts',
    initialState.addedProducts,
  );

  useEffect(() => {
    getProducts()
      .then(productsFromServer => {
        setProducts(productsFromServer);
      })
      .catch(() => setProductsError(true));
  }, []);

  const value: State = {
    products,
    setProducts,
    productsError,
    setProductsError,
    likedProducts,
    setLikedProducts,
    addedProducts,
    setAddedProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
