import React, { useEffect } from 'react';
import { CartProduct, Product } from '../types/Product';
import { Category } from '../types/Category';

type RootState = {
  products: Product[];
  cart: CartProduct[];
  favourites: Product[];
  categories: Category[];
  loading: boolean;
  errorMessage: string;
};

const initialState: RootState = {
  products: [],
  cart: [],
  favourites: [],
  categories: [],
  loading: false,
  errorMessage: '',
};

type Action =
  | { type: 'fetchStart' }
  | { type: 'fetchSuccess'; payload: Product[] }
  | { type: 'fetchFailed'; payload: string }
  | { type: 'loadCategories'; payload: Category[] }
  | { type: 'addToCart'; payload: Product }
  | { type: 'deleteFromCart'; payload: string }
  | { type: 'clearCart' }
  | { type: 'addToFav'; payload: Product }
  | { type: 'deleteFromFav'; payload: string }
  | { type: 'increaseQuantity'; payload: string }
  | { type: 'decreaseQuantity'; payload: string }
  | { type: 'loadStateFromStorage'; payload: Partial<RootState> };

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'fetchStart':
      return {
        ...state,
        loading: true,
      };

    case 'fetchSuccess':
      return {
        ...state,
        products: [...action.payload],
        loading: false,
      };

    case 'fetchFailed':
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };

    case 'loadCategories':
      return {
        ...state,
        categories: [...action.payload],
        loading: false,
      };

    case 'addToCart':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'deleteFromCart':
      return {
        ...state,
        cart: state.cart.filter(product => product.itemId !== action.payload),
      };

    case 'clearCart':
      return {
        ...state,
        cart: [],
      };

    case 'addToFav':
      return {
        ...state,
        favourites: [...state.favourites, { ...action.payload }],
      };

    case 'deleteFromFav':
      return {
        ...state,
        favourites: state.favourites.filter(
          product => product.itemId !== action.payload,
        ),
      };

    case 'increaseQuantity':
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product.itemId === action.payload) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        }),
      };

    case 'decreaseQuantity':
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product.itemId === action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product;
          }
        }),
      };

    case 'loadStateFromStorage':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const StateContext = React.createContext<RootState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavourites = localStorage.getItem('favourites');

    if (savedCart) {
      dispatch({
        type: 'loadStateFromStorage',
        payload: { cart: JSON.parse(savedCart) },
      });
    }

    if (savedFavourites) {
      dispatch({
        type: 'loadStateFromStorage',
        payload: { favourites: JSON.parse(savedFavourites) },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state.favourites]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
