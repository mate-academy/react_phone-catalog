import { configureStore } from '@reduxjs/toolkit';
import phonesReducer from '../features/phoneSlice/phones';
import accessoriesReducer from '../features/accessoriesSlice/accessories';
import productsReducer from '../features/productsSlice/products';
import tabletReducer from '../features/tabletsSlice/tablets';

export const store = configureStore({
  reducer: {
    phones: phonesReducer,
    accessories: accessoriesReducer,
    products: productsReducer,
    tablets: tabletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
