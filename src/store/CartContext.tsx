import React, { useMemo } from 'react';
import { Phone } from '../types/Phone';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartContextProps = {
  cartProducts: Phone[];
  addToCart: (product: Phone) => void;
  deleteFromCart: (id: string) => void;
};

export const CartContext = React.createContext<CartContextProps>({
  cartProducts: [],
  addToCart: () => {},
  deleteFromCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<Phone[]>('cart', []);

  const addToCart = (product: Phone) => setCartProducts([
    ...cartProducts,
    product,
  ]);

  const deleteFromCart = (deleteId: string) => {
    const filteredCart = cartProducts.filter(({ id }) => id !== deleteId);

    setCartProducts(filteredCart);
  };

  const value = useMemo(() => ({
    cartProducts,
    addToCart,
    deleteFromCart,
  }), [cartProducts]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
