import { createStore, combineReducers } from 'redux';
import cartReducer from './cart';
import filterReducer from './filter';
import likedReducer from './favourites';

const shopState = localStorage.getItem('shopState');

const savedState = shopState
  ? JSON.parse(shopState)
  : undefined;

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  liked: likedReducer,
});

const store = createStore(rootReducer, savedState);

store.subscribe(() => {
  localStorage.setItem(
    'shopState',
    JSON.stringify(store.getState()),
  );
});

export default store;
