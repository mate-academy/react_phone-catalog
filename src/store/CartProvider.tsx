import React, { useEffect, useState } from 'react';
import { CART_ITEMS_KEY } from '../constants/constants';
import { Cart } from '../types/Cart';
import { Product } from '../types/Product';
import { getLocalStorage } from '../utils';

type Props = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<{
  cart: Cart[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearProductsCart: () => void;
}>({
  cart: [],
  addProduct: () => {},
  deleteProduct: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearProductsCart: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Cart[]>(() => {
    return getLocalStorage(CART_ITEMS_KEY);
  });

  useEffect(() => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product: Product) => {
    const newProduct = { id: product.id, quantity: 1, product };
    const isHaveProduct = cart.some(item => item.id === newProduct.id);

    if (!isHaveProduct) {
      setCart([...cart, newProduct]);
    }
  };

  const increaseQuantity = (id: number) => {
    const result = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: ++item.quantity };
      }

      return { ...item };
    });

    setCart(result);
  };

  const decreaseQuantity = (id: number) => {
    const result = cart.map(item => {
      if (item.quantity > 1 && item.id === id) {
        return { ...item, quantity: --item.quantity };
      }

      return { ...item };
    });

    setCart(result);
  };

  const deleteProduct = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearProductsCart = () => {
    setCart([]);
  };

  const getStoreValues = () => {
    return {
      cart,
      addProduct,
      deleteProduct,
      increaseQuantity,
      decreaseQuantity,
      clearProductsCart,
    };
  };

  return (
    <CartContext.Provider value={getStoreValues()}>
      {children}
    </CartContext.Provider>
  );
};
