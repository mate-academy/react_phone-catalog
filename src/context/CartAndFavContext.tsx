import React, { useMemo, useState } from 'react';
import { Product } from '../types/types';

interface CartAndFavContextValue {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  favProducts: Product[];
  setFavProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  visibleFavProducts: Product[];
  setVisibleFavProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isAddedToCart: boolean;
  setIsAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  isAddedToFav: boolean;
  setIsAddedToFav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartAndFavContext
= React.createContext<CartAndFavContextValue | null>(null);
type Props = {
  children: React.ReactNode;
};

export const CartAndFavProvider: React.FC<Props> = ({ children }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);

  const fav = useMemo(() => JSON.parse(
    localStorage.getItem('favProducts') || '[]',
  ), []);
  const cart = useMemo(() => JSON.parse(
    localStorage.getItem('cartProducts') || '[]',
  ), []);

  const [cartProducts, setCartProducts] = useState(cart || []);
  const [favProducts, setFavProducts] = useState(fav || []);
  const [visibleFavProducts, setVisibleFavProducts] = useState(favProducts);

  return (
    <CartAndFavContext.Provider value={{
      cartProducts,
      setCartProducts,
      favProducts,
      setFavProducts,
      visibleFavProducts,
      setVisibleFavProducts,
      isAddedToCart,
      setIsAddedToCart,
      isAddedToFav,
      setIsAddedToFav,
    }}
    >
      {children}
    </CartAndFavContext.Provider>
  );
};
