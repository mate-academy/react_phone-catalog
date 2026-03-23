import { useReducer } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { CartProduct } from '../../types/types';
import { CartAction, cartReducer } from './CartReducer';
import { getLocaleStorage } from './../../utils/getLocaleStorage';

type CartType = {
  cart: CartProduct[];
  setCart: React.Dispatch<CartAction>;
};

export const CartContext = createContext<CartType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useReducer(cartReducer, [], () =>
    getLocaleStorage('cart'),
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
