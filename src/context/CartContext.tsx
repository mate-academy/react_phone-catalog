import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

/* ---------- helpers ---------- */

const STORAGE_KEY = 'cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/* ---------- actions ---------- */

type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: number }
  | { type: 'INCREMENT'; productId: number }
  | { type: 'DECREMENT'; productId: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.product.id === action.product.id);

      if (exists) {
        return state;
      }

      return [
        ...state,
        { id: action.product.id, quantity: 1, product: action.product },
      ];
    }

    case 'REMOVE':
      return state.filter(i => i.product.id !== action.productId);

    case 'INCREMENT':
      return state.map(i =>
        i.product.id === action.productId
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      );

    case 'DECREMENT':
      return state.map(i =>
        i.product.id === action.productId && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      );

    case 'CLEAR':
      return [];

    default:
      return state;
  }
}

/* ---------- context ---------- */

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  totalItems: number;
  totalPrice: number;
  toggleCartItem: (product: Product) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increment: () => {},
  decrement: () => {},
  clearCart: () => {},
  isInCart: () => false,
  totalItems: 0,
  totalPrice: 0,
  toggleCartItem: () => {},
});

export const useCart = () => useContext(CartContext);

/* ---------- provider ---------- */

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = (product: Product) => dispatch({ type: 'ADD', product });

  const removeFromCart = (productId: number) =>
    dispatch({ type: 'REMOVE', productId });

  const increment = (productId: number) =>
    dispatch({ type: 'INCREMENT', productId });

  const decrement = (productId: number) =>
    dispatch({ type: 'DECREMENT', productId });

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const isInCart = (productId: number) =>
    items.some(i => i.product.id === productId);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const toggleCartItem = (product: Product) => {
    const exists = items.find(i => i.product.id === product.id);

    if (exists) {
      dispatch({ type: 'REMOVE', productId: product.id });
    } else {
      dispatch({ type: 'ADD', product });
    }
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    isInCart,
    totalItems,
    totalPrice,
    toggleCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
