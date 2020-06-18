import { createStore, combineReducers } from 'redux';
import queryReducer from './query';
import goodReducer from './good';
import favoritesReducer from './favorites';
import cartReducer from './cart';

export const getQuery = (state: RootState) => state.query;

export const getGoods = (state: RootState) => state.goods;

export const getFavorites = (state: RootState) => state.favoritesReducer;
export const getCart = (cart: RootState) => cart.cartReducer;

export const getVisibleGoods = (state: RootState) => state.goods.filter(g => g.name.includes(state.query));

const rootReducer = combineReducers({
  goods: goodReducer,
  favoritesReducer,
  cartReducer,
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
