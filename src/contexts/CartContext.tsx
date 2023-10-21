import { createContext, useEffect, useState } from 'react';
import { CartItem } from '../types/CartItem';

type CartContextType = {
  cartItems: CartItem[],
  setCartItems: (items: CartItem[]) => void,
  totalSum: number,
  totalQuantity: number,
};

type Props = {
  children: React.ReactNode,
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  totalSum: 0,
  totalQuantity: 0,
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  let totalSum = 0;
  let totalQuantity = 0;

  cartItems.forEach(item => {
    totalSum += item.product.price * item.quantity;
    totalQuantity += item.quantity;
  });

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');

    if (savedCartItems === null) {
      return;
    }

    try {
      setCartItems(JSON.parse(savedCartItems));
    } catch {
      localStorage.removeItem('cartItems');
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalSum,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
