import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import favouritesReducer from '../features/favourites';
import cartReducer from '../features/cart';

const rootReducer = combineReducers({
  products: productsReducer,
  favourites: favouritesReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
