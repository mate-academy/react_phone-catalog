/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useReducer, useState } from 'react';
import { getProducts } from '../shared/utils/httpClient';
import { Product } from '../shared/types/Product';
import { PhonesTablets } from '../shared/types/PhonesTablets';
import { Accessories } from '../shared/types/Accessories';
import { CartItem } from '../shared/types/CartItem';

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_PHONES'; payload: PhonesTablets[] }
  | { type: 'SET_TABLETS'; payload: PhonesTablets[] }
  | { type: 'SET_ACCESSORIES'; payload: Accessories[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'toggleFavourite'; payload: string }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } };

interface State {
  products: Product[];
  phones: PhonesTablets[];
  tablets: PhonesTablets[];
  accessories: Accessories[];
  favourites: string[];
  cart: CartItem[];
  isGlobalLoading: boolean;
  isPageLoading: boolean;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_PHONES':
      return { ...state, phones: action.payload };
    case 'SET_TABLETS':
      return { ...state, tablets: action.payload };
    case 'SET_ACCESSORIES':
      return { ...state, accessories: action.payload };
    case 'SET_LOADING':
      return { ...state, isPageLoading: action.payload };

    case 'toggleFavourite':
      return {
        ...state,
        favourites: state.favourites.some(id => id === action.payload)
          ? state.favourites.filter(id => id !== action.payload)
          : [...state.favourites, action.payload],
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    default:
      return state;
  }
}

const loadState = (): State => {
  const savedState = localStorage.getItem('appState');

  if (savedState) {
    return JSON.parse(savedState);
  }

  return {
    products: [],
    phones: [],
    tablets: [],
    accessories: [],
    favourites: [],
    cart: [],
    isGlobalLoading: true,
    isPageLoading: false,
  };
};

export const StateContext = React.createContext(loadState());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadState());

  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    async function loadProducts() {
      setIsGlobalLoading(true);

      try {
        const products = await getProducts();

        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } catch (error) {
        throw error;
      } finally {
        setTimeout(() => setIsGlobalLoading(false), 1000);
      }
    }

    loadProducts();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ ...state, isGlobalLoading }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
