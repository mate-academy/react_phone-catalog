import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer from '../features/favouriteSlice';
import withdrawReducer from '../features/withdrawSlice';

export const store = configureStore({
  reducer: {
    favorite: favouriteReducer,
    withdraw: withdrawReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
