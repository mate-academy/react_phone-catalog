/* eslint-disable prettier/prettier */
import React, { useEffect, useReducer } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type Action =
  | { type: 'openMenu' }
  | { type: 'closeMenu' }
  | { type: 'addToFavourites'; payload: Product }
  | { type: 'deleteFromFavourites'; payload: Product }
  | { type: 'addToCart'; payload: Product }
  | { type: 'deleteFromCart'; payload: Product }
  | { type: 'amountIncrease'; payload: Product }
  | { type: 'amountDecrease'; payload: Product };

interface State {
  isMenuVisible: boolean;
  favourites: Product[];
  cart: CartProduct[];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'openMenu':
      return { ...state, isMenuVisible: true };

    case 'closeMenu':
      return { ...state, isMenuVisible: false };

    case 'deleteFromFavourites':
      return {
        ...state,
        favourites: state.favourites.filter(
          fav => fav.id !== action.payload.id,
        ),
      };

    case 'addToFavourites':
      return { ...state, favourites: [...state.favourites, action.payload] };

    case 'deleteFromCart':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.id),
      };

    case 'addToCart':
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, count: 1, totalPrice: action.payload.price },
        ],
      };

    case 'amountIncrease':
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload.id
            ? {
              ...product,
              count: product.count + 1,
              totalPrice: product.totalPrice + product.price,
            }
            : product,
        ),
      };

    case 'amountDecrease':
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload.id
            ? {
              ...product,
              count: product.count - 1,
              totalPrice: product.totalPrice - product.price,
            }
            : product,
        ),
      };

    default:
      return state;
  }
}

const initialState: State = {
  isMenuVisible: false,
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state.favourites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
