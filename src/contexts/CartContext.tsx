import React from 'react';
import { Product } from '../types';
import { useLocalStorage } from '../helpers/useLocalStorage';

interface State {
  cart: Product[];
  setCart: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  deleteProduct: (id: string) => void,
  deleteProductCopy: (id: string) => void,
}

const initialState: State = {
  cart: [],
  setCart: () => { },
  addToCart: () => { },
  deleteProduct: () => { },
  deleteProductCopy: () => { },
};

export const CartContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const addToCart = (product: Product) => {
    const newCart = [...cart, product];

    setCart(newCart);
  };

  const deleteProduct = (id: string) => {
    const newCart = [...cart.filter(item => item.id !== id)];

    setCart(newCart);
  };

  const deleteProductCopy = (id: string) => {
    const index = cart.findIndex(item => item.id === id);
    const newCart = [...cart];

    newCart.splice(index, 1);
    setCart(newCart);
  };

  const value: State = {
    cart,
    setCart,
    addToCart,
    deleteProduct,
    deleteProductCopy,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
