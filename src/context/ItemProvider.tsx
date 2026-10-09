import { createContext, useEffect, useMemo, useReducer } from 'react';
import { Product } from '../types/Product';
import React from 'react';

export interface CartItemType {
  product: Product;
  quantity: number;
}

export type Action =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'INCREMENT'; id: string | number }
  | { type: 'DECREMENT'; id: string | number }
  | { type: 'REMOVE_ITEM'; id: string | number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'TOGGLE_FAV'; product: Product };

const STORAGE_KEY = 'cart_items';
const FAV_STORAGE_KEY = 'fav_items';

interface State {
  cart: CartItemType[];
  error: string | null;
  totalCount: number;
  totalPrice: number;
  fav: Product[];
}

const initCartState = (defaultState: State): State => {
  let savedCart: CartItemType[] = [];
  let savedFav: Product[] = [];

  try {
    const rawCart = localStorage.getItem(STORAGE_KEY);
    const rawFav = localStorage.getItem(FAV_STORAGE_KEY);

    if (rawCart) {
      savedCart = JSON.parse(rawCart);
    }

    if (rawFav) {
      savedFav = JSON.parse(rawFav);
    }

    return {
      ...defaultState,
      cart: savedCart,
      fav: savedFav,
    };
  } catch (error) {
    return {
      ...defaultState,
      error: 'Failed to load data from browser storage.',
    };
  }
};

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const targetId = action.product.id;
      const existingIndex = state.cart.findIndex(
        item => item.product.id === targetId,
      );

      if (existingIndex !== -1) {
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        });

        return { ...state, cart: updatedCart };
      }

      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: 1 }],
      };
    }

    case 'INCREMENT': {
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.product.id === action.id) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        }),
      };
    }

    case 'DECREMENT': {
      return {
        ...state,
        cart: state.cart
          .map(item => {
            if (item.product.id === action.id) {
              return { ...item, quantity: item.quantity - 1 };
            }

            return item;
          })
          .filter(item => item.quantity > 0),
      };
    }

    case 'TOGGLE_FAV': {
      const isFav = state.fav.some(item => item.id === action.product.id);
      const updatedFav = isFav
        ? state.fav.filter(item => item.id !== action.product.id)
        : [...state.fav, action.product];

      return { ...state, fav: updatedFav };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.id),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

const initialState: State = {
  cart: [],
  error: null,
  totalCount: 0,
  totalPrice: 0,
  fav: [],
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    initCartState,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to save the cart.',
      });
    }
  }, [state.cart]);

  useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(state.fav));
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to save favorites.',
      });
    }
  }, [state.fav]);

  const contextValue = useMemo(() => {
    const totalCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = state.cart.reduce((acc, item) => {
      const price = item.product.price || item.product.fullPrice;

      return acc + price * item.quantity;
    }, 0);

    return {
      cart: state.cart,
      totalCount,
      totalPrice,
      error: state.error,
      fav: state.fav,
    };
  }, [state.cart, state.error, state.fav]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={contextValue}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
