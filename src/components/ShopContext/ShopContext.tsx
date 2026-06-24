/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from '../../../public/api/types/ProductCard';

type CartItem = { product: Product; qty: number };

type State = {
  cart: Record<string, CartItem>;
  favorites: Record<string, Product>;
};

const MIN_QTY = 1;
const MAX_QTY = 10;

type Action =
  | { type: 'ADD_TO_CART'; product: Product; qty?: number }
  | { type: 'REMOVE_FROM_CART'; itemId: string }
  | { type: 'INCREMENT_QTY'; itemId: string }
  | { type: 'DECREMENT_QTY'; itemId: string }
  | { type: 'TOGGLE_LIKE'; product: Product }
  | { type: 'LOAD'; state: State }
  | { type: 'CLEAR_CART' };

const STORAGE_KEY = 'shop-state-v1';
const initialState: State = { cart: {}, favorites: {} };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const key = action.product.itemId;
      const existing = state.cart[key];
      const rawQty = (existing?.qty ?? 0) + (action.qty ?? 1);
      const qty = Math.min(rawQty, MAX_QTY);

      return {
        ...state,
        cart: { ...state.cart, [key]: { product: action.product, qty } },
      };
    }

    case 'REMOVE_FROM_CART': {
      const { [action.itemId]: _drop, ...rest } = state.cart;

      return { ...state, cart: rest };
    }

    case 'CLEAR_CART': {
      return { ...state, cart: {} };
    }

    case 'INCREMENT_QTY': {
      const item = state.cart[action.itemId];

      if (!item) {
        return state;
      }

      const qty = Math.min(item.qty + 1, MAX_QTY);

      return {
        ...state,
        cart: { ...state.cart, [action.itemId]: { ...item, qty } },
      };
    }

    case 'DECREMENT_QTY': {
      const item = state.cart[action.itemId];

      if (!item) {
        return state;
      }

      const qty = Math.max(item.qty - 1, MIN_QTY);

      return {
        ...state,
        cart: { ...state.cart, [action.itemId]: { ...item, qty } },
      };
    }

    case 'TOGGLE_LIKE': {
      const key = action.product.itemId;

      if (state.favorites[key]) {
        const { [key]: _drop, ...rest } = state.favorites;

        return { ...state, favorites: rest };
      }

      return {
        ...state,
        favorites: { ...state.favorites, [key]: action.product },
      };
    }

    case 'LOAD':
      return action.state;

    default:
      return state;
  }
}

type Ctx = {
  state: State;
  addToCart: (p: Product, qty?: number) => void;
  toggleLike: (p: Product) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
};

const ShopContext = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as State;

      dispatch({ type: 'LOAD', state: parsed });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      addToCart: (p, qty) => dispatch({ type: 'ADD_TO_CART', product: p, qty }),
      toggleLike: p => dispatch({ type: 'TOGGLE_LIKE', product: p }),
      incrementItem: id => dispatch({ type: 'INCREMENT_QTY', itemId: id }),
      decrementItem: id => dispatch({ type: 'DECREMENT_QTY', itemId: id }),
      removeFromCart: id => dispatch({ type: 'REMOVE_FROM_CART', itemId: id }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }),
    [state],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);

  if (!ctx) {
    throw new Error('useShop must be used within ShopProvider');
  }

  return ctx;
}
