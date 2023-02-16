import React, { useState } from 'react';

export const CartAndFavContext = React.createContext(null);

export const CartAndFavProvider = ({ children }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);

  const fav = JSON.parse(localStorage.getItem('favProducts'));
  const cart = JSON.parse(localStorage.getItem('cartProducts'));

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
