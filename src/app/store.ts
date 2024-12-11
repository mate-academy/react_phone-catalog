import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalReducer from '../features/globalSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
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
/* eslint-enable @typescript-eslint/indent */
