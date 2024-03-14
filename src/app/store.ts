import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import productsSlice from '../features/product/productsSlice';
import productInfoSlice from '../features/productInfo/productInfoSlice';

export const store = configureStore({
  reducer: {
    phones: productsSlice,
    product: productInfoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
