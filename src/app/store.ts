import { configureStore, combineSlices } from '@reduxjs/toolkit';
import phonesSlice from '../features/product/productSlice';
import cartSlice from '../features/cart/cartSlice';
import favoriteSlice from '../features/favorite/favoriteSlice';
import itemSlice from '../features/product/itemSlice';

const rootReducer = combineSlices(
  phonesSlice,
  cartSlice,
  favoriteSlice,
  itemSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
