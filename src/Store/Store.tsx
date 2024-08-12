/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useMemo, useState } from 'react';
import { Products } from '../type/Products';
import { getProducts } from '../api';
import { Device } from '../type/Device';
import { CartsProducts } from '../type/Carts';

type ContextType = {
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  favorite: Products[];
  setFavorite: React.Dispatch<React.SetStateAction<Products[]>>;
  carts: CartsProducts[];
  setCarts: React.Dispatch<React.SetStateAction<CartsProducts[]>>;
  phones: Device[];
  setPhones: React.Dispatch<React.SetStateAction<Device[]>>;
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
  const [phones, setPhones] = useState<Device[]>([]);
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
    const localFavorite = localStorage.getItem('favorite');

    if (localFavorite) {
      const fav = JSON.parse(localFavorite);

      setFavorite(fav);
    }
  }, []);

  useEffect(() => {
    const localCarts = localStorage.getItem('carts');

    if (localCarts) {
      const cart = JSON.parse(localCarts);

      setCarts(cart);
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
