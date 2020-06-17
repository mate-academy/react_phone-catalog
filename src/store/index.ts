import { createStore, combineReducers } from 'redux';

import goodReducer from './good';
import favoritesReducer from './favorites';
import cartReducer from './cart';

export const getGoods = (state: RootState) => state.goods;
export const getFavorites = (state: RootState) => state.favoritesReducer;
export const getCart = (cart: RootState) => cart.cartReducer;

const rootReducer = combineReducers({
  goods: goodReducer,
  favoritesReducer,
  cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
