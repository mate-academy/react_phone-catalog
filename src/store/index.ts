import {
  createStore,
  combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducerFavoriteProducts } from './favorites';

const rootReducer = combineReducers({
  reducerFavoriteProducts,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getFavorites = (state: RootState) => state.reducerFavoriteProducts;

const store = createStore(rootReducer,
  composeWithDevTools());

export default store;
