import React, { useMemo } from 'react';
import { Product, ProductBasket } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type PropsContext = {
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
  basketProducts: ProductBasket[];
  setBasketProducts: (products: ProductBasket[]) => void;
};

export const StoreContext = React.createContext<PropsContext>({
  favouriteProducts: [],
  setFavouriteProducts: () => {},
  basketProducts: [],
  setBasketProducts: () => {},
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

  const valueStore = useMemo(
    () => ({
      favouriteProducts,
      setFavouriteProducts,
      basketProducts,
      setBasketProducts,
    }),
    [
      favouriteProducts,
      setFavouriteProducts,
      basketProducts,
      setBasketProducts,
    ],
  );

  return (
    <StoreContext.Provider value={valueStore}>{children}</StoreContext.Provider>
  );
};
