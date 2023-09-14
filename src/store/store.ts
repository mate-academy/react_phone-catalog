import { configureStore } from '@reduxjs/toolkit';
import allPhonesReducer from './features/phones';
import cartReducer from './features/cart';
import favoritesReducer from './features/favorites';

export const store = configureStore({
  reducer: {
    phones: allPhonesReducer,
    cart: cartReducer,
    favorite: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
