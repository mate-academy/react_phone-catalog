import { createContext, useContext, useState } from 'react';
import { BaseProduct } from '../../../types/BaseProduct';

export type CartItems = BaseProduct & { quantity: number };

type CartContextType = {
  cartItems: CartItems[];
  addToCart: (product: BaseProduct) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const addToCart = (product: BaseProduct) => {
    setCartItems([
      ...cartItems,
      { ...product, id: String(product.id), quantity: 1 },
    ]);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => String(item.id) !== id));
  };

  const isInCart = (id: string) => {
    return cartItems.some(item => String(item.id) === id);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map(item =>
        String(item.id) === id ? { ...item, quantity } : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, isInCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
