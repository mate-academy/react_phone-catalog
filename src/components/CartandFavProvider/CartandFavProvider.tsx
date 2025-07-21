import { createContext, useState, SetStateAction, Dispatch } from 'react';
import { Product } from '../../types/Product';

type CartandFavContextType = {
  cart: Product[];
  fav: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
  setFav: Dispatch<SetStateAction<Product[]>>;
};

export const CartandFavContext = createContext<CartandFavContextType>({
  cart: [],
  fav: [],
  setCart: () => {},
  setFav: () => {},
});

export const CartandFavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [fav, setFav] = useState<Product[]>([]);

  return (
    <CartandFavContext.Provider value={{ cart, setCart, fav, setFav }}>
      {children}
    </CartandFavContext.Provider>
  );
};
