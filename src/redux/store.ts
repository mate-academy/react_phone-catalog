import { configureStore } from '@reduxjs/toolkit';
import bay from './slices/baySlice';
import category from './slices/categoriesSlice';
import detailProduct from './slices/detailProductSlice';
import favorites from './slices/favoritesSlice';
import filter from './slices/filterSlice';
import products from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    category,
    products,
    detailProduct,
    favorites,
    bay,
    filter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
