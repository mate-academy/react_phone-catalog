import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import productSlice from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
    phones: productSlice,
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
