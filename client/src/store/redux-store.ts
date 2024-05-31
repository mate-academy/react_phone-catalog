import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import productsSlice from './reducers/products';
import viewportSlice from './reducers/viewport';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    viewport: viewportSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// probably won't be used

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
