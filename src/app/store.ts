import {
  combineSlices,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import products from '../features/ProductsSlice/ProductsSlice';
import crumbs from '../features/CrumbsSlice/CrumbsSlice';

const rootReducer = combineSlices({
  products: products,
  crumbs: crumbs,
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
