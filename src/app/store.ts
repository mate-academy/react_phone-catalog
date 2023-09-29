/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { loadState } from '../helpers/localStorage';
import { apiSlice } from '../features/API/apiSlice';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(apiSlice.middleware)
  ),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
