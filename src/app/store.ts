import { configureStore } from '@reduxjs/toolkit';
import accessoriesSlice from '../features/accessoriesSlice';
import phoneSlice from '../features/phoneSlice';
import productsSlice from '../features/productsSlice';
import tablesSlice from '../features/tablesSlice';
import backetSlice from '../features/basketSlice';
import favoritSlice from '../features/favoritSlice';
import coreSlice from '../features/core';

export const store = configureStore({
  reducer: {
    accessories: accessoriesSlice,
    phones: phoneSlice,
    products: productsSlice,
    tables: tablesSlice,
    backets: backetSlice,
    favorit: favoritSlice,
    core: coreSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
