import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CART_KEY = 'cartProducts';

type CartProducts = {
  cartProducts: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  increaseCount: (id: string) => void;
  decreaseCount: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartProducts | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

type CartItem = {
  id: string;
  quantity: number;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<CartItem[]>(
    CART_KEY,
    [],
  );

  const addToCart = (id: string) => {
    setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
  };

  const removeFromCart = (id: string) => {
    setCartProducts(cartProducts.filter(cart => cart.id !== id));
  };

  const isInCart = (id: string) => cartProducts.some(cart => cart.id === id);

  const increaseCount = (id: string) => {
    const updateCartProducts = cartProducts.map(cart => {
      if (cart.id === id) {
        return {
          ...cart,
          quantity: cart.quantity + 1,
        };
      } else {
        return cart;
      }
    });

    setCartProducts(updateCartProducts);
  };

  const decreaseCount = (id: string) => {
    const updateCartProducts = cartProducts.map(cart => {
      if (cart.id === id) {
        return {
          ...cart,
          quantity: cart.quantity - 1,
        };
      } else {
        return cart;
      }
    });

    setCartProducts(updateCartProducts);
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        isInCart,
        increaseCount,
        decreaseCount,
        clearCart,
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
