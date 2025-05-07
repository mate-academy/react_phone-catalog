import { configureStore, Store } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

export const store: Store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
