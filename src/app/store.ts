import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import brandNewReducer from '../../src/features/brandNewSlice';
import hotPricesReducer from '../../src/features/hotPricesSlice';
import phonesReducer from '../../src/features/phonesSlice';

export const store = configureStore({
  reducer: {
    brandNew: brandNewReducer,
    hotPrices: hotPricesReducer,
    phones: phonesReducer,
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
