import { createContext, PropsWithChildren, useContext, useState } from 'react';

type CartContextType = {
  cart: string[];
  toggleCart: (id: string) => void;
  deleteCart?: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  const toggleCart = (id: string) => {
    const updatedCart = cart.includes(id)
      ? cart.filter(item => item !== id)
      : [...cart, id];

    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const deleteCart = (id: string) => {
    const updatedCart = cart.includes(id)
      ? cart.filter(item => item !== id)
      : [...cart];

    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, toggleCart, deleteCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart Error');
  }

  return context;
};
