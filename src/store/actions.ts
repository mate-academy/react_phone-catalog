import { ObjectForCart } from '../react-app-env';

// Action types - is just a constant. MUST have a unique value.
export enum ActionType {
  SET_FAVORITES = 'SET_FAVORITES',
  SET_SELECTED_CART = 'SET_SELECTED_CART',
  DEL_FAVORITES = 'DEL_FAVORITES',
  DEL_FROM_CART = 'DEL_FROM_CART',
  SET_QUANTITY = 'SET_QUANTITY',
  DEL_QUANTITY = 'DEL_QUANTITY',
}

export interface SetFavorites {
  type: ActionType.SET_FAVORITES,
  payload: string,
}

export interface SetSelectedCart {
  type: ActionType.SET_SELECTED_CART,
  payload: ObjectForCart,
}

export interface DelFavorites {
  type: ActionType.DEL_FAVORITES,
  payload: string,
}

export interface DelFromCart {
  type: ActionType.DEL_FROM_CART,
  payload: ObjectForCart,
}

export interface DelQuantity {
  type: ActionType.DEL_QUANTITY,
  payload: ObjectForCart,
}

export interface SetQuantity {
  type: ActionType.SET_QUANTITY,
  payload: ObjectForCart,
}

// Action creators - a function returning an action object
export const setFavorites = (payload: string): SetFavorites => ({
  type: ActionType.SET_FAVORITES,
  payload,
});

export const setSelectedCart = (payload: ObjectForCart): SetSelectedCart => ({
  type: ActionType.SET_SELECTED_CART,
  payload,
});

export const delFavorites = (payload: string): DelFavorites => ({
  type: ActionType.DEL_FAVORITES,
  payload,
});

export const delFromCart = (payload: ObjectForCart): DelFromCart => ({
  type: ActionType.DEL_FROM_CART,
  payload,
});

export const delQuantity = (payload: ObjectForCart): DelQuantity => ({
  type: ActionType.DEL_QUANTITY,
  payload,
});

export const setQuantity = (payload: ObjectForCart): SetQuantity => ({
  type: ActionType.SET_QUANTITY,
  payload,
});
