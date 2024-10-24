import React, { useEffect, useReducer } from 'react';
import { Product } from '../types';
import { CartProduct } from '../types/Product';

type Action =
  | { type: 'addFavourites'; payload: Product }
  | { type: 'removeFavourites'; payload: string }
  | { type: 'addCart'; payload: CartProduct }
  | { type: 'removeCart'; payload: string }
  | { type: 'increaseCountInCart'; payload: string }
  | { type: 'decreaseCountInCart'; payload: string };

interface State {
  favourites: Product[];
  cart: CartProduct[];
}

const initialState: State = {
  favourites: [],
  cart: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addCart':
      return { ...state, cart: [...state.cart, action.payload] };

    case 'removeCart':
      const filteredCart = state.cart.filter(
        product => product.itemId !== action.payload,
      );

      return { ...state, cart: filteredCart };

    case 'addFavourites':
      return { ...state, favourites: [...state.favourites, action.payload] };

    case 'removeFavourites':
      const filteredFavousrites = state.favourites.filter(
        product => product.itemId !== action.payload,
      );

      return { ...state, favourites: filteredFavousrites };

    case 'increaseCountInCart':
      return {
        ...state,
        cart: state.cart.map(p =>
          p.itemId === action.payload ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      };

    case 'decreaseCountInCart':
      return {
        ...state,
        cart: state.cart.map(p =>
          p.itemId === action.payload ? { ...p, quantity: p.quantity - 1 } : p,
        ),
      };

    default:
      return { ...state };
  }
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const getInitialState = (): State => {
    try {
      const savedFavourites = JSON.parse(
        localStorage.getItem('favourites') || '[]',
      );
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

      return {
        favourites: savedFavourites,
        cart: savedCart,
      };
    } catch (_) {
      return {
        favourites: [],
        cart: [],
      };
    }
  };

  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
