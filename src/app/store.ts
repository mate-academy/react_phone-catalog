import { configureStore } from '@reduxjs/toolkit';
import favoriteCounterReducer from '../features/favoriteCounter/favoriteCounterSlice';
import shoppingCounterReducer from '../features/shoppingCounter/shoppingCounter';

export const store = configureStore({
  reducer: {
    favoriteCounter: favoriteCounterReducer,
    shoppingCounter: shoppingCounterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
