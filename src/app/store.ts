import { configureStore } from '@reduxjs/toolkit';
import favSlice from '../features/favSlice';
import cartSlice from '../features/cartSlice';
import productsSlice from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    favourites: favSlice,
    cartItems: cartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
