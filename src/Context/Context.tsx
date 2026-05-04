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

type Props = { someFlag?: boolean } & React.PropsWithChildren<{}>;

const STORAGE_KEY = 'cart';

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const payloadId =
        typeof action.payload.id === 'number'
          ? String(action.payload.id)
          : action.payload.id;
      const exists = state.items.find(i => i.id === payloadId);

      if (exists) {
        return state;
      } // do nothing if already in cart

      return {
        ...state,
        items: [
          ...state.items,
          { id: action.payload.id, product: action.payload, quantity: 1 },
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
  const init = () => readCart() as CartState;

  const [state, dispatch] = useReducer<React.Reducer<CartState, CartAction>>(
    cartReducer,
    undefined,
    init,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore storage errors */
    }
  }, [state]);
  const addToCart = useCallback(
    (product: Products) =>
      (dispatch as React.Dispatch<CartAction>)({
        type: 'ADD',
        payload: product,
      }),
    [dispatch],
  );

  const removeFromCart = useCallback(
    (id: string) =>
      (dispatch as React.Dispatch<CartAction>)({ type: 'REMOVE', payload: id }),
    [dispatch],
  );
  const changeQuantity = useCallback(
    (id: string, quantity: number) =>
      (dispatch as React.Dispatch<CartAction>)({
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

  const clearCart = useCallback(
    () => (dispatch as React.Dispatch<CartAction>)({ type: 'CLEAR' }),
    [dispatch],
  );

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
