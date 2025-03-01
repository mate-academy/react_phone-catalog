import {
  combineSlices,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import phonesReducer from '../features/PhonesSlice/PhonesSlice';
import productsReducer from '../features/ProductsSlice/ProductsSlice';
import tabletsReducer from '../features/TabletsSlice/TabletsSlice';
import accessoriesReducer from '../features/AccessoriesSlice/AccessoriesSlice';

const rootReducer = combineSlices({
  phones: phonesReducer,
  products: productsReducer,
  tablets: tabletsReducer,
  accessories: accessoriesReducer,
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
