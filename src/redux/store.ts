/* eslint-disable */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './reducers/cartSlice';
import favouritesSlice from './reducers/favouritesSlice';
import productsSlice from './reducers/productsSlice';

const rootReducer = combineReducers({
  products: productsSlice,
  favourites: favouritesSlice,
  cart: cartSlice,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
