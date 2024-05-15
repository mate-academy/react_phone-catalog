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
};

export const StoreContext = React.createContext<PropsContext>({
  favouriteProducts: [],
  setFavouriteProducts: () => {},
  basketProducts: [],
  setBasketProducts: () => {},
  allProducts: [],
  setAllProducts: () => {},
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

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  const valueStore = useMemo(
    () => ({
      favouriteProducts,
      setFavouriteProducts,
      basketProducts,
      setBasketProducts,
      allProducts,
      setAllProducts,
    }),
    [
      favouriteProducts,
      setFavouriteProducts,
      basketProducts,
      setBasketProducts,
      allProducts,
      setAllProducts,
    ],
  );

  return (
    <StoreContext.Provider value={valueStore}>{children}</StoreContext.Provider>
  );
};
