import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type State = {
  cart: CartProduct[];
  favorites: Product[];
};

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: Product }
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: Product }
  | { type: 'REMOVE_ALL_FROM_CART'; payload: Product };

type Context = { state: State; dispatch: React.Dispatch<Action> };

const initialState: State = {
  cart: [],
  favorites: [],
};

const initState = (): State => {
  const storedState = localStorage.getItem('globalState');

  return storedState ? JSON.parse(storedState) : initialState;
};

const GlobalStateContext = createContext<Context | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProduct = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, amount: item.amount + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, amount: 1 }],
      };
    }

    case 'REMOVE_FROM_CART': {
      const existingProduct = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingProduct && existingProduct.amount > 1) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, amount: item.amount - 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    }

    case 'REMOVE_ALL_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.itemId !== action.payload.itemId),
      };
    }

    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(
          item => item.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, initState);

  useEffect(() => {
    localStorage.setItem('globalState', JSON.stringify(state));
  }, [state]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  return context;
};
