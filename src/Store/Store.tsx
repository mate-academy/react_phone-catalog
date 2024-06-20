/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useMemo, useState } from 'react';
import { Products } from '../type/Products';
import { getProducts } from '../api';
import { Phone } from '../type/Phone';
import { CartsProducts } from '../type/Carts';

type ContextType = {
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  favorite: Products[];
  setFavorite: React.Dispatch<React.SetStateAction<Products[]>>;
  carts: CartsProducts[];
  setCarts: React.Dispatch<React.SetStateAction<CartsProducts[]>>;
  phones: Phone[];
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
  burgerMenuOpen: boolean;
  setBurgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Context = React.createContext<ContextType>({
  products: [],
  setProducts: () => {},
  favorite: [],
  setFavorite: () => {},
  carts: [],
  setCarts: () => {},
  phones: [],
  setPhones: () => {},
  burgerMenuOpen: false,
  setBurgerMenuOpen: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [favorite, setFavorite] = useState<Products[]>([]);
  const [carts, setCarts] = useState<Array<{ count: number } & Products>>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    }

    if (favorite.length > 0) {
      localStorage.setItem('favorite', JSON.stringify(favorite));
    }
  }, [carts, favorite]);

  useEffect(() => {
    const localCarts = localStorage.getItem('favorite');

    if (localCarts) {
      const test = JSON.parse(localCarts);

      setFavorite(test);
    }
  }, []);

  useEffect(() => {
    const localFavorite = localStorage.getItem('carts');

    if (localFavorite) {
      const test = JSON.parse(localFavorite);

      setCarts(test);
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      favorite,
      setFavorite,
      carts,
      setCarts,
      phones,
      setPhones,
      burgerMenuOpen,
      setBurgerMenuOpen,
    }),
    [products, favorite, carts, phones, burgerMenuOpen],
  );

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      setProducts(data);
    });
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
