import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import productSlice from '../features/product/productSlice';
import productInfoSlice from '../features/productInfo/productInfoSlice';

export const store = configureStore({
  reducer: {
    phones: productSlice,
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
