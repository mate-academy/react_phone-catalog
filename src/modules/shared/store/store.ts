import { GlobalState } from './types';
import { GlobalAction } from './actions';
import { cartInitialState, cartReducer } from './cart/cart.reducer';
import {
  favoritesInitialState,
  favoritesReducer,
} from './favorites/favorites.reducer';
import { loadState } from '../utils/storage';

export const defaultState = {
  cart: cartInitialState,
  favorites: favoritesInitialState,
};

export const initialState = loadState() ?? defaultState;

export function rootReducer(
  state: GlobalState,
  action: GlobalAction,
): GlobalState {
  return {
    cart: cartReducer(state.cart, action),
    favorites: favoritesReducer(state.favorites, action),
  };
}
