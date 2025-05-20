import React, { useEffect, useReducer } from 'react';
import { Product } from '../types/product';

export enum Do {
  ADD_FAV = 'Add to favorites',
  DELETE_FAV = 'Delete from favorites',
  ADD_CART = 'Add to the cart',
  DELETE_CART = 'Delet from the cart',
  CLEAR_CART = 'Clear the cart',
  DECREASE_Q = 'Decrease the quantity of a product in a cart',
}

export type CartProduct = Product & {
  quantity: number;
};

type Action = {
  type: string;
  payload: Product | CartProduct;
};

interface State {
  favorites: Product[] | [];
  cart: CartProduct[] | [];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Do.ADD_FAV:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case Do.DELETE_FAV:
      return {
        ...state,
        favorites: state.favorites.filter(
          item => item.id !== action.payload?.id,
        ),
      };
    case Do.ADD_CART: {
      const duplicate = state.cart.find(
        p => p.itemId === action.payload.itemId,
      );

      if (duplicate) {
        return {
          ...state,
          cart: state.cart.map(p =>
            p.itemId === duplicate.itemId
              ? { ...p, quantity: p.quantity + 1 }
              : p,
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case Do.DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload?.id),
      };

    case Do.DECREASE_Q: {
      const duplicate = state.cart.find(
        p => p.itemId === action.payload.itemId,
      );

      if (duplicate) {
        return {
          ...state,
          cart: state.cart.map(p =>
            p.itemId === duplicate.itemId
              ? { ...p, quantity: p.quantity - 1 }
              : p,
          ),
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
}

const storedFavorites = localStorage.getItem('favorites');
const storedCart = localStorage.getItem('cart');

const initialState: State = {
  favorites: storedFavorites ? JSON.parse(storedFavorites) : [],
  cart: storedCart ? JSON.parse(storedCart) : [],
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
