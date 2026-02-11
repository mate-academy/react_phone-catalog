// src/context/CartContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';

type Product = {
  id: string | number;
  name: string;
  images?: string[];
  capacity?: string;
  price?: number;
  fullPrice?: number;
  priceRegular?: number;
  priceDiscount?: number;
  screen?: string;
  ram?: string;
};

type CartItem = Product & { quantity: number };

type State = {
  cartItems: CartItem[];
  favourites: Product[];
};

type Action =
  | { type: 'INIT'; payload: Partial<State> }
  | { type: 'ADD'; payload: Product }
  | { type: 'REMOVE'; payload: string | number }
  | { type: 'UPDATE_QTY'; payload: { id: string | number; quantity: number } }
  | { type: 'TOGGLE_FAV'; payload: Product };

const STORAGE_KEY = 'react_phone_cart_v1';
const FAVS_KEY = 'react_phone_favs_v1';

const initialState: State = { cartItems: [], favourites: [] };

function normalizeProductPrice(p: Product): Product {
  const normalized = { ...p };
  if (p.price !== undefined && p.fullPrice !== undefined) {
    normalized.priceRegular = p.fullPrice;
    normalized.priceDiscount = p.price;
  } else if (p.price !== undefined && normalized.priceRegular === undefined) {
    normalized.priceRegular = p.price;
  }
  return normalized;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT': {
      return { ...state, ...action.payload } as State;
    }
    case 'ADD': {
      const p = normalizeProductPrice(action.payload);
      const pid = p.id.toString();
      const existing = state.cartItems.find(i => i.id.toString() === pid);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.id.toString() === pid ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...p, quantity: 1 }],
      };
    }
    case 'REMOVE': {
      const rid = action.payload.toString();
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.id.toString() !== rid),
      };
    }
    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      const sid = id.toString();
      return {
        ...state,
        cartItems: state.cartItems.map(i =>
          i.id.toString() === sid
            ? { ...i, quantity: Math.max(1, Math.floor(quantity)) }
            : i,
        ),
      };
    }
    case 'TOGGLE_FAV': {
      const p = action.payload;
      const pid = p.id.toString();
      const exists = state.favourites.some(f => f.id.toString() === pid);
      return {
        ...state,
        favourites: exists
          ? state.favourites.filter(f => f.id.toString() !== pid)
          : [...state.favourites, p],
      };
    }
    default:
      return state;
  }
}

const CartContext = createContext<any>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // init from localStorage once
  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(STORAGE_KEY);
      const rawFavs = localStorage.getItem(FAVS_KEY);
      const cart = rawCart ? JSON.parse(rawCart) : [];
      const favs = rawFavs ? JSON.parse(rawFavs) : [];
      dispatch({
        type: 'INIT',
        payload: { cartItems: cart, favourites: favs },
      });
      console.log('[CartContext] INIT from localStorage', { cart, favs });
    } catch (e) {
      console.error('[CartContext] init error', e);
    }
  }, []);

  // persist cartItems
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cartItems));
    } catch (e) {
      console.error('[CartContext] write cart error', e);
    }
  }, [state.cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVS_KEY, JSON.stringify(state.favourites));
    } catch (e) {
      console.error('[CartContext] write favs error', e);
    }
  }, [state.favourites]);

  // helpers
  const addToCart = (product: Product) => {
    console.log('[CartContext] addToCart', product.id);
    dispatch({ type: 'ADD', payload: product });
  };

  const removeFromCart = (id: string | number) => {
    console.log('[CartContext] removeFromCart', id);
    dispatch({ type: 'REMOVE', payload: id });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    console.log('[CartContext] updateQuantity', id, quantity);
    dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  };

  const addToFavourites = (product: Product) => {
    console.log('[CartContext] toggleFav', product.id);
    dispatch({ type: 'TOGGLE_FAV', payload: product });
  };

  const removeFromFavourites = (id: string | number) => {
    console.log('[CartContext] removeFav', id);
    dispatch({ type: 'TOGGLE_FAV', payload: { id } as any });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        favourites: state.favourites,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
};
