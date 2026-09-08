import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ProductType } from '../modules/shared/types/ProductType';
import { CartItem } from '../modules/shared/types/CartItem';

type CartContextType = {
  cart: CartItem[];
  totalCardQuantity: number;
  isInCart: (productId: number) => boolean;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

// eslint-disable-next-line prettier/prettier
export const CartContext = React.createContext<CartContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const isInCart = (productId: number) => {
    return cart.some((item: CartItem) => item.product.id === productId);
  };

  const totalCardQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    setCart((prevCart): CartItem[] => {
      const itemIndex = prevCart.findIndex(
        item => item.product.id === product.id,
      );

      if (itemIndex !== -1) {
        return prevCart;
      }

      return [...prevCart, { id: product.id, product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = useMemo(
    () => ({
      clearCart,
      setCart,
      updateQuantity,
      removeFromCart,
      addToCart,
      cart,
      isInCart,
      totalCardQuantity,
    }),
    [cart, totalCardQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};
