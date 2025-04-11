import {
  combineSlices,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import phones from '../features/PhonesSlice/PhonesSlice';
import products from '../features/ProductsSlice/ProductsSlice';
import tablets from '../features/TabletsSlice/TabletsSlice';
import accessories from '../features/AccessoriesSlice/AccessoriesSlice';

const rootReducer = combineSlices({
  phones: phones,
  products: products,
  tablets: tablets,
  accessories: accessories,
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
