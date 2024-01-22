/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';

type State = {
  cart: Product[],
  setCart: (favProducts: Product[]) => void,
  visibleProducts: Product[],
  countProductInCart: (productId: string) => number,
  handleAddToCart: (product: Product) => void,
  removeProduct: (productId: string) => void,
  decrease: (productId: string) => void,
  increase: (product: Product) => void,
};

export const CartContext = React.createContext<State>({
  cart: [],
  setCart: () => {},
  visibleProducts: [],
  countProductInCart: () => 0,
  handleAddToCart: () => {},
  removeProduct: () => {},
  decrease: () => {},
  increase: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const idsAdded: string[] = [];

  const visibleProducts = cart.filter(product => {
    if (idsAdded.includes(product.id)) {
      return false;
    }

    idsAdded.push(product.id);

    return true;
  });

  const countProductInCart = (productId: string) => {
    return cart.filter(item => item.id === productId).length;
  };

  const handleAddToCart = (product: Product) => {
    if (cart.some(item => item.id === product.id)) {
      setCart((currentCart: Product[]) => (
        currentCart.filter(item => item.id !== product.id)
      ));
    } else {
      setCart((currentFavs: Product[]) => [...currentFavs, product]);
    }
  };

  const removeProduct = (productId: string) => {
    setCart((currentCart: Product[]) => (
      currentCart.filter(item => item.id !== productId)
    ));
  };

  const decrease = (productId: string) => {
    setCart((currentCart: Product[]) => {
      const index = currentCart
        .reverse()
        .findIndex(item => item.id === productId);

      return currentCart
        .slice(0, index)
        .concat(currentCart.slice(index + 1))
        .reverse();
    });
  };

  const increase = (product: Product) => {
    setCart((currentFavs: Product[]) => [...currentFavs, product]);
  };

  const value = useMemo(() => ({
    cart,
    setCart,
    visibleProducts,
    countProductInCart,
    handleAddToCart,
    removeProduct,
    decrease,
    increase,
  }), [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
