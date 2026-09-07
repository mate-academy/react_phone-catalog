import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer from '../features/cart';
import favoritesReducer from '../features/favorites';
import productsReducer from '../features/productSlice';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: cartReducer,
  products: productsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
