import { createContext, useEffect, useMemo, useReducer } from 'react';

import { Action } from './types/Action';
import { CartProduct, Product } from './types/Product';
import { getProducts } from './shared/httpClient';

const reducer = (
  state: GlobalContextType,
  action: Action,
): GlobalContextType => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'START_LOADER':
      return { ...state, isLoading: true };

    case 'ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };

    case 'STOP_LOADER':
      return { ...state, isLoading: false };

    case 'SET_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.some(fav => fav.id === action.payload.id)
          ? state.favourites.filter(fav => fav.id !== action.payload.id)
          : [...state.favourites, action.payload],
      };

    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case 'DELETE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case 'UPDATE_AMOUNT':
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

type GlobalContextType = {
  products: Product[];
  favourites: Product[];
  cart: CartProduct[];
  isLoading: boolean;
  errorMessage: string;
  dispatch: React.Dispatch<Action>;
};

export const GlobalContext = createContext<GlobalContextType>({
  products: [],
  favourites: [],
  cart: [],
  isLoading: false,
  errorMessage: '',
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState: GlobalContextType = {
  products: [],
  favourites: storedFavourites,
  cart: storedCart,
  isLoading: false,
  errorMessage: '',
  dispatch: () => {},
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, isLoading, errorMessage, favourites, cart } = state;

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(
    () => ({ products, favourites, cart, isLoading, errorMessage, dispatch }),
    [products, favourites, cart, isLoading, errorMessage, dispatch],
  );

  useEffect(() => {
    dispatch({ type: 'ERROR_MESSAGE', payload: '' });
    dispatch({ type: 'START_LOADER' });

    getProducts()
      .then(data => dispatch({ type: 'SET_PRODUCTS', payload: data }))
      .catch(() =>
        dispatch({
          type: 'ERROR_MESSAGE',
          payload: 'The products have not been loaded',
        }),
      )
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, []);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
