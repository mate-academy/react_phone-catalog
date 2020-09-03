import { combineReducers, createStore } from 'redux';
import cartReducer, { InitialCartState } from '../cartStore/cartStore';
import favoritesReducer, { InitialFavoriteState } from '../favoritesStore/favoriteStore';

const allReducers = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
});

const store = createStore(allReducers);

type State = {
  cart: InitialCartState;
  favorites: InitialFavoriteState;
};

export const cartItem = (state: State) => (state.cart.cartItem);

export const favoriteItems = (state: State) => (state.favorites.favoriteItems);

export default store;
