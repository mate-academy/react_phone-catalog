import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import getProductsSlice from '../features/getProductsSlice';
import addFavoritesSlice from '../features/addFavoritesSlice';
import addProductSlice from '../features/addProductSlice';
import getAllProductsReducer from '../features/getAllProductsSlice';

export const store = configureStore({
  reducer: {
    products: getProductsSlice,
    addedFavorites: addFavoritesSlice,
    addedBucket: addProductSlice,
    allProducts: getAllProductsReducer,
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