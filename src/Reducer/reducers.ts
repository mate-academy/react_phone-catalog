import { combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: cartReducer,
});

export default rootReducer;
