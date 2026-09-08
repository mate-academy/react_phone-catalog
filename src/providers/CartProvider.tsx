import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  Dispatch,
} from 'react';
import { CartAction, CartItem, CartReducer } from './CartReducer';

type CartContextType = {
  cart: CartItem[];
  dispatch: Dispatch<CartAction>;
};

type Props = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const initCart = () => {
    try {
      const stored = localStorage.getItem('cart');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [cart, dispatch] = useReducer(CartReducer, [], initCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
