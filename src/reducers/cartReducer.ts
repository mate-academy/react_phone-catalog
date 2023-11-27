import { CartAction } from '../enums/enums';
import { getFromLocalStorage, saveToLocalStorage } from '../helpers/helpers';
import { CartItemType } from '../types/CartItemType';

export type CartActionType =
  | { type: CartAction.ADD; payload: CartItemType }
  | { type: CartAction.LOAD }
  | { type: CartAction.INCREASE; payload: string }
  | { type: CartAction.DECREASE; payload: string }
  | { type: CartAction.REMOVE; payload: string };

export type State = {
  cart: CartItemType[];
};

export const cartReducer = (
  state: State,
  action: CartActionType,
): State => {
  switch (action.type) {
    case CartAction.LOAD: {
      const storageData = getFromLocalStorage('cart');

      return { ...state, cart: storageData };
    }

    case CartAction.INCREASE: {
      const updatedCart = state.cart.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      saveToLocalStorage('cart', updatedCart);

      return { ...state, cart: updatedCart };
    }

    case CartAction.DECREASE: {
      const updatedCart = state.cart.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });

      saveToLocalStorage('cart', updatedCart);

      return { ...state, cart: updatedCart };
    }

    case CartAction.ADD: {
      const updatedCart = [...state.cart, action.payload];

      saveToLocalStorage('cart', updatedCart);

      return { ...state, cart: updatedCart };
    }

    case CartAction.REMOVE: {
      const updatedCart = state.cart
        .filter((item) => item.id !== action.payload);

      saveToLocalStorage('cart', updatedCart);

      return { ...state, cart: updatedCart };
    }

    default:
      throw new Error('Uknown action');
  }
};
