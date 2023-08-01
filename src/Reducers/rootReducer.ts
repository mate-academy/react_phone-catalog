import { combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: cartReducer,
});

export default rootReducer;
