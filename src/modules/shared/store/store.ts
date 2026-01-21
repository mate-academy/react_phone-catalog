import { GlobalState } from './types';
import { GlobalAction } from './actions';
import { cartInitialState, cartReducer } from './cart/cart.reducer';
import {
  favoritesInitialState,
  favoritesReducer,
} from './favorites/favorites.reducer';

export const initialState: GlobalState = {
  cart: cartInitialState,
  favorites: favoritesInitialState,
};

export function rootReducer(
  state: GlobalState,
  action: GlobalAction,
): GlobalState {
  return {
    cart: cartReducer(state.cart, action),
    favorites: favoritesReducer(state.favorites, action),
  };
}
