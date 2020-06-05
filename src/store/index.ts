
import {
  createStore,
  combineReducers,
} from 'redux';


import { cartReducer } from './cart';
import { favoritesReducer } from './favorites';

export type RootState = ReturnType<typeof rootReducer>;

const initialState: RootState = {
  cart: JSON.parse(localStorage.getItem('PhonesCatalog_Cart') || '[]'),
  favorites: JSON.parse(localStorage.getItem('PhonesCatalog_Favorites') || '[]'),
}

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
})

const store = createStore(
  rootReducer,
  initialState,
)



export default store;




