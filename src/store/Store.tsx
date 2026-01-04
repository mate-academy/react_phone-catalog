import React, { useContext, useEffect, useReducer } from 'react';
import { CartItem, Product } from '../types';
import { getProducts } from '../api/client';

type AppState = {
  products: Product[];
  favorites: string[];
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_TO_CART'; payload: string }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: CartItem };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(
        item => item.id === action.payload,
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { id: action.payload, quantity: 1 }],
      };
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'REMOVE_FROM_CART':
      const filterCartItem = state.cartItems.filter(
        item => item.id !== action.payload,
      );

      return {
        ...state,
        cartItems: filterCartItem,
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }

          return item;
        }),
      };
    case 'TOGGLE_FAVORITE':
      const isHaveInFavorites = state.favorites.includes(action.payload);

      if (isHaveInFavorites) {
        return {
          ...state,
          favorites: state.favorites.filter(item => item !== action.payload),
        };
      }

      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    default:
      return { ...state };
  }
}

function initialCart(): CartItem[] {
  const storedCart = localStorage.getItem('cart');
  const cart = storedCart ? JSON.parse(storedCart) : [];

  return cart;
}

function initialFavorites(): string[] {
  const stored = localStorage.getItem('favorites');

  return stored ? JSON.parse(stored) : [];
}

const initialState: AppState = {
  products: [],
  favorites: initialFavorites(),
  cartItems: initialCart(),
  loading: false,
  error: null,
};

const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export function GlobalContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });

    getProducts()
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_ERROR', payload: 'Error on fetch Products' });
      });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export const useAppState = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);
