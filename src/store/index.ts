import {
  createStore,
  combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { favoriteReducer } from './favorites';


const rootReducer = combineReducers({
  favoriteReducer,

});

export type RootState = ReturnType<typeof rootReducer>;

export const getFavorites = (state: RootState) => state.favoriteReducer;


const store = createStore(rootReducer,
  composeWithDevTools());

export default store;
