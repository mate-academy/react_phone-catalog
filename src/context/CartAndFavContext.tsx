import React, { useState } from 'react';

export const CartAndFavContext
= React.createContext<any | null>(null);
type Props = {
  children: React.ReactNode;
};

export const CartAndFavProvider: React.FC<Props> = ({ children }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);

  const fav = JSON.parse(localStorage.getItem('favProducts') as string);
  const cart = JSON.parse(localStorage.getItem('cartProducts') as string);

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
