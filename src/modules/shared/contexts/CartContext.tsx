import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Products } from '../types/Products';

export interface CartItem {
  id: Products['id'];
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  totalQuantity: number;
  isInCart: (id: Products['id']) => boolean;
  getQuantity: (id: Products['id']) => number;
  addToCart: (id: Products['id']) => void;
  removeFromCart: (id: Products['id']) => void;
  increaseQuantity: (id: Products['id']) => void;
  decreaseQuantity: (id: Products['id']) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const isInCart = (id: Products['id']) =>
    cartItems.some(item => item.id === id);

  const getQuantity = (id: Products['id']) =>
    cartItems.find(item => item.id === id)?.quantity ?? 0;

  const addToCart = (id: Products['id']) => {
    setCartItems(current => {
      if (current.some(item => item.id === id)) {
        return current.filter(a => a.id !== id);
      }

      return [...current, { id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: Products['id']) => {
    setCartItems(current => current.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: Products['id']) => {
    setCartItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: Products['id']) => {
    setCartItems(current =>
      current.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextValue = {
    cartItems,
    totalQuantity,
    isInCart,
    getQuantity,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
