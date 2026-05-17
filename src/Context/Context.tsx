/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CartState,
  CartAction,
  CartItem,
  CartContextType,
} from '../types/Context';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { Products } from '../types/Products';

type Props = React.PropsWithChildren<{ someFlag?: boolean }>;

const STORAGE_KEY = 'cart';

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { items: [] };
    }

    const parsed = JSON.parse(raw);

    return {
      items: Array.isArray(parsed.items)
        ? parsed.items.map((item: CartItem) => ({
            ...item,
            id: String(item.id),
          }))
        : [],
    };
  } catch {
    return { items: [] };
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const payloadId = String(action.payload.id);
      const normalizedPayload = {
        ...action.payload,
        id: payloadId,
      };
      const exists = state.items.find(i => i.id === payloadId);

      if (exists) {
        return state;
      } // do nothing if already in cart

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: payloadId,
            product: normalizedPayload,
            quantity: 1,
          },
        ],
      };
    }

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
      };
    case 'CHANGE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i,
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, readCart());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore storage errors */
    }
  }, [state]);
  const addToCart = useCallback(
    (product: Products) =>
      dispatch({
        type: 'ADD',
        payload: product,
      }),
    [dispatch],
  );

  const removeFromCart = useCallback(
    (id: string) => dispatch({ type: 'REMOVE', payload: id }),
    [dispatch],
  );
  const changeQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({
        type: 'CHANGE_QTY',
        payload: { id, quantity },
      }),
    [dispatch],
  );

  const isInCart = useCallback(
    (id: string | number) => {
      const nid = typeof id === 'number' ? String(id) : id;

      return state.items.some(i => i.id === nid);
    },
    [state.items],
  );

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [dispatch]);

  const totalQuantity = state.items.reduce(
    (s: number, it: CartItem) => s + it.quantity,
    0,
  );
  const totalPrice = state.items.reduce(
    (s: number, it: CartItem) => s + it.quantity * (it.product.price || 0),
    0,
  );
  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    isInCart,
    totalQuantity,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return ctx;
}
