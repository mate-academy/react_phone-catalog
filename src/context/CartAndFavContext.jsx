import React, { useEffect, useState } from 'react';
// import { TodoContextType } from '../../types/TodoContextType';

export const CartAndFavContext = React.createContext(null);

// type Props = {
//   children: React.ReactNode;
// };

export const CartAndFavProvider = ({ children }) => {
  const fav = JSON.parse(localStorage.getItem('favProducts'));
  const cart = JSON.parse(localStorage.getItem('cartProducts'));

  // console.log(cart);

  const [cartProducts, setCartProducts] = useState(cart || []);
  const [favProducts, setFavProducts] = useState(fav || []);
  const [visbleFavProducts, setVisbleFavProducts] = useState(favProducts);

  // const [visibleTodos, setVisibleTodos] = useState(todos);

  return (
    <CartAndFavContext.Provider value={{
      cartProducts,
      setCartProducts,
      favProducts,
      setFavProducts,
      visbleFavProducts,
      setVisbleFavProducts,
    }}
    >
      {children}
    </CartAndFavContext.Provider>
  );
};
