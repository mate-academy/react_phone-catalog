import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favorites';
import cartReducer from '../features/cart';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
