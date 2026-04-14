import React, { createContext, useContext } from 'react';
import { CartItem, Product } from '../types/Product';
import { useProductlist } from '../hooks/useLocalStorageList/useProductList';

interface Props {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  deleteFromCart: (id: string) => void;
  isProductInCart(id: string): boolean;
  decreaseQuantity: (id: string) => void;
  increaseQuantity: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<Props | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { items, add, remove, has, increaseQuantity, decreaseQuantity, clearCart } =
    useProductlist('cart');

  return (
    <CartContext.Provider
      value={{
        cartItems: items as CartItem[],
        addToCart: add,
        deleteFromCart: remove,
        isProductInCart: has,
        increaseQuantity: increaseQuantity,
        decreaseQuantity: decreaseQuantity,
        clearCart: clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
