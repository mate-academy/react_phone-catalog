import React from 'react';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { CartItem, Product } from '../types';

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'CLEAR' };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.find(item => item.id === action.product.itemId);

      if (exists) {
        return state;
      }

      return [
        ...state,
        { id: action.product.itemId, quantity: 1, product: action.product },
      ];
    }

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id);

    case 'INCREMENT':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      );

    case 'DECREMENT':
      return state.map(item =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

    case 'CLEAR':
      return [];

    default:
      return state;
  }
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'cart';

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, [], loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) =>
    dispatch({ type: 'ADD_ITEM', product });
  const removeFromCart = (id: string) => dispatch({ type: 'REMOVE_ITEM', id });
  const increment = (id: string) => dispatch({ type: 'INCREMENT', id });
  const decrement = (id: string) => dispatch({ type: 'DECREMENT', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const isInCart = (itemId: string) => cart.some(item => item.id === itemId);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be inside CartProvider');
  }

  return ctx;
};
