import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productSlice from '../features/getProductsSlice';
import getAllProductsSlice from '../features/getAllProductsSlice';
import addFavoritesSlice from '../features/addFavoritesSlice';
import addBucketSlice from '../features/addProductSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
    allProducts: getAllProductsSlice,
    addedFavorites: addFavoritesSlice,
    addBucket: addBucketSlice,
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
