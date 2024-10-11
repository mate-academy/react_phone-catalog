import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accessoriesSlice from '../features/accessoriesSlice';
import phoneSlice from '../features/phoneSlice';
import productsSlice from '../features/productsSlice';
import tablesSlice from '../features/tablesSlice';
import backetSlice from '../features/basketSlice';
import favoritSlice from '../features/favoritSlice';
import coreSlice from '../features/core';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  accessories: accessoriesSlice,
  phones: phoneSlice,
  products: productsSlice,
  tables: tablesSlice,
  backets: backetSlice,
  favorit: favoritSlice,
  core: coreSlice,
});

const persistConfig = {
  key: 'root-config',
  storage,
  blacklist: [],
  whitelist: ['backets', 'favorit'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
