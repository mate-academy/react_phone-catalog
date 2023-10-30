import { combineReducers, createStore } from 'redux';
import cartReducer from '../features/cart';
import favoritesReducer from '../features/favorites';
import queryReducer from '../features/query';

const reducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  query: queryReducer,
});

const store = createStore(reducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
