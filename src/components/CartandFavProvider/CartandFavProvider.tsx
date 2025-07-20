import { createContext, useState } from 'react';
import { Product } from '../../types/Product';

export const CartandFavContext = createContext({
  cart: [] as Product[],
  fav: [] as Product[],
  setCart: () => {},
  setFav: () => {},
});

export const CartandFavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState([] as Product[]);
  const [fav, setFav] = useState([] as Product[]);

  return (
    <CartandFavContext.Provider value={{ cart, setCart, fav, setFav }}>
      {children}
    </CartandFavContext.Provider>
  );
};
