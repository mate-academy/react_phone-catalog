import { Product } from '../react-app-env';

// Action types - is just a constant. MUST have a unique value.
export enum ActionType {
  SET_FAVORITES = 'SET_FAVORITES',
  SET_SELECTED_CART = 'SET_SELECTED_CART',
  DEL_FAVORITES = 'DEL_FAVORITES',
  DEL_FROM_CART = 'DEL_FROM_CART',
}

export interface SetFavorites {
  type: ActionType.SET_FAVORITES,
  payload: string,
}

export interface SetSelectedCart {
  type: ActionType.SET_SELECTED_CART,
  payload: Product,
}

export interface DelFavorites {
  type: ActionType.DEL_FAVORITES,
  payload: string,
}

export interface DelFromCart {
  type: ActionType.DEL_FROM_CART,
  payload: Product,
}

// Action creators - a function returning an action object
export const setFavorites = (payload: string): SetFavorites => ({
  type: ActionType.SET_FAVORITES,
  payload,
});

export const setSelectedCart = (payload: Product): SetSelectedCart => ({
  type: ActionType.SET_SELECTED_CART,
  payload,
});

export const delFavorites = (payload: string): DelFavorites => ({
  type: ActionType.DEL_FAVORITES,
  payload,
});

export const delFromCart = (payload: Product): DelFromCart => ({
  type: ActionType.DEL_FROM_CART,
  payload,
});
