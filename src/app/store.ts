// eslint-disable-next-line import/no-cycle
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fetchPhonesReducer from '../features/fetchPhonesSlice';
import fetchTabletsReducer from '../features/fetchTabletsSlice';
import fetchAccessoriesReducer from '../features/fetchAccessoriesSlice';
import fetchProductsReducer from './../features/fetchProductsSlice';
import iconsChangerReducer from '../features/iconsChangerSlice';
import chosenItemsReducer from '../features/chosenItemsSlice';

export const store = configureStore({
  reducer: {
    phones: fetchPhonesReducer,
    tablets: fetchTabletsReducer,
    accessories: fetchAccessoriesReducer,
    products: fetchProductsReducer,
    iconsChanger: iconsChangerReducer,
    chosenItems: chosenItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AttThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
