import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import cartReducer from './cart';
import favoriteReducer from './favorites';

const rootReducer = combineReducers({
  cartReducer,
  favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getFavorites = (state: RootState) => state.favoriteReducer;
export const getCart = (cart: RootState) => cart.cartReducer;

const store = createStore(rootReducer,
  composeWithDevTools());

export default store;
