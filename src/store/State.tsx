import React, { useReducer } from 'react';
import { Product } from '../types/product';
import { Cart } from '../types/cart';

type State = {
  loading: boolean;
  loadingError: string;
  allProducts: Product[];
  favoriteProducts: string[];
  cart: Cart;
};

const initialState: State = {
  loading: true,
  loadingError: '',
  allProducts: [],
  favoriteProducts: [],
  cart: [],
};

type Action
  = { type: 'addFavorite', payload: string }
  | { type: 'removeFavorite', payload: string }
  | { type: 'updateFavorite', payload: string[] }
  | { type: 'updateCart', payload: Cart }
  | { type: 'getAllProducts', payload: Product[] }
  | { type: 'setLoading', payload: boolean }
  | { type: 'setLoadingError', payload: string };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };

    case 'setLoadingError':
      return {
        ...state,
        loadingError: action.payload,
      };

    case 'getAllProducts':
      return {
        ...state,
        allProducts: action.payload,
      };

    case 'addFavorite':
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, action.payload],
      };

    case 'removeFavorite':
      return {
        ...state,
        favoriteProducts: state.favoriteProducts
          .filter(item => item !== action.payload),
      };

    case 'updateFavorite':
      return {
        ...state,
        favoriteProducts: [...action.payload],
      };

    case 'updateCart':
      return {
        ...state,
        cart: [...action.payload],
      };

    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);

export const DispatchContext
  = React.createContext<React.Dispatch<Action>>(() => { });

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
