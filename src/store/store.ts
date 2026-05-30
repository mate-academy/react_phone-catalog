import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './slices/products';
import { cartSlice } from './slices/cart';
import { favoritesSlice } from './slices/favorites';

const rootReducer = combineSlices(productsSlice, cartSlice, favoritesSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
