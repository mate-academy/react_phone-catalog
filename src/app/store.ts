// eslint-disable-next-line import/no-extraneous-dependencies
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from '../features/products';
import { cartSlice } from '../features/cart';
import { favouriteSlice } from '../features/favourite';

const rootReducer = combineSlices(productsSlice, cartSlice, favouriteSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
