import { Products } from '../../types/Products';
import { CartProduct } from '../../types/Products';
import React, { useEffect, useReducer } from 'react';

type Action =
  | { type: 'addFavourites'; payload: Products }
  | { type: 'removeFavourites'; payload: string }
  | { type: 'addCart'; payload: CartProduct }
  | { type: 'removeCart'; payload: string }
  | { type: 'clearCart' }
  | { type: 'addQuantityToCart'; payload: string }
  | { type: 'reduceTheQuantityInTheCart'; payload: string };

interface State {
  favourites: Products[];
  cart: CartProduct[];
}

const initialState: State = {
  favourites: [],
  cart: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addFavourites':
      if (
        state.favourites.some(
          product => product.itemId === action.payload.itemId,
        )
      ) {
        return state;
      }

      return { ...state, favourites: [...state.favourites, action.payload] };

    case 'removeFavourites':
      const filteredFavourites = state.favourites.filter(
        product => product.itemId !== action.payload,
      );

      return { ...state, favourites: filteredFavourites };

    case 'addCart':
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return { ...state, cart: [...state.cart, action.payload] };

    case 'removeCart':
      const filterCart = state.cart.filter(
        product => product.id !== action.payload,
      );

      return { ...state, cart: filterCart };

    case 'clearCart':
      return { ...state, cart: [] };

    case 'addQuantityToCart':
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      };

    case 'reduceTheQuantityInTheCart':
      return {
        ...state,
        cart: state.cart
          .map(product =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity - 1 }
              : product,
          )
          .filter(product => product.quantity > 0),
      };

    default:
      return { ...state };
  }
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

interface Props {
  children: React.ReactNode;
}

export const StateProvider: React.FC<Props> = ({ children }) => {
  const getState = (): State => {
    try {
      const saveFavoutites = JSON.parse(
        localStorage.getItem('favourites') || '[]',
      );
      const saveCart = JSON.parse(localStorage.getItem('cart') || '[]');

      return {
        favourites: saveFavoutites,
        cart: saveCart,
      };
    } catch (_) {
      return {
        favourites: [],
        cart: [],
      };
    }
  };

  const [state, dispatch] = useReducer(reducer, getState());

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
