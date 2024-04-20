import React, { useEffect, useMemo, useState } from 'react';
import { Products } from '../type/Products';
import { getProducts } from '../api';

type ContextType = {
  // id: number | null;
  // setId: React.Dispatch<React.SetStateAction<number | null>>;
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  favorite: Products[];
  setFavorite: React.Dispatch<React.SetStateAction<Products[]>>;
};

export const Context = React.createContext<ContextType>({
  // id: null,
  // setId: () => {},
  products: [],
  setProducts: () => {},
  favorite: [],
  setFavorite: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  // const [id, setId] = useState<number | null>(null);
  const [products, setProducts] = useState<Products[]>([]);
  const [favorite, setFavorite] = useState<Products[]>([]);

  // const value = {
  //   // id,
  //   // setId,
  //   products,
  //   setProducts,
  //   // favorite,
  //   // setFavorite,
  // };

  const value = useMemo(
    () => ({
      products,
      setProducts,
      favorite,
      setFavorite,
    }),
    [products, favorite],
  );

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      setProducts(data);
    });
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
