import {
  combineSlices,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import products from '../features/ProductsSlice/ProductsSlice';
import crumbs from '../features/CrumbsSlice/CrumbsSlice';
import productDetails from '../features/ProductDetailsSlice/ProductDetailsSlice';
import banners from '../features/BannersSlice/BannersSlice';

const rootReducer = combineSlices({
  products: products,
  crumbs: crumbs,
  productDetails: productDetails,
  banners: banners,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
