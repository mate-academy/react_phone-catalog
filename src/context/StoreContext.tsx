import React, { useEffect, useMemo, useState } from 'react';
import { Product, ProductBasket } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getProducts } from '../utils/api';

type PropsContext = {
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
  basketProducts: ProductBasket[];
  setBasketProducts: (products: ProductBasket[]) => void;
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  isErrorOfLoading: boolean;
  setIsErrorOfLoading: (value: boolean) => void;
};

export const StoreContext = React.createContext<PropsContext>({
  favouriteProducts: [],
  setFavouriteProducts: () => {},
  basketProducts: [],
  setBasketProducts: () => {},
  allProducts: [],
  setAllProducts: () => {},
  isErrorOfLoading: false,
  setIsErrorOfLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProducts, setFavouriteProducts] = useLocalStorage<Product[]>(
    'favourite',
    [],
  );
  const [basketProducts, setBasketProducts] = useLocalStorage<ProductBasket[]>(
    'basket',
    [],
  );

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isErrorOfLoading, setIsErrorOfLoading] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setAllProducts)
      .catch(error => {
        setIsErrorOfLoading(true);
        throw error;
      });
    // .finally(() => {
    //   setTimeout(() => {
    //     setIsErrorOfLoading(false);
    //   }, 3000);
    // });
  }, []);

  const valueStore = useMemo(
    () => ({
      favouriteProducts,
      setFavouriteProducts,
      basketProducts,
      setBasketProducts,
      allProducts,
      setAllProducts,
      isErrorOfLoading,
      setIsErrorOfLoading,
    }),
    [
      favouriteProducts,
      setFavouriteProducts,
      basketProducts,
      setBasketProducts,
      allProducts,
      setAllProducts,
      isErrorOfLoading,
      setIsErrorOfLoading,
    ],
  );

  return (
    <StoreContext.Provider value={valueStore}>{children}</StoreContext.Provider>
  );
};
