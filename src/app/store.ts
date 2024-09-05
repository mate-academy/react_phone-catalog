import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import getProductsSlice from '../features/getProductsSlice';
import getAllProductsReducer from '../features/getAllProductsSlice';
import getTabletsSlice from '../features/getTabletsSlice';
import getAccessoriesSlice from '../features/getAccessoriesSlice';
import addFavouritesSlice from '../features/addFavouritesSlice';
import addBucketInfoSlice from '../features/addBucketInfoSlice';

export const store = configureStore({
  reducer: {
    products: getProductsSlice,
    allProducts: getAllProductsReducer,
    tablets: getTabletsSlice,
    accessories: getAccessoriesSlice,
    addedFavourites: addFavouritesSlice,
    addedBucket: addBucketInfoSlice,
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
