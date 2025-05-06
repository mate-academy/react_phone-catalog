import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './features/products/productsSlice';
import favouritesSlice from './features/products/favouritesSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    favourites: favouritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
