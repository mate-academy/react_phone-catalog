import { createContext, SetStateAction, Dispatch } from 'react';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalstorage';
import { CartItem } from '../../types/CartItem';

type CartandFavContextType = {
  cart: CartItem[];
  fav: Product[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
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
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [fav, setFav] = useLocalStorage<Product[]>('fav', []);

  return (
    <CartandFavContext.Provider value={{ cart, setCart, fav, setFav }}>
      {children}
    </CartandFavContext.Provider>
  );
};
