/* eslint-disable @typescript-eslint/indent */
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { asideMenuSlice } from './features/asideMenuSlice';
import { directionSlice } from './features/directionSlice';
import { activeSlideSlice } from './features/activeSlideSlice';
import { productDetailsSlice } from './features/productDetailsSlice';

export const store = configureStore({
  reducer: {
    asideReducer: asideMenuSlice.reducer,
    directionReducer: directionSlice.reducer,
    activeSlideReducer: activeSlideSlice.reducer,
    productDetailsReducer: productDetailsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
