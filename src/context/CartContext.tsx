import { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

const CART_KEY = 'cart';

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
};

type Props = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_KEY);

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart) as CartItem[];
  });

  const addToCart = (product: Product) => {
    setCart(currentItems => {
      const isAlreadyAdded = currentItems.some(
        item => item.product.id === product.id,
      );

      if (isAlreadyAdded) {
        return currentItems;
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(currentItems =>
      currentItems.filter(item => item.product.id !== productId),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (productId: number) => {
    setCart(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart(currentItems =>
      currentItems.map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
