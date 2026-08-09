/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useMemo } from 'react';

import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (product: Product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCart(
      cart.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart(
      cart
        .map(item =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
