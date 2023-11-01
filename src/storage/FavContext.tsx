import React, { useMemo } from 'react';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../types/Product';

export type Context = {
  favProducts: Product[];
  addFav: (product: Product) => void;
  removeFav: (product: Product) => void;
};

export const FavContext = React.createContext<Context>({
  favProducts: [],
  addFav: () => { },
  removeFav: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const FavProvider: React.FC<Props> = ({ children }) => {
  const [
    favProducts, setFavProducts,
  ] = useLocalStorage<Product[]>('favProductsId', []);

  const addFav = (product: Product) => {
    setFavProducts([
      ...favProducts,
      product,
    ]);
  };

  const removeFav = (product: Product) => {
    setFavProducts(favProducts
      .filter(curProd => curProd.id !== product.id));
  };

  const value = useMemo(() => ({
    favProducts,
    addFav,
    removeFav,
  }), [favProducts]);

  return (
    <FavContext.Provider value={value}>
      {children}
    </FavContext.Provider>
  );
};
