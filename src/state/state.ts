import { useContext } from 'react';
import { ActionTypes } from '../enums/ActionTypes';
import { CartProductType } from '../types/CartProductType';
import { ProductType } from '../types/ProductType';
import { StateContext } from './context';

export type State = {
  products: ProductType[];
  favourites: ProductType[];
  cart: CartProductType[];
  loading: boolean;
  error: string | null;
};

export type Action =
  | { type: ActionTypes.FETCH_PRODUCTS_REQUEST }
  | { type: ActionTypes.FETCH_PRODUCTS_SUCCESS; payload: ProductType[] }
  | { type: ActionTypes.FETCH_PRODUCTS_FAILURE; payload: string }
  | { type: ActionTypes.ADD_TO_CART; payload: ProductType }
  | { type: ActionTypes.ADD_TO_FAVOURITES; payload: ProductType }
  | { type: ActionTypes.REMOVE_FROM_CART; payload: string }
  | { type: ActionTypes.REMOVE_FROM_FAVOURITES; payload: string }
  | { type: ActionTypes.CLEAR_CART }
  | { type: ActionTypes.INCREASE_QUANTITY; payload: string }
  | { type: ActionTypes.DECREASE_QUANTITY; payload: string }
  | { type: ActionTypes.LOAD_STATE_FROM_STORAGE; payload: Partial<State> };

export const initialState: State = {
  products: [],
  favourites: [],
  cart: [],
  loading: false,
  error: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case ActionTypes.FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.ADD_TO_FAVOURITES:
      return { ...state, favourites: [...state.favourites, action.payload] };
    case ActionTypes.REMOVE_FROM_FAVOURITES:
      return {
        ...state,
        favourites: state.favourites.filter(
          product => product.itemId !== action.payload,
        ),
      };
    case ActionTypes.ADD_TO_CART:
      const existingCartItem = state.cart.find(
        item => item.itemId === action.payload.itemId,
      );

      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.itemId === action.payload.itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.itemId !== action.payload),
      };
    case ActionTypes.INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.itemId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case ActionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.itemId === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    case ActionTypes.LOAD_STATE_FROM_STORAGE:
      return { ...state, ...action.payload };
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }

  return context;
};
