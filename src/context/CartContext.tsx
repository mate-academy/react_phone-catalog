import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartContextType = {
  cart: string[],
  setCart: (v: string[]) => void,
  handleAddToCart: (id: string) => void,
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  handleAddToCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<string>('cart', []);

  function handleAddToCart(productId: string) {
    if (cart.includes(productId)) {
      setCart([...cart].filter(item => item !== productId));
    } else {
      setCart([...cart, productId]);
    }
  }

  const value = ({
    cart,
    setCart,
    handleAddToCart,
  });

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
