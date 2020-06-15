import {
  createStore,
  combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducerFavoriteProducts } from './favorites';

import reducerCart from './cart';

const rootReducer = combineReducers({
  reducerFavoriteProducts,
  reducerCart,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getFavorites = (state: RootState) => state.reducerFavoriteProducts;
export const getItems = (cart: RootState) => cart.reducerCart;


const store = createStore(rootReducer,
  composeWithDevTools());

export default store;
