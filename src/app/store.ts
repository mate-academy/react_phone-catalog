import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
/* eslint-disable import/no-named-as-default */

import phonesReducer from '../features/phonesSlice/phonesSlice';

export const store = configureStore({
  reducer: {
    phones: phonesReducer,
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
