/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';
import { apiSlice } from '../features/api/apiSlice';
import { loadState, saveState } from '../helpers/localStorage';
import cartReducer from '../features/cart/cartSlice';
import favouritesReducer from '../features/favourites/favouritesSlice';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(apiSlice.middleware)
  ),
  preloadedState,
});

store.subscribe(throttle(() => {
  saveState({
    cart: store.getState().cart,
    favourites: store.getState().favourites,
  });
}, 1000));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
