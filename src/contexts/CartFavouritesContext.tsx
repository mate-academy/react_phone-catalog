import React, { createContext, useReducer, useEffect } from 'react';
import { Product } from '../types/Product';

type State = {
  cart: { item: Product; quantity: number }[];
  favourites: Product[];
  isStorageLoaded: boolean;
};

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'ADD_TO_FAVOURITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVOURITES'; payload: string }
  | { type: 'LOAD_FROM_STORAGE'; payload: State };

const initialState: State = {
  cart: [],
  favourites: [],
  isStorageLoaded: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(
        cartItem => cartItem.item.itemId === action.payload.itemId,
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(cartItem =>
            cartItem.item.itemId === action.payload.itemId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { item: action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          cartItem => cartItem.item.itemId !== action.payload,
        ),
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(cartItem =>
          cartItem.item.itemId === action.payload
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map(cartItem =>
            cartItem.item.itemId === action.payload
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          )
          .filter(cartItem => cartItem.quantity > 0),
      };
    case 'ADD_TO_FAVOURITES':
      return { ...state, favourites: [...state.favourites, action.payload] };
    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        favourites: state.favourites.filter(
          item => item.itemId !== action.payload,
        ),
      };
    case 'LOAD_FROM_STORAGE':
      return { ...action.payload, isStorageLoaded: true };
    default:
      return state;
  }
};

export const CartFavouritesContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartFavouritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = localStorage.getItem('cartFavouritesState');

    if (storedState) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: JSON.parse(storedState) });
    } else {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: initialState });
    }
  }, []);

  useEffect(() => {
    if (state.isStorageLoaded) {
      localStorage.setItem('cartFavouritesState', JSON.stringify(state));
    }
  }, [state]);

  return (
    <CartFavouritesContext.Provider value={{ state, dispatch }}>
      {children}
    </CartFavouritesContext.Provider>
  );
};
