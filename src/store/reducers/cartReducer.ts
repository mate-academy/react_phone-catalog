import { AnyAction } from 'redux';
import { ActionTypes } from '../actionTypes';
import { CartState } from '../../constants/types';

export const cartState: CartState = {
  cart: [],
};

export const getCart = (state: CartState) => state.cart;

export const cartReducer = (state = cartState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case ActionTypes.DELETE_CART:
      return {
        ...state,
        cart: [...state.cart].filter(item => item.id !== action.payload),
      };

    case ActionTypes.DECREASE_CART:
      return {
        ...state,
        cart: [...state.cart].map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }

          return item;
        }),
      };

    case ActionTypes.INCREASE_CART:
      return {
        ...state,
        cart: [...state.cart].map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              amount: item.amount + 1,
            };
          }

          return item;
        }),
      };

    default:
      return state;
  }
};
